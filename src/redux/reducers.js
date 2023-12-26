import {createAsyncThunk} from '@reduxjs/toolkit';
import {addUpdateTaskToDb, deleteTaskFromDb} from '../utils/apiCaller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import {isEmpty, cloneDeep} from 'lodash';

export const fetchTaskList = createAsyncThunk(
  'task/fetchTaskList',
  async () => {
    try {
      const snapshot = await database().ref('task').once('value');
      const data = !isEmpty(snapshot.val())
        ? Object.entries(snapshot.val()).map(([key, value]) => {
            return {
              id: key,
              ...value,
            };
          })
        : [];

      data.sort((a, b) => {
        const key1 = new Date(a?.timeStamp);
        const key2 = new Date(b?.timeStamp);

        if (key1 < key2) {
          return -1;
        } else if (key1 === key2) {
          return 0;
        } else {
          return 1;
        }
      });

      return data;
    } catch (error) {
      return [];
    }
  },
);

export const syncOfflineTask = createAsyncThunk(
  'task/syncOfflineTask',
  async (payload, {dispatch}) => {
    const offlineAddTask = await AsyncStorage.getItem('offlineAddTask');
    const offlineDeleteTask = await AsyncStorage.getItem('offlineDeleteTask');

    const addTaskList = JSON.parse(offlineAddTask);
    const deleteTaskList = JSON.parse(offlineDeleteTask);

    const addTaskApi =
      (!isEmpty(addTaskList) &&
        addTaskList.map(item => addUpdateTaskToDb(item))) ||
      [];
    const deleteTaskApi =
      (!isEmpty(deleteTaskList) &&
        deleteTaskList.map(item => deleteTaskFromDb(item))) ||
      [];

    const allApiCall = [...addTaskApi, ...deleteTaskApi];

    if (!isEmpty(allApiCall)) {
      Promise.all(allApiCall)
        .then(res => {
          if (!isEmpty(addTaskList)) {
            AsyncStorage.removeItem('offlineAddTask');
          }
          if (!isEmpty(deleteTaskList)) {
            AsyncStorage.removeItem('offlineDeleteTask');
          }
          dispatch(fetchTaskList());
        })
        .then(err => {
          console.log({err});
        });
    }
  },
);

export const deleteTaskAction = createAsyncThunk(
  'task/deleteTaskAction',
  async (payload, {dispatch, getState}) => {
    const rState = getState();
    const {isConnected, ...rest} = payload;

    if (isConnected) {
      try {
        await deleteTaskFromDb(rest);
        dispatch(fetchTaskList());
      } catch (error) {
        console.log({error});
      }
      return false;
    } else {
      const offlineDeleteTask = await AsyncStorage.getItem('offlineDeleteTask');
      if (isEmpty(offlineDeleteTask)) {
        const newTaskList = JSON.stringify([rest]);
        AsyncStorage.setItem('offlineDeleteTask', newTaskList);
      } else {
        const newTaskList = JSON.parse(offlineDeleteTask);
        newTaskList.push(rest);
        AsyncStorage.setItem('offlineDeleteTask', JSON.stringify(newTaskList));
      }
      const oldList = cloneDeep(rState?.task?.taskDataList);
      const taskIndex = oldList.findIndex(item => item?.id === rest?.id);
      oldList.splice(taskIndex, 1);
      return oldList;
    }
  },
);

export const addTaskAction = createAsyncThunk(
  'task/addTaskAction',
  async (payload, {dispatch, getState}) => {
    const rState = getState();
    const {isConnected, ...rest} = payload;

    if (isConnected) {
      try {
        await addUpdateTaskToDb(rest);
        dispatch(fetchTaskList());
      } catch (error) {
        console.log({error});
      }
      return false;
    } else {
      const offlineAddTask = await AsyncStorage.getItem('offlineAddTask');
      if (isEmpty(offlineAddTask)) {
        const newTaskList = JSON.stringify([rest]);
        AsyncStorage.setItem('offlineAddTask', newTaskList);
      } else {
        const newTaskList = JSON.parse(offlineAddTask);
        newTaskList.push(rest);
        AsyncStorage.setItem('offlineAddTask', JSON.stringify(newTaskList));
      }

      const oldList = cloneDeep(rState?.task?.taskDataList) || [];
      const taskIndex = oldList.findIndex(item => item.id === rest.id);
      if (taskIndex === -1) {
        oldList.push(rest);
      } else {
        oldList[taskIndex] = rest;
      }
      return oldList;
    }
  },
);

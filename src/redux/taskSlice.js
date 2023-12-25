import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {addUpdateTaskToDb, deleteTaskFromDb} from '../utils/apiCaller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import {isEmpty, cloneDeep} from 'lodash';

export const fetchTaskList = createAsyncThunk(
  'task/fetchTaskList',
  async () => {
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
  },
);

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    taskDataList: [],
  },
  reducers: {
    addTaskAction(state, action) {
      const {isConnected, ...rest} = action.payload;
      if (isConnected) {
        addUpdateTaskToDb(rest);
      } else {
        console.log('add inside else');
        const storeOffline = async () => {
          console.log('add storeOffline');
          const offlineAddTask = await AsyncStorage.getItem('offlineAddTask');
          console.log('offlineAddTask---', offlineAddTask);
          if (isEmpty(offlineAddTask)) {
            const list = JSON.stringify([rest]);
            console.log('create offline add');
            AsyncStorage.setItem('offlineAddTask', list);
          } else {
            const list = JSON.parse(offlineAddTask);
            list.push(rest);
            console.log('appended add');
            AsyncStorage.setItem('offlineAddTask', JSON.stringify(list));
          }
        };
        storeOffline();
      }
    },
    deleteTaskAction(state, action) {
      const {isConnected, ...rest} = action.payload;
      if (isConnected && false) {
        deleteTaskFromDb(rest);
      } else {
        console.log('add inside else');
        const storeOffline = async () => {
          console.log('delete storeOffline');
          const offlineDeleteTask = await AsyncStorage.getItem(
            'offlineDeleteTask',
          );
          console.log('offlineDeleteTask---', offlineDeleteTask);
          if (isEmpty(offlineDeleteTask)) {
            const list = JSON.stringify([rest]);
            console.log('create offline delete');
            AsyncStorage.setItem('offlineDeleteTask', list);
          } else {
            const list = JSON.parse(offlineDeleteTask);
            list.push(rest);
            console.log('appended delete');
            AsyncStorage.setItem('offlineDeleteTask', JSON.stringify(list));
          }
        };
        storeOffline();

        const oldList = cloneDeep(state.taskDataList);
        const taskIndex = oldList.findIndex(item => item?.id === rest?.id);
        oldList.splice(taskIndex, 1);
        return {...state, taskDataList: oldList};
      }
    },
    syncOfflineTask(state, action) {
      console.log('inside syncOfflineTask');
      const getOfflineData = async () => {
        const offlineAddTask = await AsyncStorage.getItem('offlineAddTask');
        const offlineDeleteTask = await AsyncStorage.getItem(
          'offlineDeleteTask',
        );

        const addTaskList = JSON.parse(offlineAddTask);
        const deleteTaskList = JSON.parse(offlineDeleteTask);

        if (!isEmpty(addTaskList)) {
          addTaskList.map(item => addUpdateTaskToDb(item));
          AsyncStorage.removeItem('offlineAddTask');
        }
        if (!isEmpty(deleteTaskList)) {
          deleteTaskList.map(item => deleteTaskFromDb(item));
          AsyncStorage.removeItem('offlineDeleteTask');
        }
      };
      getOfflineData();
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTaskList.fulfilled, (state, {payload}) => {
      return {
        ...state,
        taskDataList: payload,
      };
    });
  },
});

export default taskSlice.reducer;

export const {addTaskAction, deleteTaskAction, syncOfflineTask} =
  taskSlice.actions;

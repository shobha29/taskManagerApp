import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';

import {icons} from '../../asserts';
import {Header} from '../../components';
import {
  screenNameString,
  taskStatus,
  taskStatusString,
} from '../../utils/constants';
import {DeviceContext} from '../../utils/context';
import {
  addTaskAction,
  deleteTaskAction,
  fetchTaskList,
  syncOfflineTask,
} from '../../redux/taskSlice';

import styles from './home.styles';

const initialState = {
  isOpenForm: false,
  idTask: '',
  titleTask: '',
  descriptionTask: '',
  statusTask: '',
  isUpdateForm: false,
  isOpenStatusDropDown: false,
  timeStampTask: '',
};

const Home = () => {
  const [
    {
      idTask,
      isOpenForm,
      titleTask,
      descriptionTask,
      statusTask,
      isUpdateForm,
      isOpenStatusDropDown,
      timeStampTask,
    },
    setState,
  ] = useState(initialState);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isConnected} = useContext(DeviceContext);
  const {taskDataList} = useSelector(rState => rState.task, shallowEqual);

  useEffect(() => {
    console.log('isConnected---', isConnected);
    if (isConnected) {
      console.log('call sync');
      dispatch(fetchTaskList());
      dispatch(syncOfflineTask());
    }
  }, [isConnected]);

  const onPressMenu = () => {
    navigation.openDrawer();
  };

  const onCloseForm = () => {
    setState(prev => ({
      ...prev,
      isOpenForm: false,
      titleTask: '',
      descriptionTask: '',
      isOpenStatusDropDown: false,
      isUpdateForm: false,
    }));
  };

  const createTask = async () => {
    const payload = {
      title: titleTask,
      description: descriptionTask,
      status: 'PENDING',
      timeStamp: new Date().getTime(),
      isConnected,
    };
    dispatch(addTaskAction(payload));
    onCloseForm();
  };
  const onPressUpdate = item => {
    setState(prev => ({
      ...prev,
      idTask: item?.id,
      titleTask: item?.title,
      descriptionTask: item?.description,
      statusTask: item?.status,
      timeStampTask: item?.timeStamp,
      isOpenForm: true,
      isUpdateForm: true,
    }));
  };

  const updateTask = () => {
    const payload = {
      title: titleTask,
      description: descriptionTask,
      id: idTask,
      status: statusTask,
      timeStamp: timeStampTask,
      isConnected,
    };
    dispatch(addTaskAction(payload));
    onCloseForm();
  };

  const deleteTask = item => {
    const payload = {
      id: item?.id,
      isConnected,
    };
    dispatch(deleteTaskAction(payload));
    onCloseForm();
  };

  const getBtnDisable = useCallback(() => {
    const isDisable =
      isEmpty(titleTask) ||
      isEmpty(descriptionTask) ||
      (isUpdateForm && (isEmpty(statusTask) || isEmpty(idTask)));

    return isDisable;
  }, [descriptionTask, idTask, isUpdateForm, statusTask, titleTask]);

  const keyExtractor = (_, index) => index.toString();

  const itemSeparatorComponent = () => <View style={styles.separator} />;

  const renderCardItem = ({item}) => {
    const isPendingTask = item?.status === taskStatus.PENDING;
    return (
      <View style={styles.taskCard}>
        <View style={styles.topContent}>
          <Text style={styles.taskTitle}>{item?.title}</Text>
          <Text
            style={[styles.taskStatus, isPendingTask && styles.pendingStatus]}>
            {isPendingTask ? 'Pending' : 'Done'}
          </Text>
        </View>
        <Text style={styles.taskDescription}>{item?.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressUpdate(item)}>
            <Image source={icons.edit} style={styles.iconStyle} />
            <Text style={styles.btnText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteBtn]}
            onPress={() => deleteTask(item)}>
            <Image source={icons.delete} style={styles.iconStyle} />
            <Text style={[styles.btnText, styles.redText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTaskDropDown = ({item}) => {
    const isSelected = item === statusTask;
    const isPendingStatus = item === taskStatus.PENDING;

    return (
      <>
        <TouchableOpacity
          style={[
            styles.dropDownItem,
            isSelected && styles.selectedStatus,
            isPendingStatus
              ? styles.topBorderRadius
              : styles.bottomBorderRadius,
          ]}
          onPress={() => setState(prev => ({...prev, statusTask: item}))}>
          <Text
            style={[
              styles.selectedText,
              isSelected && styles.selectedStatusText,
            ]}>
            {taskStatusString[item]}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  const dropDown = () => {
    return (
      <View style={styles.dropDownContainer}>
        <FlatList
          data={Object.keys(taskStatus)}
          renderItem={renderTaskDropDown}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        title={screenNameString.HOME}
        leftIcon={icons.hamburger}
        onPressLeftIcon={onPressMenu}
      />
      <FlatList
        data={taskDataList}
        renderItem={renderCardItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparatorComponent}
        contentContainerStyle={styles.taskContainer}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setState(prev => ({...prev, isOpenForm: true}))}>
        <Image source={icons.add} style={styles.plusIcon} />
      </TouchableOpacity>
      <Modal
        visible={isOpenForm}
        transparent={true}
        onRequestClose={onCloseForm}>
        <TouchableOpacity
          style={styles.formWrapper}
          onPress={onCloseForm}
          activeOpacity={1}>
          <TouchableOpacity
            style={styles.formContent}
            onPress={() => {}}
            activeOpacity={1}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>Add Task</Text>
              <TouchableOpacity onPress={onCloseForm}>
                <Image source={icons.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={[styles.formField, styles.titleField]}>
                {!isEmpty(titleTask) && (
                  <View style={styles.label}>
                    <Text style={styles.labelText}>
                      Title<Text style={styles.redText}>*</Text>
                    </Text>
                  </View>
                )}
                <TextInput
                  placeholder={'Title'}
                  style={styles.inputText}
                  value={titleTask}
                  multiline={true}
                  maxLength={30}
                  onChangeText={e =>
                    setState(prev => ({...prev, titleTask: e}))
                  }
                />
              </View>

              <View style={styles.formField}>
                {!isEmpty(descriptionTask) && (
                  <View style={styles.label}>
                    <Text style={styles.labelText}>
                      Description<Text style={styles.redText}>*</Text>
                    </Text>
                  </View>
                )}
                <TextInput
                  placeholder={'Description'}
                  style={styles.inputText}
                  value={descriptionTask}
                  multiline={true}
                  maxLength={100}
                  onChangeText={e =>
                    setState(prev => ({...prev, descriptionTask: e}))
                  }
                />
              </View>

              {isUpdateForm && (
                <>
                  <TouchableOpacity
                    style={styles.formField}
                    activeOpacity={0.5}
                    onPress={() =>
                      setState(prev => ({
                        ...prev,
                        isOpenStatusDropDown: !isOpenStatusDropDown,
                      }))
                    }>
                    {!isEmpty(statusTask) && (
                      <View style={styles.label}>
                        <Text style={styles.labelText}>
                          Status<Text style={styles.redText}>*</Text>
                        </Text>
                      </View>
                    )}
                    <TextInput
                      placeholder={'Status'}
                      style={styles.inputText}
                      value={taskStatusString[statusTask]}
                      editable={false}
                    />
                  </TouchableOpacity>
                  {isOpenStatusDropDown && dropDown()}
                </>
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.addTaskBtn}
              disabled={getBtnDisable()}
              onPress={isUpdateForm ? updateTask : createTask}>
              <Text
                style={[
                  styles.addBtnText,
                  getBtnDisable() && styles.disableBtn,
                ]}>
                {isUpdateForm ? 'Update' : 'Add'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Home;

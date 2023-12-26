import {createSlice} from '@reduxjs/toolkit';
import {addTaskAction, deleteTaskAction, fetchTaskList} from './reducers';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    taskDataList: [],
    loading: {},
  },
  extraReducers: builder => {
    builder.addCase(fetchTaskList.pending, (state, {payload}) => {
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchList: true,
        },
      };
    });
    builder.addCase(fetchTaskList.fulfilled, (state, {payload}) => {
      return {
        ...state,
        taskDataList: payload,
        loading: {
          ...state.loading,
          fetchList: false,
        },
      };
    });
    builder.addCase(fetchTaskList.rejected, (state, {payload}) => {
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchList: false,
        },
      };
    });
    builder.addCase(deleteTaskAction.pending, (state, {payload}) => {
      return {
        ...state,
        loading: {
          ...state.loading,
          taskDelete: true,
        },
      };
    });
    builder.addCase(deleteTaskAction.fulfilled, (state, {payload}) => {
      const newState = payload
        ? {
            taskDataList: payload,
          }
        : {};
      return {
        ...state,
        loading: {
          ...state.loading,
          taskDelete: false,
        },
        ...newState,
      };
    });
    builder.addCase(deleteTaskAction.rejected, (state, {payload}) => {
      return {
        ...state,
        loading: {
          ...state.loading,
          taskDelete: false,
        },
      };
    });
    builder.addCase(addTaskAction.pending, (state, {payload}) => {
      return {
        ...state,
        loading: {
          ...state.loading,
          taskAdd: true,
        },
      };
    });
    builder.addCase(addTaskAction.fulfilled, (state, {payload}) => {
      const newState = payload ? {taskDataList: payload} : {};
      return {
        ...state,
        loading: {
          ...state.loading,
          taskAdd: false,
        },
        ...newState,
      };
    });
    builder.addCase(addTaskAction.rejected, (state, {payload}) => {
      return {
        ...state,
        loading: {
          ...state.loading,
          taskAdd: false,
        },
      };
    });
  },
});

export default taskSlice.reducer;

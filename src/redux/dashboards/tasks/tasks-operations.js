import { createAsyncThunk } from '@reduxjs/toolkit';
import * as tasksApi from '../../../api/tasks-api';

export const addTask = createAsyncThunk(
  'tasks/add',
  async ({ boardId, columnId, body }, { rejectWithValue }) => {
    try {
      const { data } = await tasksApi.addTaskRequest(boardId, columnId, body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTask = createAsyncThunk(
  'tasks/put',
  async ({ columnId, taskId, body }, { rejectWithValue }) => {
    try {
      const { data } = await tasksApi.editTaskRequest(columnId, taskId, body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'Tasks/delete',
  async ({ columnId, taskId }, { rejectWithValue }) => {
    try {
      await tasksApi.deleteTaskRequest(columnId, taskId);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

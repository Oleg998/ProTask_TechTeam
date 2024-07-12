import { createAsyncThunk } from '@reduxjs/toolkit';
import * as columnsApi from '../../../api/columns-api';

export const addColumn = createAsyncThunk(
  'columns/add',
  async ({ boardId, body }, { rejectWithValue }) => {
    try {
      const { data } = await columnsApi.addColumnRequest(boardId, body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editColumn = createAsyncThunk(
  'columns/put',
  async ({ boardId, columnId, body }, { rejectWithValue }) => {
    try {
      const { data } = await columnsApi.editColumnRequest(
        boardId,
        columnId,
        body
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const switchColumn = createAsyncThunk(
  'columns/switch',
  async ({ boardId, body }, { rejectWithValue }) => {
    try {
      await columnsApi.switchColumnRequest(boardId, body);
      return body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/delete',
  async ({ boardId, columnId }, { rejectWithValue }) => {
    try {
      await columnsApi.deleteColumnRequest(boardId, columnId);
      return columnId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const filterColumns = createAsyncThunk(
  'columns/filter',
  async (filter, { rejectWithValue }) => {
    try {
      return filter;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const filterPriority = createAsyncThunk(
  'columns/filterPriority',
  async (priority, { rejectWithValue }) => {
    try {
      return priority;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

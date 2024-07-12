import { createAsyncThunk } from '@reduxjs/toolkit';
import * as columnsApi from '../../api/columns-api';

export const fetchColumns = createAsyncThunk(
  'columns/fetchAll',
  async (boardId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const { data } = await columnsApi.getColumnsRequest(boardId, auth.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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

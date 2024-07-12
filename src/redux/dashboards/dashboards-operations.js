import { createAsyncThunk } from '@reduxjs/toolkit';
import * as dashboardsApi from '../../api/dashboards-api';

export const fetchAllDashboards = createAsyncThunk(
  'dashboards/fetchAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const {
        data: { boards },
      } = await dashboardsApi.getAllDashboardsRequest(auth.token);
      return boards;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOneDashboard = createAsyncThunk(
  'dashboards/fetchOne',
  async (boardId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const { data } = await dashboardsApi.getOneDashboardRequest(
        boardId,
        auth.token
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addDashboard = createAsyncThunk(
  'dashboards/add',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await dashboardsApi.addDashboardRequest(body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editDashboard = createAsyncThunk(
  'dashboards/put',
  async ({ boardId, body }, { rejectWithValue }) => {
    try {
      const { data } = await dashboardsApi.editDashboardRequest(boardId, body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDashboard = createAsyncThunk(
  'dashboards/delete',
  async (boardId, { rejectWithValue }) => {
    try {
      await dashboardsApi.deleteDashboardRequest(boardId);
      return boardId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

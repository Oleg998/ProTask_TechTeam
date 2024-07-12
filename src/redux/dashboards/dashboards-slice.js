import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAllDashboards,
  addDashboard,
  editDashboard,
  deleteDashboard,
} from './dashboards-operations';

import { pending, rejected } from '../../shared/functions/redux';
import Notiflix from 'notiflix';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  activeBoardId:""
};

const DashboardSlice = createSlice({
  name: 'dashboards',
  initialState,
  reducers: {
    updateBoardId(state, action) {
      state.activeBoardId = action.payload
    },
    resetDashboards(state) {
      state.items = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllDashboards.pending, pending)
      .addCase(fetchAllDashboards.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(fetchAllDashboards.rejected, rejected)

      .addCase(addDashboard.pending, pending)
      .addCase(addDashboard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.push(payload);
        Notiflix.Notify.success(
          `Dashboard with title ${payload.title} has been added`
        );
      })
      .addCase(addDashboard.rejected, rejected)

      .addCase(editDashboard.pending, pending)
      .addCase(editDashboard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const oldItemIdx = state.items.findIndex(
          item => item._id === payload._id
        );
        if (oldItemIdx !== -1) {
          const updatedItem = { ...state.items[oldItemIdx], ...payload };
          state.items.splice(oldItemIdx, 1, updatedItem);
          Notiflix.Notify.success(
            `Dashboard with title ${payload.title} has been updated`
          );
        }
      })
      .addCase(editDashboard.rejected, rejected)

      .addCase(deleteDashboard.pending, pending)
      .addCase(deleteDashboard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const indexToDelete = state.items.findIndex(
          item => item._id === payload
        );
        if (indexToDelete !== -1) {
          const deletedItem = state.items[indexToDelete];
          state.items.splice(indexToDelete, 1);
          Notiflix.Notify.success(
            `Dashboard with title ${deletedItem.title} has been deleted`
          );
        }
      })
      .addCase(deleteDashboard.rejected, rejected)
  },

});

export default DashboardSlice.reducer;
export const { updateBoardId, resetDashboards } = DashboardSlice.actions

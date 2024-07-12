import { createSlice } from '@reduxjs/toolkit';

import {
  fetchColumns,
  addColumn,
  editColumn,
  deleteColumn,
} from './columns-operations';
import { pending, rejected } from '../../shared/functions/redux';
import Notiflix from 'notiflix';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const columnSlice = createSlice({
  name: 'column',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchColumns.pending, pending)
      .addCase(fetchColumns.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(fetchColumns.rejected, rejected)

      .addCase(addColumn.pending, pending)
      .addCase(addColumn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.push(payload);
        Notiflix.Notify.success(
          `Column with title ${payload.title} has been added`
        );
      })
      .addCase(addColumn.rejected, rejected)

      .addCase(editColumn.pending, pending)
      .addCase(editColumn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const oldItemIdx = state.items.findIndex(
          item => item.id === payload.id
        );
        if (oldItemIdx !== -1) {
          const updatedItem = { ...state.items[oldItemIdx], ...payload };
          state.items.splice(oldItemIdx, 1, updatedItem);
          Notiflix.Notify.success(
            `Column with title ${payload.title} has been updated`
          );
        }
      })
      .addCase(editColumn.rejected, rejected)

      .addCase(deleteColumn.pending, pending)
      .addCase(deleteColumn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const indexToDelete = state.items.findIndex(
          item => item.id === payload
        );
        if (indexToDelete !== -1) {
          const deletedColumn = state.items[indexToDelete];
          state.items.splice(indexToDelete, 1);
          Notiflix.Notify.success(
            `Column with title ${deletedColumn.title} has been deleted`
          );
        }
      })
      .addCase(deleteColumn.rejected, rejected);
  },
});

export default columnSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';

import { addTask, editTask, deleteTask } from './tasks-operations';
import { fetchOneDashboard } from '../dashboards-operations';
import { switchColumn } from '../columns/columns-operations';

import { pending, rejected } from '../../../shared/functions/redux';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const TaskSlice = createSlice({
  name: 'task',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchOneDashboard.pending, pending)
      .addCase(fetchOneDashboard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = [];
        payload.columns.forEach(column => {
          column.tasks.forEach(
            ({ _id, title, priority, description, deadline, updatedAt }) => {
              state.items.unshift({
                boardId: payload._id,
                columnId: column._id,
                _id,
                title,
                priority,
                description,
                deadline,
                updatedAt,
              });
            }
          );
        });
        state.items.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
      })
      .addCase(fetchOneDashboard.rejected, rejected)

      .addCase(switchColumn.pending, pending)
      .addCase(
        switchColumn.fulfilled,
        (state, { payload: { taskId, newColumnId: columnId } }) => {
          state.isLoading = false;
          const oldItemIdx = state.items.findIndex(item => item._id === taskId);
          if (oldItemIdx !== -1) {
            const updatedItem = { ...state.items[oldItemIdx], columnId };
            state.items.splice(oldItemIdx, 1, updatedItem);
            Notiflix.Notify.success(
              'The task has been successfully moved to a new column'
            );
          }
        }
      )
      .addCase(switchColumn.rejected, rejected)

      .addCase(addTask.pending, pending)
      .addCase(addTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.unshift(payload);
        Notiflix.Notify.success(
          `Task with title ${payload.title} has been added`
        );
      })
      .addCase(addTask.rejected, rejected)

      .addCase(editTask.pending, pending)
      .addCase(editTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const oldItemIdx = state.items.findIndex(
          item => item._id === payload._id
        );
        if (oldItemIdx !== -1) {
          const updatedItem = { ...state.items[oldItemIdx], ...payload };
          state.items.splice(oldItemIdx, 1, updatedItem);
          Notiflix.Notify.success(
            `Task with title ${payload.title} has been updated`
          );
        }
      })
      .addCase(editTask.rejected, rejected)

      .addCase(deleteTask.pending, pending)
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const indexToDelete = state.items.findIndex(
          item => item._id === payload
        );
        if (indexToDelete !== -1) {
          const deletedItem = state.items[indexToDelete];
          state.items.splice(indexToDelete, 1);
          Notiflix.Notify.success(
            `Task with title ${deletedItem.title} has been deleted`
          );
        }
      })
      .addCase(deleteTask.rejected, rejected);
  },
});

export default TaskSlice.reducer;

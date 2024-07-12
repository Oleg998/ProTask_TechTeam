export const selectTasks = state => state.tasks.items;

export const selectTasksLoading = state => state.tasks.isLoading;

export const selectTasksError = state => state.tasks.error;

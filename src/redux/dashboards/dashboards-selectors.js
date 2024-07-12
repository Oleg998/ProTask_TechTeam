export const selectDashboards = state => state.dashboards.items;

export const selectDashboardsLoading = state => state.dashboards.isLoading;

export const selectDashboardsError = state => state.dashboards.error;

export const selectActiveBoardId = state => state.dashboards.activeBoardId

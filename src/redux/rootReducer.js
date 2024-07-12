import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/auth-slice';
import dashboardsReducer from './dashboards/dashboards-slice';
import columnsReducer from './dashboards/columns/columns-slice';
import tasksReducer from './dashboards/tasks/tasks-slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token', 'theme'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  dashboards: dashboardsReducer,
  columns: columnsReducer,
  tasks: tasksReducer,
});

export default rootReducer;

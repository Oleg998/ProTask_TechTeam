import authInstance from './auth-api';
import { setToken } from './auth-api';

export const getAllDashboardsRequest = async token => {
  // setToken(token);
  try {
    const data = await authInstance.get(`/boards`);
    return data;
  } catch (error) {
    setToken();
    throw error;
  }
};

export const getOneDashboardRequest = async (boardId, token) => {
  // setToken(token);
  try {
    const data = await authInstance.get(`/boards/${boardId}`);
    return data;
  } catch (error) {
    setToken();
    throw error;
  }
};

export const getBackgroundIcons = async token => {
  // setToken(token);
  try {
    const data = await authInstance.get(`/boards/background-icons`);
    return data;
  } catch (error) {
    setToken();
    throw error;
  }
};

export const addDashboardRequest = async body => {
  return await authInstance.post(`/boards/create-board`, body);
};

export const editDashboardRequest = async (boardId, body) => {
  return await authInstance.put(`/boards/${boardId}`, body);
};

export const deleteDashboardRequest = async boardId => {
  return await authInstance.delete(`/boards/${boardId}`);
};

import authInstance from './auth-api';
import { setToken } from './auth-api';

export const getColumnsRequest = async (boardId, token) => {
  // setToken(token);
  try {
    const data = await authInstance.get(`/boards/current/${boardId}`);
    return data;
  } catch (error) {
    setToken();
    throw error;
  }
};

export const addColumnRequest = async (boardId, body) => {
  return await authInstance.post(`/boards/current/${boardId}`, body);
};

export const editColumnRequest = async (boardId, columnId, body) => {
  return await authInstance.put(`/boards/current/${boardId}/${columnId}`, body);
};

export const switchColumnRequest = async (boardId, body) => {
  return await authInstance.put(`/boards/current/${boardId}`, body);
};

export const deleteColumnRequest = async (boardId, columnId) => {
  return await authInstance.delete(`/boards/current/${boardId}/${columnId}`);
};

import axios from 'axios';

const authInstance = axios.create({
  baseURL: 'https://protask-backend-qjoh.onrender.com',
});
authInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const { data } = await authInstance.post('/auth/refresh', {
          refreshToken,
        });
        setToken(data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

        return authInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const setToken = async token => {
  if (token) {
    return (authInstance.defaults.headers.authorization = `Bearer ${token}`);
  }
  authInstance.defaults.headers.authorization = '';
};

export const registerRequest = async body => {
  const { data } = await authInstance.post('/auth/register', body);
  return data;
};

export const loginRequest = async body => {
  const { data } = await authInstance.post('/auth/login', body);
  setToken(data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data;
};

export const currentRequest = async token => {
  setToken(token);
  try {
    const { data } = await authInstance.get('/auth/current');
    return data;
  } catch (error) {
    setToken();
    throw error;
  }
};

export const logoutRequest = async () => {
  const { data } = await authInstance.post('/auth/logout');
  setToken();
  return data;
};

export default authInstance;

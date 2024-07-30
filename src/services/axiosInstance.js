import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import store from '../store'; // make sure to import the store

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    const excludeUrls = ['/login', '/register', '/verify-email', '/refresh'];

    if (excludeUrls.includes(config.url)) {
      return config;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshResponse = await axiosInstance.post('/refresh', {}, { headers: { Authorization: `Bearer ${token}` } });
        const { token: newToken } = refreshResponse.data.authorisation;
        localStorage.setItem('token', newToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        config.headers.Authorization = `Bearer ${newToken}`;
        isRefreshing = false;
        processQueue(null, newToken);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);
        const dispatch = store.dispatch;
        const navigate = useNavigate();
        dispatch(logout());
        navigate('/login');
        return Promise.reject(refreshError);
      }
    } else {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        config.headers.Authorization = `Bearer ${newToken}`;
        return config;
      }).catch((err) => {
        return Promise.reject(err);
      });
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = localStorage.getItem('token');
      try {
        const refreshResponse = await axiosInstance.post('/refresh', {}, { headers: { Authorization: `Bearer ${token}` } });
        const { token: newToken } = refreshResponse.data.authorisation;
        localStorage.setItem('token', newToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        const dispatch = store.dispatch;
        const navigate = useNavigate();
        dispatch(logout());
        navigate('/login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

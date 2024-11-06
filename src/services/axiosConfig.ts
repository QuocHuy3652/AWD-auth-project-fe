import axios from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.requiresAuth) {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refreshToken`, { token });
          console.log(response);
          const newToken = response.data.result.token;
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

          localStorage.setItem('token', newToken);
          return axiosInstance(originalRequest);

        } catch (refreshError) {
          console.log('Refresh token failed:', refreshError);
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);



export default axiosInstance;

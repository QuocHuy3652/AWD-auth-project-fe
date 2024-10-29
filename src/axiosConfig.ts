import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log(API_BASE_URL);
// Tạo một instance của axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Thời gian chờ (ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor nếu cần
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Xử lý lỗi yêu cầu
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý dữ liệu phản hồi trước khi trả về
    return response;
  },
  (error) => {
    // Xử lý lỗi phản hồi
    return Promise.reject(error);
  }
);

export default axiosInstance;

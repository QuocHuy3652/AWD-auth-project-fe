import axiosConfig from './axiosConfig';

interface RegisterResponse {
  code: number,
  message: string,
  result: {
    id: string;
    email: string;
    createdAt: string;
  };
}

interface LoginResponse {
  code: number,
  message: string,
  result: {
    authenticated: boolean;
    token: string;
    email: string;
  };
}

interface ProfileResponse {
  code: number,
  message: string,
  result: {
    id: string;
    email: string;
    createdAt: string;
  };
}

interface LogoutResponse {
  code: number,
  message: string,
  result: string;
}

export const registerUser = async (email: string, password: string, confirmPassword: string): Promise<RegisterResponse> => {
  const response = await axiosConfig.post('/user/register', { email, password, confirmPassword });
  return response.data;
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axiosConfig.post('/auth/login', { email, password });
  return response.data;
};

export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await axiosConfig.get('/user/profile', { requiresAuth: true });
  return response.data;
};

export const logoutService = async (): Promise<LogoutResponse> => {
  const token = localStorage.getItem('token');
  const response = await axiosConfig.post('/auth/logout', { token });
  return response.data;
};

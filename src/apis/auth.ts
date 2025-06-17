import axiosInstance from '@/apis/base/axiosInstance';
import { AUTH_ENDPOINTS } from '@/constants/paths';
import type { LoginRequest, LoginResponse, SignupRequest } from '@/stores/types/auth';
import type { User as SignupResponse } from '@/stores/types/user';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(AUTH_ENDPOINTS.SIGNIN, data);
  return response.data;
};

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>(AUTH_ENDPOINTS.SIGNUP, data);
  return response.data;
};

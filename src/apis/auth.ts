import { requestPost } from '@/apis/base/request';
import { AUTH_ENDPOINTS } from '@/constants/paths';
import type { LoginRequest, LoginResponse, SignupRequest } from '@/schemas/auth';
import type { User as SignupResponse } from '@/schemas/auth';

/**
 * @description 로그인 요청 API
 * @returns accessToken + user
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return await requestPost<LoginResponse, LoginRequest>(AUTH_ENDPOINTS.SIGNIN, data);
};

/**
 * @description 회원가입 요청 API
 * @returns 가입된 사용자 정보
 */
export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  return await requestPost<SignupResponse, SignupRequest>(AUTH_ENDPOINTS.SIGNUP, data);
};

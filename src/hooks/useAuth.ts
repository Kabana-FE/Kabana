import { login as loginApi, signup as signupApi } from '@/apis/auth';
import type { LoginRequest, SignupRequest } from '@/stores/types/auth';
import { useAuthStore } from '@/stores/useAuthStore';

export const useAuth = () => {
  const { setAccessToken, setUser, clearAuth } = useAuthStore();

  const login = async (data: LoginRequest) => {
    try {
      const response = await loginApi(data);
      const { accessToken, user } = response;

      if (!accessToken || !user) {
        throw new Error('유효하지 않은 응답입니다.');
      }

      setAccessToken(accessToken);
      setUser(user);
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  };

  const signup = async (data: SignupRequest) => {
    try {
      const response = await signupApi(data);
      return response;
    } catch (error) {
      console.error('회원가입 실패:', error);
      throw error;
    }
  };

  const logout = () => {
    clearAuth();
    localStorage.removeItem('auth-storage');
  };

  return {
    login,
    signup,
    logout,
  };
};

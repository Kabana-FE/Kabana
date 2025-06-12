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
        throw new Error('로그인 응답에 토큰 또는 사용자 정보가 누락되었습니다.');
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
    useAuthStore.persist.clearStorage();
  };

  return {
    login,
    signup,
    logout,
  };
};

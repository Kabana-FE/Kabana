import axios from 'axios';

/**
 * Axios 인스턴스
 *
 * 현재 Vite 실행 환경(`.env.development` 또는 `.env.production`)에 따라
 * BASE_URL을 자동으로 설정한 Axios 인스턴스를 반환합니다.
 *
 * 이 인스턴스를 통해 공통 설정이 적용된 API 요청을 수행할 수 있습니다.
 *
 * @see {@link https://axios-http.com/docs/instance Axios 공식 문서 - 인스턴스}
 *
 * @example
 * import axiosInstance from '@/apis/axiosInstance';
 *
 * axiosInstance.get('/users')
 *   .then(response => console.log(response.data));
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default axiosInstance;

// import axiosInstance from './axiosInstance';

// /**
//  * 지정된 엔드포인트로 GET 요청을 전송합니다.
//  *
//  * 사전에 설정된 Axios 인스턴스를 사용하여 GET 요청을 보내고,
//  * 서버로부터 받은 응답 데이터만 반환합니다.
//  *
//  * @param {string} endpoint - 요청을 보낼 API 경로 (예: `/api/idols?pageSize=10&cursor=0`)
//  * @param {object} [options={}] - Axios 요청 설정 객체 (예: headers, params 등)
//  * @returns {Promise<any>} 서버로부터 받은 응답 데이터 (`response.data`)
//  *
//  * @example
//  * const data = await requestGet('/api/idols');
//  *
//  * @example
//  * const data = await requestGet('/api/idols', {
//  *   headers: { Authorization: 'Bearer yourToken' }
//  * });
//  */
// export const requestGet = async (endpoint, options = {}) => {
//   const response = await axiosInstance.get(endpoint, options);
//   return response.data;
// };

// /**
//  * DELETE 요청을 보내는 유틸 함수
//  *
//  * 지정된 endpoint로 DELETE 요청을 전송하고,
//  * 서버의 응답 데이터를 반환합니다.
//  *
//  * @param {string} endpoint - 요청을 보낼 API 경로 (예: '/api/resource/1')
//  * @returns {Promise<Object>} 서버 응답 데이터
//  *
//  * @example
//  * const result = await requestDelete('/api/idols/1');
//  */
// export const requestDelete = async (endpoint) => {
//   const response = await axiosInstance.delete(endpoint);
//   return response.data;
// };

// /**
//  * POST 요청을 보내는 유틸 함수
//  *
//  * JSON 또는 FormData 형식의 데이터를 서버로 전송하고,
//  * 서버의 응답 데이터를 반환합니다.
//  *
//  * - JSON 데이터를 전송할 경우 `Content-Type: application/json` 헤더가 명시적으로 설정됩니다.
//  *  이때 Axios 내부 요청은 아래와 같은 headers로 구성됩니다:
//  *   headers: {
//  *     'Content-Type': 'application/json'
//  *   }
//  *
//  * - FormData (파일 업로드 등)를 전송할 경우 Axios가 `Content-Type: multipart/form-data`와
//  *   boundary를 자동으로 생성하므로, 헤더를 명시하지 않습니다.
//  *   ❗ 이때 수동으로 Content-Type을 직접 설정하면 안됩니다. boundary가 누락되어 서버에서 에러가 발생할 수 있습니다.
//  *   Axios가 아래와 같은 형식으로 자동 생성합니다:
//  *   headers: {
//  *     'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryxYZ'
//  *   }
//  *
//  * @param {string} endpoint - 요청을 보낼 API 경로 (예: '/api/resource')
//  * @param {Object|FormData} data - 서버에 전송할 데이터 (JSON 객체 또는 FormData)
//  * @returns {Promise<Object>} 서버 응답 데이터
//  *
//  * @example
//  * -JSON 데이터 전송
//  * const res = await requestPost('/api/idols', { name: '장원영' });
//  *
//  * -FormData 전송 (예: 파일 업로드)
//  * const formData = new FormData();
//  * formData.append('image', file);
//  * const res = await requestPost('/api/upload', formData);
//  */
// export const requestPost = async (endpoint, data) => {
//   const headers = data instanceof FormData ? undefined : { 'Content-Type': 'application/json' };
//   const response = await axiosInstance.post(endpoint, data, { headers });
//   return response.data;
// };

// /**
//  * PUT 요청을 보내는 유틸 함수
//  *
//  * 지정된 endpoint로 PUT 요청을 전송하고,
//  * 서버의 응답 데이터를 반환합니다.
//  *
//  * @param {string} endpoint - 요청을 보낼 API 경로 (예: '/api/resource/1')
//  * @param {Object} data - 서버에 전달할 전체 수정 데이터
//  * @returns {Promise<Object>} 서버 응답 데이터
//  *
//  * @example
//  * const updated = await requestPut('/api/idols/1', { name: '장원영', group: '아이브' });
//  */
// export const requestPut = async (endpoint, data) => {
//   const response = await axiosInstance.put(endpoint, data);
//   return response.data;
// };

// /**
//  * PATCH 요청을 보내는 유틸 함수
//  *
//  * 지정된 endpoint로 PATCH 요청을 전송하고,
//  * 서버의 응답 데이터를 반환합니다.
//  *
//  * @param {string} endpoint - 요청을 보낼 API 경로 (예: '/api/resource/1')
//  * @param {Object} data - 서버에 전달할 수정 데이터
//  * @returns {Promise<Object>} 서버 응답 데이터
//  *
//  * @example
//  * const updated = await requestPatch('/api/idols/1', { name: '장원영' });
//  */
// export const requestPatch = async (endpoint, data) => {
//   const response = await axiosInstance.patch(endpoint, data);
//   return response.data;
// };

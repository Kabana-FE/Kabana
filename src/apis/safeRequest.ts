// import { THROWN_ERRORS } from '@/constants/errors';
// import { STATUS_CODES } from '@/constants/statusCodes';

// /**
//  * API 호출을 안전하게 수행하고, 실패 시 500 에러를 발생시킵니다.
//  *
//  * - API 요청 중 발생한 에러를 캐치하여 500 서버 에러로 통일합니다.
//  * - 요청이 성공하면 응답 데이터를 반환합니다.
//  *
//  * @template T
//  * @param {() => Promise<T>} apiCall - 실행할 비동기 API 호출 함수
//  * @returns {Promise<T>} 요청에 성공한 경우 반환되는 데이터
//  * @throws {Response} 요청 실패 시 500 상태 코드를 가진 Response를 던집니다.
//  */
// async function safeRequest(apiCall, label = '') {
//   try {
//     const data = await apiCall();
//     // console.log(`✅ ${label} data:`, data);
//     return data;
//   } catch (err) {
//     console.error(`❌ ${label} 요청 에러:`, err?.response?.data || err.message);
//     throw new Response(THROWN_ERRORS.FETCH_FAILED, {
//       status: STATUS_CODES.SERVER_ERROR,
//     });
//   }
// }

// export default safeRequest;

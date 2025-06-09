/**
 * Thrown Error Messages: 프론트에서 의도적으로 throw하는 에러 메시지
 *
 * loader나 action함수 내부에서 throw new Response(...)를 호출할 때,
 * Response 객체의 body에 포함될 에러 메시지를 상수로 정의한 객체입니다.
 *
 * 이 메시지는 사용자에게 직접 보여주는 것이 아니라, 라우터 에러 처리기(useRouteError)에서
 * 내부 디버깅 용도로 에러 메시지를 판별하거나 매핑할 때 사용됩니다.
 *
 * 사용자에게 노출되는 에러 메시지는 UI_ERRORS에서 별도로 관리합니다.
 *
 * @example
 * throw new Response(THROWN_ERROR.FETCH_FAILED, {
 *   status: 500,
 * });
 */
const THROWN_ERRORS = {
  FETCH_FAILED: '데이터 요청 중 에러가 발생했습니다.',
  DATA_NOT_FOUND: '요청한 데이터를 찾을 수 없습니다.',
  SERVER_ERROR: '서버 응답에 오류가 발생했습니다.',
  TYPE_ERROR: '데이터 타입이 올바르지 않습니다',
  SCHEMA_MISMATCH: '서버 응답 형식이 예상과 다릅니다',
};

export default THROWN_ERRORS;

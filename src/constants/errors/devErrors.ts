/**
 * Developer-Facing Error Messages
 *
 * 개발 과정에서 발생하는 내부 로직 오류나 예상치 못한 상황에 대한 에러 메시지입니다.
 * 이 메시지들은 주로 console.error, Error 객체 생성 등에 사용되어 개발자가 버그를 빠르게 추적하고 수정하는 것을 돕습니다.
 *
 * 이 메시지들은 사용자에게 직접 노출되지 않으며, 사용자 대상 메시지는 UI_ERRORS에서 관리합니다.
 */
const DEV_ERRORS = {
  // API 요청/응답 관련 에러
  API: {
    FETCH_FAILED: '데이터 요청 중 에러가 발생했습니다.',
    DATA_NOT_FOUND: '요청한 데이터를 찾을 수 없습니다.',
    SERVER_ERROR: '서버 응답에 오류가 발생했습니다.',
  },
  // 데이터 유효성 및 타입 관련 에러
  VALIDATION: {
    SCHEMA_MISMATCH: '서버 응답 형식이 예상과 다릅니다.',
    TYPE_ERROR: '데이터 타입이 올바르지 않습니다.',
    PAGINATION_PARAMS: '잘못된 인자: 페이지네이션 방식에는 page와 size 파라미터가 필요합니다.',
  },

  GENERAL: {
    UNEXPECTED: '예상치 못한 내부 오류가 발생했습니다.',
  },
};

export default DEV_ERRORS;

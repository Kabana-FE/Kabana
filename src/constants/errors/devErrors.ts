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
    SERVER_ERROR: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    BAD_REQUEST: '잘못된 요청입니다. 입력 내용을 다시 확인해주세요.',
    UNAUTHORIZED: '해당 요청에 대한 접근 권한이 없습니다.',
    REQUEST_SETUP_FAILED: '요청을 준비하는 중 오류가 발생했습니다.',
    CONNECTION_FAILED: '서버와의 연결에 실패했습니다. 네트워크 상태를 확인해주세요.',
  },
  // 데이터 유효성 및 타입 관련 에러
  VALIDATION: {
    SCHEMA_MISMATCH: '서버 응답 형식이 예상과 다릅니다.',
    TYPE_ERROR: '데이터 타입이 올바르지 않습니다.',
    PARAM_MISSING_IN_URL: (paramName: string) => `URL 파라미터에 '${paramName}'이(가) 누락되었습니다.`,
    PARAM_INVALID_FORMAT: (paramName: string, value: string) =>
      `URL 파라미터 '${paramName}'의 형식이 잘못되었습니다: '${value}'`,
  },

  GENERAL: {
    UNEXPECTED: '예상치 못한 내부 오류가 발생했습니다.',
    UNKNOWN: '알 수 없는 오류가 발생했습니다.',
  },
};

export default DEV_ERRORS;

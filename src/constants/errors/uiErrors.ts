import { HttpStatusCode } from 'axios';

/**
 * @description
 * 사용자에게 보여줄 UI 관련 에러 메시지를 체계적으로 관리하는 객체입니다.
 */
export const UI_ERRORS = {
  /**
   * API 관련 에러 메시지.
   * HTTP 상태 코드를 키로 직접 사용하여, 어떤 상태에 어떤 메시지가 매핑되는지 명확하게 보여줍니다.
   */
  API: {
    [HttpStatusCode.BadRequest]: '잘못된 요청입니다. 입력하신 내용을 다시 확인해 주세요.',
    [HttpStatusCode.Unauthorized]: '인증 정보가 유효하지 않습니다. 다시 로그인해 주세요.',
    [HttpStatusCode.Forbidden]: '이 페이지에 접근할 권한이 없습니다.',
    [HttpStatusCode.NotFound]: '요청하신 정보를 찾을 수 없습니다.',
    [HttpStatusCode.Conflict]: '입력하신 정보가 이미 존재하거나 충돌이 발생했습니다.',
    [HttpStatusCode.InternalServerError]: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    [HttpStatusCode.ServiceUnavailable]:
      '네트워크에 문제가 발생했거나 서비스가 현재 사용 불가능합니다. 잠시 후 다시 시도해 주세요.',
  },

  /**
   * 클라이언트 측(렌더링 등)에서 발생하는 일반적인 에러 메시지.
   */
  CLIENT: '페이지를 표시하는 중 예상치 못한 오류가 발생했습니다.',

  /**
   * 에러 바운더리에서 사용할 제목들을 정의합니다.
   */
  BOUNDARY_TITLES: {
    API: '데이터를 불러오는 중 오류가 발생했습니다.',
    GLOBAL: '서비스 이용에 불편을 드려 죄송합니다.',
    RENDER: '페이지의 일부를 표시하는 중 오류가 발생했습니다.',
  },

  /**
   * 404페이지에서 사용할 제목과 메시지를 정의합니다.
   */
  NOT_FOUND: {
    TITLE: '페이지를 찾을 수 없습니다.',
    MESSAGE: '요청하신 페이지가 존재하지 않거나, 주소가 변경되었을 수 있습니다.',
  },

  /**
   * 폼 유효성 검사에 사용되는 메시지들입니다.
   */
  VALIDATION: {
    REQUIRED: (fieldName: string) => `${fieldName}은(는) 필수 항목입니다.`,
    STRING_MAX: (max: number) => `최대 ${max}자 이내로 작성해주세요.`,
    STRING_MIN: (min: number) => `최소 ${min}자 이상 작성해주세요.`,
    FORMAT: (name: string) => `올바른 ${name} 형식이 아닙니다. `,
  },

  /**
   * 위 어떤 경우에도 해당하지 않는, 예측 불가능한 에러를 위한 기본 메시지.
   */
  UNKNOWN: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
};

export default UI_ERRORS;

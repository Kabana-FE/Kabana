const UI_ERRORS = {
  NETWORK: {
    DEFAULT: '네트워크 오류가 발생했습니다. \n잠시 후 다시 시도해주세요.',
    TIMEOUT: '서버 응답이 지연되고 있습니다.\n잠시 후 다시 시도해주세요.',
  },
  SERVER: {
    DEFAULT: '서버에서 문제가 발생했습니다. \n잠시 후 다시 시도해주세요.',
  },
  API: {
    DEFAULT: '데이터를 불러오지 못했습니다. \n잠시 후 다시 시도해주세요.',
    DATA_NOT_FOUND: '원하는 정보를 찾을 수 없습니다.',
  },
  PAGE: {
    NOT_FOUND: '요청한 페이지를 찾을 수 없습니다.',
  },
  INPUT: {
    REQUIRE_NUMBER: '숫자를 입력해주세요.',
  },
  UNKNOWN: '예상치 못한 문제가 발생했습니다. \n잠시 후 다시 시도해주세요.',
};

export default UI_ERRORS;

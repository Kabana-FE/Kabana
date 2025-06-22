/**
 * @description
 * 토스트 알림에 사용되는 메시지를 중앙에서 관리하는 객체입니다.
 * 반복 사용을 줄이고, 메시지의 일관성을 유지하며, 다국어 지원을 위한 확장성을 고려했습니다.
 *
 * - **구조**: 기능별로 그룹화 (AUTH, AUTH_GUARD, API 등)
 * - **동적 메시지**: 함수 형태를 사용하여, `(target: string) => \`${target}... \`` 처럼 동적인 값을 포함하는 메시지를 생성합니다.
 * - **일관성**: 동일한 액션(생성, 수정, 삭제 등)에 대해 일관된 톤앤매너를 유지합니다.
 */
const TOAST_MESSAGES = {
  // --- 공통 (Common) ---
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.',

  // --- 인증 (Authentication) ---
  AUTH: {
    LOGIN_SUCCESS: '로그인 되었습니다. 환영합니다!',
    LOGIN_FAILURE: '로그인에 실패했습니다.',
    LOGOUT_SUCCESS: '로그아웃 되었습니다. 다음에 또 만나요!',
    SIGNUP_SUCCESS: '회원가입이 완료되었습니다. 로그인해주세요.',
    SIGNUP_FAILURE: '회원가입에 실패했습니다. 다시 시도해주세요.',
    PASSWORD_CHANGE_SUCCESS: '비밀번호가 성공적으로 변경되었습니다.',
    PASSWORD_CHANGE_FAILURE: '비밀번호 변경에 실패했습니다. 다시 확인해주세요.',
  },

  // --- 접근 제어 (Auth Guard) ---
  AUTH_GUARD: {
    NEED_SIGNIN: '로그인이 필요한 페이지입니다.',
    NEED_SIGNOUT: '로그인 상태에서는 접근할 수 없는 페이지입니다. 로그아웃 후 다시 시도해 주세요.',
    TOKEN_EXPIRED: '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
  },

  // --- 데이터 CRUD (API) ---
  API: {
    FETCH_FAILURE: (target: string) => `${target} 목록을 불러오는데 실패했습니다.`,
    CREATE_SUCCESS: (target: string) => `${target}이(가) 생성되었습니다.`,
    CREATE_FAILURE: (target: string) => `${target} 생성에 실패했습니다.`,
    UPDATE_SUCCESS: (target: string) => `${target}이(가) 성공적으로 업데이트 되었습니다.`,
    UPDATE_FAILURE: (target: string) => `${target} 업데이트에 실패했습니다.`,
    DELETE_SUCCESS: (target: string) => `${target}이(가) 삭제되었습니다.`,
    DELETE_FAILURE: (target: string) => `${target} 삭제에 실패했습니다`,
  },

  // --- 초대 ---
  INVITATION: {
    SUCCESS: (email: string) => `${email}님을 성공적으로 초대했습니다.`,
    FAILURE: '초대에 실패했습니다. 이메일 주소를 다시 확인해주세요.',
    RESPONSE_FAILURE: '초대 응답에 실패했습니다. 다시 시도해주세요.',
    ACCEPT_SUCCESS: '초대를 수락했습니다.',
    REJECT_SUCCESS: '초대를 거절했습니다.',
  },
};

export default TOAST_MESSAGES;

// const { showSuccess, showError } = useToast();

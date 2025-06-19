type ProfileImg = string | undefined;

export interface MembersProps {
  /**
   * 사용자 닉네임
   */
  nickname: string;
  /**
   * 프로필 이미지 URL
   * (이미지가 없을 경우 기본 아바타로 대체될 수 있습니다.)
   */
  profileImg: ProfileImg;
  /**
   * 리스트의 마지막 항목 여부
   * (렌더링 시 구분선 생략 등 UI 처리를 위한 플래그)
   */
  isLast: boolean;
}

export interface InvitationsProps {
  /**
   * 초대받은 이메일 주소
   */
  email: string;
  /**
   * 리스트의 마지막 항목 여부
   * (렌더링 시 구분선 생략 등 UI 처리를 위한 플래그)
   */
  isLast: boolean;
}

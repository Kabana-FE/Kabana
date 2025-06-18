export interface AvatarProps {
  /**
   * 아바타 이미지의 URL
   * (제공되지 않으면 닉네임의 이니셜이 대신 표시됩니다.)
   */
  src?: string;
  /**
   * 사용자 닉네임
   * (이미지가 없을 경우 이 값을 기반으로 이니셜을 생성합니다.)
   */
  nickname: string;
  /**
   * 추가로 전달할 Tailwind 클래스명
   */
  className?: string;
}

export interface GroupProps {
  /**
   * 그룹 내 렌더링할 아바타들
   * (일반적으로 여러 개의 `<Avatar />` 컴포넌트를 포함합니다.)
   */
  children: React.ReactNode;
  /**
   * 추가로 전달할 Tailwind 클래스명
   */
  className?: string;
  /**
   * 표시할 최대 아바타 개수
   * (초과되는 경우 `+N` 형식으로 축약됩니다.)
   */
  max?: number;
}

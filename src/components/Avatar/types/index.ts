export interface AvatarProps {
  src?: string;
  nickname: string;
  className?: string;
}

export interface GroupProps {
  children: React.ReactNode;
  className?: string;
  max?: number; // 최대 몇 개 보여줄지 옵션
}

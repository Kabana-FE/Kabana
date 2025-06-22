import type { UserInfo } from '@/schemas/user';

export interface MypageLoaderData {
  /**
   * 현재 로그인한 사용자 정보입니다.
   */
  myInfo: UserInfo;
}

import { requestGet } from '@/apis/base/request';
import { USER_ENDPOINTS } from '@/constants/paths';
import type { UserInfo } from '@/schemas/user';

export const getMyInfo = async () => {
  return requestGet<UserInfo>(USER_ENDPOINTS.MY_PROFILE);
};

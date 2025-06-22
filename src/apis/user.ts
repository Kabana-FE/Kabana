import { requestGet, requestPost, requestPut } from '@/apis/base/request';
import { USER_ENDPOINTS } from '@/constants/paths';
import type { ProfileImage, UpdateUser, UserInfo } from '@/schemas/user';

export const getMyInfo = async () => {
  return requestGet<UserInfo>(USER_ENDPOINTS.MY_PROFILE);
};

export const updateMyInfo = async (data: UpdateUser) => {
  return requestPut<UserInfo, UpdateUser>(USER_ENDPOINTS.UPDATE_MY_PROFILE, data);
};

export const uploadProfileImg = async (data: FormData) => {
  return requestPost<ProfileImage, FormData>(USER_ENDPOINTS.UPLOAD_MY_PROFILE_IMAGE, data);
};

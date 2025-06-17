import { z } from 'zod';

import UI_ERRORS from '@/constants/errors/uiErrors';

/**
 * From server
 * @description 서버로부터 받은 내 정보 데이터의 유효성을 검사하는 스키마
 */
export const userInfoSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  profileImageUrl: z.string().url().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
/**
 * To server
 * @description 내 정보 수정 폼 유효성 검사를 위한 스키마
 */
export const updateUserInfoSchema = z.object({
  nickname: z.string(),
  profileImageUrl: z.string().url().nullable(),
});
/**
 * To server
 * @description 프로필 이미지 수정 폼 유효성 검사를 위한 스키마
 */
export const uploadProfileImageSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'].includes(file.type), {
      message: UI_ERRORS.VALIDATION.FORMAT('파일'),
    }),
});
/**
 * From server
 * @description 서버로부터 받은 프로필 이미지 데이터 유효성 검사를 위한 스키마
 */
export const ProfileImageSchema = z.object({
  profileImageUrl: z.string().url().nullable(),
});

export type UserInfo = z.infer<typeof userInfoSchema>;
export type UpdateUser = z.infer<typeof updateUserInfoSchema>;
export type UploadProfileImage = z.infer<typeof updateUserInfoSchema>;
export type ProfileImage = z.infer<typeof ProfileImageSchema>;

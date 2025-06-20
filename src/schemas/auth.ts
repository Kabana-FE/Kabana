import { z } from 'zod';

import { UI_ERRORS } from '@/constants/errors/uiErrors';

/**
 * From Server
 * @description 서버로부터 받은 사용자(User) 데이터의 유효성을 검사하는 스키마
 */
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  profileImageUrl: z.string().url().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/**
 * To Server
 * @description 로그인 요청 시 전송하는 데이터의 유효성을 검사하는 스키마
 */
export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

/**
 * From Server
 * @description 로그인 응답 데이터의 유효성을 검사하는 스키마
 */
export const loginResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
});

/**
 * To Server
 * @description 회원가입 요청 시 전송하는 데이터의 유효성을 검사하는 스키마
 */
export const signupRequestSchema = z.object({
  email: z.string().email(),
  nickname: z.string(),
  password: z.string().min(8),
});

/**
 * To Server
 * @description 비밀번호 변경 시 전송하는 데이터의 유효성을 검사하는 스키마
 */
export const changePasswordRequestSchema = z
  .object({
    password: z.string().min(8, { message: UI_ERRORS.VALIDATION.STRING_MIN(8) }),
    newPassword: z.string().min(8, { message: UI_ERRORS.VALIDATION.STRING_MIN(8) }),
    checkPassword: z.string().min(8, { message: UI_ERRORS.VALIDATION.STRING_MIN(8) }),
  })
  .refine((data) => data.password !== data.newPassword, {
    message: '기존 비밀번호와 동일합니다.',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.checkPassword, {
    message: '새 비밀번호가 일치하지 않습니다.',
    path: ['checkPassword'],
  });

export type User = z.infer<typeof userSchema>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type SignupRequest = z.infer<typeof signupRequestSchema>;
export type ChangePasswordRequest = z.infer<typeof changePasswordRequestSchema>;

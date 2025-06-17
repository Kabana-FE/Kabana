import { z } from 'zod';

import UI_ERRORS from '@/constants/errors/uiErrors';

export const userSchema = z.object({
  nickname: z.string(),
  email: z.string().email(),
  id: z.number().int().positive(),
});
/**
 * To server
 * @description 구성원 초대 폼 유효성 검사를 위한 스키마
 */
export const inviteMemberSchema = z.object({
  email: z.string().email({ message: UI_ERRORS.VALIDATION.FORMAT('이메일') }),
});
/**
 * From server
 * @description 서버로부터 받은 초대 데이터의 유효성을 검사하는 스키마
 */
export const invitationResponseSchema = z.object({
  id: z.number().int().positive(),
  inviter: userSchema,
  teamId: z.string(),
  dashboard: z.object({
    title: z.string(),
    id: z.number().int().positive(),
  }),
  invitee: userSchema,
  inviteAccepted: z.boolean().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof userSchema>;
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
export type InvitationResponse = z.infer<typeof invitationResponseSchema>;

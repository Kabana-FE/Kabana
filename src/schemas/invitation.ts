import { z } from 'zod';

import UI_ERRORS from '@/constants/errors/uiErrors';

/**
 * To server
 * @description 내가 받은 초대 목록 조회 요청 시 사용하는 쿼리 파라미터의 유효성을 검사하는 스키마
 */
export const invitationListParamsSchema = z.object({
  size: z.number().int().positive().optional(),
  cursorId: z.number().int().positive().optional(),
  title: z.string().optional(),
});

/**
 * To server
 * @description 초대 응답 요청 시 사용하는 쿼리 파라미터의 유효성을 검사하는 스키마
 */
export const respondInvitationParamsSchema = z.object({
  inviteAccepted: z.boolean(),
});

/**
 * From server
 * @description 초대 데이터의 유효성을 검사하는 스키마
 */
export const invitationSchema = z.object({
  id: z.number().int().positive(),
  inviter: z.object({
    nickname: z.string(),
    email: z.string(),
    id: z.number().int().positive(),
  }),
  teamId: z.string(),
  dashboard: z.object({
    title: z.string(),
    id: z.number().int().positive(),
  }),
  invitee: z.object({
    nickname: z.string(),
    email: z.string(),
    id: z.number().int().positive(),
  }),
  inviteAccepted: z.boolean().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/**
 * From server
 * @description 내가 받은 초대 목록 응답 데이터의 유효성을 검사하는 스키마
 */
export const invitationListSchema = z.object({
  cursorId: z.number().nullable(),
  invitations: z.array(invitationSchema),
});
/**
 * To server
 * @description 구성원 초대 폼 유효성 검사를 위한 스키마
 */
export const inviteMemberSchema = z.object({
  email: z.string().email({ message: UI_ERRORS.VALIDATION.FORMAT('이메일') }),
});

export type InvitationListParams = z.infer<typeof invitationListParamsSchema>;
export type RespondInvitationParams = z.infer<typeof respondInvitationParamsSchema>;
export type Invitation = z.infer<typeof invitationSchema>;
export type InvitationList = z.infer<typeof invitationListSchema>;
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;

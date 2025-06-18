import { z } from 'zod';

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
  id: z.number(),
  inviter: z.object({
    nickname: z.string(),
    email: z.string(),
    id: z.number(),
  }),
  teamId: z.string(),
  dashboard: z.object({
    title: z.string(),
    id: z.number(),
  }),
  invitee: z.object({
    nickname: z.string(),
    email: z.string(),
    id: z.number(),
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

export type InvitationListParams = z.infer<typeof invitationListParamsSchema>;
export type RespondInvitationParams = z.infer<typeof respondInvitationParamsSchema>;
export type Invitation = z.infer<typeof invitationSchema>;
export type InvitationList = z.infer<typeof invitationListSchema>;

import { z } from 'zod';

/**
 * From server
 * @description 서버로부터 받은 대시보드 멤버 데이터의 유효성을 검사하는 스키마
 * @see src/types/dto.d.ts -> MemberApplicationServiceResponseDto
 */
export const memberSchema = z.object({
  id: z.number(),
  userId: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  profileImageUrl: z.string().url().nullish(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  isOwner: z.boolean(),
});

/**
 * @description 대시보드 멤버 목록 조회 요청 시 사용하는 쿼리 파라미터의 유효성을 검사하는 스키마
 * @see src/types/dto.d.ts -> FindMembersRequestDto
 */
export const memberListSchema = z.object({
  dashboardId: z.number().int().positive(),
  page: z.number().int().positive().optional(),
  size: z.number().int().positive().optional(),
});

export type Member = z.infer<typeof memberSchema>;
export type MemberListParams = z.infer<typeof memberListSchema>;

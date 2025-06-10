import { z } from 'zod';

/**
 * @description API 서버로부터 받은 대시보드 멤버 데이터의 유효성을 검사하는 스키마
 * @see src/types/dto.d.ts -> MemberApplicationServiceResponseDto
 */
export const memberSchema = z.object({
  id: z.number(),
  userId: z.number(),
  email: z.string().email({ message: '유효한 이메일 형식이 아닙니다.' }),
  nickname: z.string(),
  profileImageUrl: z.string().url({ message: '유효한 URL이 아닙니다.' }).nullish(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  isOwner: z.boolean(),
});

/**
 * @description 대시보드 멤버 목록 조회 요청 시 사용하는 쿼리 파라미터의 유효성을 검사하는 스키마
 * @see src/types/dto.d.ts -> FindMembersRequestDto
 */
export const findMembersSchema = z.object({
  dashboardId: z.number().int().positive(),
  page: z.number().int().positive().optional(),
  size: z.number().int().positive().optional(),
});

// Zod 스키마로부터 TypeScript 타입을 추론할 수 있습니다.
export type Member = z.infer<typeof memberSchema>;

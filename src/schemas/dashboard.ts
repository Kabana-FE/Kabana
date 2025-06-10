import { z } from 'zod';

/**
 * @description 페이지네이션 방식 유효성 검사를 위한 스키마
 * @see src/types/dto.d.ts -> NavigationMethod
 */
export const navigationMethodSchema = z.union([z.literal('infiniteScroll'), z.literal('pagination')]);

/**
 * @description 대시보드 목록 조회 요청 시 사용하는 쿼리 파라미터의 유효성을 검사하는 스키마
 * @see src/types/dto.d.ts -> FindDashboardsRequestDto
 */
export const dashboardListSchema = z
  .object({
    navigationMethod: navigationMethodSchema,
    cursorId: z.number().int().positive().optional(),
    page: z.number().int().positive().optional(),
    size: z.number().int().positive().optional(),
  })

  .refine(
    (data) => {
      // 페이지네이션 방식일 때는 page와 size가 필수라고 가정
      if (data.navigationMethod === 'pagination') {
        return typeof data.page === 'number' && typeof data.size === 'number';
      }
      // 무한 스크롤 방식일 때는 다른 규칙이 필요하다면 여기에 추가
      return true;
    },
    {
      message: '페이지네이션 방식에는 page와 size 파라미터가 반드시 필요합니다.',
      // 에러 메시지가 어떤 필드를 가리킬지 지정
      path: ['page'],
    },
  );

/**
 * @description 서버로부터 받은 대시보드 데이터의 유효성을 검사하는 스키마
 * @see src/types/dto.d.ts -> DashboardApplicationServiceResponseDto
 */
export const dashboardSchema = z.object({
  id: z.number(),
  title: z.string(),
  color: z.string(),
  // ISO 8601 형식의 날짜 문자열인지 검사할 수 있습니다.
  createdAt: z.string().datetime({ message: '유효한 날짜 형식이 아닙니다.' }),
  updatedAt: z.string().datetime({ message: '유효한 날짜 형식이 아닙니다.' }),
  createdByMe: z.boolean(),
  userId: z.number(),
});

/**
 * @description 대시보드 생성 폼 유효성 검사를 위한 스키마
 * @see src/types/dto.d.ts -> CreateDashboardRequestDto
 */
export const createDashboardSchema = z.object({
  title: z
    .string()
    .min(1, { message: '대시보드 이름은 비워둘 수 없습니다.' })
    .max(20, { message: '이름은 20자 이내로 작성해주세요.' }),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, {
    message: '유효한 헥스 코드 색상을 입력해주세요.',
  }),
});

/**
 * @description 대시보드 수정 폼 유효성 검사를 위한 스키마
 * - createDashboardSchema의 모든 필드를 선택적으로(optional) 만듭니다.
 * @see src/types/dto.d.ts -> UpdateDashboardRequestDto
 */
export const updateDashboardSchema = createDashboardSchema.partial();

export type NavigationMethod = z.infer<typeof navigationMethodSchema>;
export type CreateDashboardInput = z.infer<typeof createDashboardSchema>;
export type UpdateDashboardInput = z.infer<typeof updateDashboardSchema>;
export type DashboardListParams = z.infer<typeof dashboardListSchema>;
export type Dashboard = z.infer<typeof dashboardSchema>;

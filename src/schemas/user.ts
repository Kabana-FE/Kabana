import { z } from 'zod';

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

export type User = z.infer<typeof userSchema>;

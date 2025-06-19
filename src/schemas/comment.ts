import { z } from 'zod';

export const getCommentsSchema = z.object({
  cursorId: z.number(),
  comments: z.object({
    id: z.number(),
    content: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    cardId: z.number(),
    author: z.object({
      profileImageUrl: z.string(),
      nickname: z.string(),
      id: z.number(),
    }),
  }),
});

export type GetCommentsType = z.infer<typeof getCommentsSchema>;

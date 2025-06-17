import { z } from 'zod';

export const columnsSchema = z.object({
  result: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      teamId: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
  ),
});

export const columnDetailsSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  cards: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      dueDate: z.string(),
      assignee: z.object({
        profileImageUrl: z.string(),
        nickname: z.string(),
        id: z.number(),
      }),
      imageUrl: z.string(),
      teamId: z.string(),
      columnId: z.number(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
  ),
});

// to Sever
export type ColumnsType = z.infer<typeof columnsSchema>;
export type ColumnDetailsType = z.infer<typeof columnDetailsSchema>;

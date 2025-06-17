import { z } from 'zod';

export const columnsSchema = z.object({
  result: z.string(),
  data: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      teamId: z.string(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
  ),
});

export type ColumnsSchema = z.infer<typeof columnsSchema>;

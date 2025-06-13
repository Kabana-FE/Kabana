import { z } from 'zod/v4';

export const createTodoSchema = z.object({
  assigneeUserId: z.coerce.number(),
  dashboardId: z.coerce.number(),
  columnId: z.coerce.number(),
  title: z.string().trim().min(1),
  description: z.string(),
  dueDate: z.string(),
  tags: z.array(z.string()),
  imageUrl: z.any().optional(),
});

export type CreateTodoType = z.infer<typeof createTodoSchema>;

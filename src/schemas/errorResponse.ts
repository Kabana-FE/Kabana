import { z } from 'zod/v4';

export const errorResponseSchema = z.object({
  message: z.string().optional(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;

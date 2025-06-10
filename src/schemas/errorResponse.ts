import { z } from 'zod';

export const errorResponseSchema = z.object({
  message: z.string().optional(),
});

export type ErrorResponseData = z.infer<typeof errorResponseSchema>;

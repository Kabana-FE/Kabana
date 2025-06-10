import { errorResponseSchema } from './errorResponse';

export const zodRegistry = {
  errorResponse: errorResponseSchema,
};

export type ZodSchemaKey = keyof typeof zodRegistry; // "error" | ... 이런 타입이 됨

export type ZodSchemaMap = typeof zodRegistry;

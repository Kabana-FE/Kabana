import { COMMENT_ENDPOINTS } from '@/constants/paths';
import type { GetCommentsType } from '@/schemas/comment';

import { requestGet } from './base/request';

export const getComments = async (cardId: number) => {
  return requestGet<GetCommentsType>(`${COMMENT_ENDPOINTS.LIST}?size=5&cardId=${cardId}`);
};

import { COMMENT_ENDPOINTS } from '@/constants/paths';
import type { GetCommentsType } from '@/schemas/comment';

import { requestGet } from './base/request';

/**
 * @description 댓글 목록을 불러옵니다
 * @param cardId 조회할 카드의 아이디
 * @param size 조회할 댓글 갯수 (기본값 5)
 * @return GetCommentsType의 형태로 응답이 반환됩니다
 */
export const getComments = async (cardId: number, size = 5) => {
  return requestGet<GetCommentsType>(`${COMMENT_ENDPOINTS.LIST}?size=${size}&cardId=${cardId}`);
};

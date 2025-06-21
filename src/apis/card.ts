import { CARD_ENDPOINTS } from '@/constants/paths';
import type { CardImageType, CreateTodoType, GetCardListType } from '@/schemas/card';

import { requestDelete, requestGet, requestPost } from './base/request';

export const createCard = async (data: CreateTodoType) => {
  return requestPost<string, CreateTodoType>(CARD_ENDPOINTS.CREATE, data);
};

export const getCardList = async (columnId: number) => {
  return requestGet<GetCardListType>(`cards?size=10&columnId=${columnId}`);
};

export const uploadCardImage = async (columnId: number, data: FormData) => {
  return requestPost<CardImageType, FormData>(`columns/${columnId}/card-image`, data);
};

export const deleteCard = async (cardId: number) => {
  return requestDelete<void>(`${CARD_ENDPOINTS.DELETE(String(cardId))}`);
};

import type { GetCardListType } from '@/schemas/card';

import { requestGet } from './base/request';

export const createCard = async (data: FormData) => {
  // return requestPost<string, FormData>('cards', data);
};

export const getCardList = async (columnId: number) => {
  return requestGet<GetCardListType>(`cards?size=10&columnId=${columnId}`);
};

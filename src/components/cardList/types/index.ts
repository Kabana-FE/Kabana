import type { CardType, GetCardListType } from '@/schemas/card';

export interface CardListType {
  data: GetCardListType;
  title: string;
  columnId: number;
}

export interface CardItemType {
  data: CardType;
}

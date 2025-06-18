import type { CardType, GetCardListType } from '@/schemas/card';

export interface CardListType {
  data: GetCardListType;
  title: string;
}

export interface CardItemType {
  data: CardType;
}

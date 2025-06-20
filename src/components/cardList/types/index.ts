import type { CardType, GetCardListType } from '@/schemas/card';

export interface CardListType {
  data: GetCardListType;
  title: string;
  columnId: number;
  dashboardId: number;
}

export interface CardItemType {
  card: CardType;
}

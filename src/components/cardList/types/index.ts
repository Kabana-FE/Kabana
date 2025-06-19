import type { CardType, GetCardListType } from '@/schemas/card';

export interface CardListType {
  data: GetCardListType;
  title: string;
  columnId: number;
  onSelectCard: (card: CardType, columnTitle: string) => void;
  toggleCardDetail: () => void;
}

export interface CardItemType {
  card: CardType;
  onSelectCard: () => void;
  toggleModal: () => void;
}

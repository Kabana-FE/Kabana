import type { CardType, GetCardListType } from '@/schemas/card';

export interface CardListType {
  data: GetCardListType;
  title: string;
  columnId: number;
  onSelectCard: (card: CardType, columnTitle: string) => void;
  toggleCardDetail: () => void;
  toggleCreateTodo: () => void;
  setSelectedCardId: (cardId: number) => void;
}

export interface CardItemType {
  card: CardType;
  cardId: number;
  onSelectCard: () => void;
  toggleModal: () => void;
  setSelectedCardId: (cardId: number) => void;
}

import type { CardType } from '@/schemas/card';

export interface ModalType {
  isModalOpen: boolean;
  toggleModal: () => void;
}
export interface DetailType extends ModalType {
  data: CardType;
}

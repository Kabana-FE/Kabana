import type { CardType } from '@/schemas/card';
import type { CommentType } from '@/schemas/comment';

export interface ModalType {
  isModalOpen: boolean;
  toggleModal: () => void;
}
export interface DetailType extends ModalType {
  title: string;
  data: CardType;
  toggleDeleteAlert: () => void;
  toggleEditTodo: () => void;
}

export interface CommentPropsType {
  data: CommentType;
  onEdit: (comment: CommentType) => void;
  onDelete: () => void;
}

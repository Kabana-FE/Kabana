export interface ModalType {
  modalIsOpen: boolean;
  toggleModal: () => void;
}
export interface DetailType extends ModalType {
  title?: string;
  description?: string;
  tagList?: string[];
  column?: string;
  assignee?: string;
  dueDate?: string;
}

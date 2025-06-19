export interface TagListType {
  label: string;
  color: string;
}

export interface ModalType {
  isModalOpen: boolean;
  toggleModal: () => void;
}

export interface CreateTodoModalType extends ModalType {
  dashboardId: number;
  columnId: number;
}

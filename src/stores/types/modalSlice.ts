export interface ModalSlice {
  createTodo: boolean;
  editTodo: boolean;
  createColumn: boolean;
  editColumn: boolean;
  createDashboard: boolean;

  toggleCreateTodo: () => void;
  toggleEditTodo: () => void;
  toggleCreateColumn: () => void;
  toggleEditColumn: () => void;
  toggleCreateDashboard: () => void;
}

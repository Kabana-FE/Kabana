export interface CreateColumnProps {
  dashboardId: number;
}

export interface EditColumnProps {
  columnId: number;
  initialTitle: string;
}

export interface DeleteAlertProps {
  columnId: number;
}

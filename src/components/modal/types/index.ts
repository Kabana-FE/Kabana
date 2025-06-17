export interface CreateColumnProps {
  /**
   * 컬럼을 생성할 대상 대시보드 ID
   */
  dashboardId: number;
}

export interface EditColumnProps {
  /**
   * 수정할 컬럼의 ID
   */
  columnId: number;
  /**
   * 수정 전 컬럼 제목 (입력 필드 초기값)
   */
  initialTitle: string;
}

export interface DeleteAlertProps {
  /**
   * 삭제할 컬럼의 ID
   */
  columnId: number;
}

export interface InviteMemberProps {
  /**
   * 초대할 대상 대시보드 ID
   */
  dashboardId: number;
}

export interface CreateDashboardProps {
  /**
   * 모달의 열림 여부 상태
   * (true: 모달이 열림 / false: 모달이 닫힘)
   */
  isModalOpen: boolean;
  /**
   * 모달의 열림/닫힘 상태를 토글하는 함수
   */
  toggleModal: () => void;
}
export interface CreateColumnProps {
  /**
   * 컬럼을 생성할 대상 대시보드 ID
   */
  dashboardId: number;
  /**
   * 모달의 열림 여부 상태
   * (true: 모달이 열림 / false: 모달이 닫힘)
   */
  isModalOpen: boolean;
  /**
   * 모달의 열림/닫힘 상태를 토글하는 함수
   */
  toggleModal: () => void;
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
  /**
   * 모달의 열림 여부 상태
   * (true: 모달이 열림 / false: 모달이 닫힘)
   */
  isModalOpen: boolean;
  /**
   * 모달의 열림/닫힘 상태를 토글하는 함수
   */
  toggleModal: () => void;
  /**
   * 삭제 모달의 열림/닫힘 상태를 토글하는 함수
   */
  toggleDeleteAlert: () => void;
}
export interface DeleteAlertProps {
  /**
   * 삭제할 컬럼의 ID
   */
  columnId: number;
  /**
   * 모달의 열림 여부 상태
   * (true: 모달이 열림 / false: 모달이 닫힘)
   */
  isModalOpen: boolean;
  /**
   * 모달의 열림/닫힘 상태를 토글하는 함수
   */
  toggleModal: () => void;
  /**
   * 삭제 모달의 열림/닫힘 상태를 토글하는 함수
   */
}
export interface InviteMemberProps {
  /**
   * 초대할 대상 대시보드 ID
   */
  dashboardId: number;
  /**
   * 모달의 열림 여부 상태
   * (true: 모달이 열림 / false: 모달이 닫힘)
   */
  isModalOpen: boolean;
  /**
   * 모달의 열림/닫힘 상태를 토글하는 함수
   */
  toggleModal: () => void;
}

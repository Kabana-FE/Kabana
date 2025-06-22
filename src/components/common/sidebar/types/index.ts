import type { Dashboard } from '@/schemas/dashboard';

/**
 * SidebarHeader 컴포넌트의 props입니다.
 *
 * 사이드바 상단의 로고와 대시보드 생성 버튼에 툴팁을 표시할 수 있도록 제어합니다.
 */
export interface SidebarHeaderProps {
  /**
   * 툴팁을 표시하는 함수입니다.
   *
   * @param target - 툴팁이 기준할 DOM 요소 (예: 버튼, 항목 등)
   * @param content - 툴팁에 표시할 문자열
   */
  showTooltip: (target: HTMLElement, content: string) => void;

  /**
   * 현재 표시된 툴팁을 숨기는 함수입니다.
   */
  hideTooltip: () => void;
}

/**
 * SidebarNavItem 컴포넌트의 props입니다.
 *
 * 각 대시보드 항목을 렌더링하고, 마우스 호버 및 터치 제스처에 따라 툴팁을 표시/숨기기 위한 동작을 제어합니다.
 */
export interface SidebarNavItemProps {
  /**
   * 대시보드 항목 정보 객체입니다.
   * 각 항목에는 ID, 타이틀, 색상, 작성자 정보 등이 포함됩니다.
   */
  dashboard: Dashboard;

  /**
   * 사이드바가 열려 있는 상태인지 여부입니다.
   * true일 경우 텍스트도 보이고, false일 경우 아이콘만 보입니다.
   */
  isSidebarOpen: boolean;

  /**
   * 마우스가 해당 항목에 올라갔을 때 툴팁을 표시하는 콜백입니다.
   *
   * @param target - 기준 DOM 요소
   * @param content - 툴팁 텍스트
   */
  onHover: (target: HTMLElement, content: string) => void;

  /**
   * 마우스가 해당 항목에서 벗어날 때 툴팁을 숨기는 콜백입니다.
   */
  onHoverOut: () => void;

  /**
   * 터치 디바이스에서 해당 항목을 터치 시작했을 때 호출됩니다.
   * long-press 툴팁 표시를 위해 사용됩니다.
   */
  onTouchStart: () => void;

  /**
   * 터치 디바이스에서 해당 항목을 터치 종료했을 때 호출됩니다.
   * 툴팁을 숨기기 위해 사용됩니다.
   */
  onTouchEnd: () => void;
}

/**
 * SidebarPagination 컴포넌트의 props입니다.
 *
 * 사이드바 하단의 페이지네이션 UI와 푸터 문구를 렌더링하기 위한 정보를 담고 있습니다.
 */
export interface SidebarPaginationProps {
  totalPages: number;
  currentPage: number;
  isSidebarOpen: boolean;

  /**
   * 페이지 데이터를 불러오는 중인지 여부입니다.
   * true일 경우 페이지네이션 버튼이 비활성화될 수 있습니다.
   */
  isLoading: boolean;

  /**
   * 사용자가 페이지를 변경할 때 호출되는 콜백 함수입니다.
   *
   * @param page - 이동할 페이지 번호
   */
  onPageChange: (page: number) => void;
}

/**
 * SidebarTooltip 컴포넌트의 props입니다.
 *
 * Tooltip이 보여야 하는 위치 및 표시 여부를 제어합니다.
 */
export interface SidebarTooltipProps {
  /**
   * 사이드바가 열려 있는 상태인지 여부입니다.
   * 툴팁의 표시 조건 및 className 조합에 영향을 줍니다.
   */
  isSidebarOpen: boolean;

  /**
   * 툴팁에 표시할 텍스트입니다.
   * null일 경우 툴팁을 표시하지 않습니다.
   */
  tooltipContent: string | null;

  /**
   * 툴팁의 위치를 결정할 기준 DOM 요소의 위치 정보입니다.
   * null일 경우 툴팁을 표시하지 않습니다.
   */
  tooltipTargetRect: DOMRect | null;
}

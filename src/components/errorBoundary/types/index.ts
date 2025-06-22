/**
 * @description
 * ErrorDisplay 컴포넌트에 전달되는 props입니다.
 * HTTP 상태 코드, 에러 메시지, 사용자용 안내 문구 등을 포함하며,
 * 에러 상황에 따라 '뒤로가기' 또는 '다시 시도' 버튼을 표시할 수 있습니다.
 *
 * - `status`: HTTP 상태 코드 (예: 404, 500)
 * - `title`: 에러 제목 (예: "페이지를 찾을 수 없습니다")
 * - `message`: 사용자에게 보여줄 에러 설명
 * - `children`: 추가로 렌더링할 React 요소
 * - `variant`: 표시할 버튼 종류
 * - `onRetry`: 'retry' 버튼 클릭 시 실행할 콜백 함수
 */
export interface ErrorDisplayProps {
  status?: number;
  title: string;
  message: string;
  children?: React.ReactNode;
  variant?: Array<'back' | 'retry' | 'home'>;
  onRetry?: () => void;
}

export interface RenderErrorBoundaryProps {
  children: React.ReactNode;
}

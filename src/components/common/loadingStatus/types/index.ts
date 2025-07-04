/**
 * @description LoadingSpinner 컴포넌트에 전달되는 props입니다.
 * 로딩 스피너가 나타나기 전까지 기다릴 시간입니다.
 * 단위는 밀리초(ms)이며, 지정하지 않으면 바로 렌더링됩니다.
 *
 * @example
 * 1초 뒤에 로딩 스피너가 나타남
 * <LoadingSpinner appearAfter={1000} />
 */
export interface LoadingSpinnerProps {
  /**
   * 로딩 스피너가 나타나기 전까지 기다릴 시간(ms)입니다.
   */
  appearAfter?: number;
}

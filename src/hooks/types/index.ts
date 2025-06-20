export interface UseInfiniteScrollProps {
  /**
   * 스크롤 트리거 요소가 뷰포트에 들어왔을 때 실행될 콜백 함수입니다.
   */
  callback: () => void;
  /**
   * 더 이상 불러올 데이터가 남아있는지 여부를 나타내는 불리언 값입니다.
   * `false`일 경우 무한 스크롤 기능이 비활성화되어 불필요한 콜백 호출을 방지합니다.
   */
  isMoreData: boolean;
}

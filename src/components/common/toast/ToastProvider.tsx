/**
 * @description 전역 토스트 알림을 렌더링하는 Provider 컴포넌트입니다.
 *
 * Zustand 전역 상태에서 `toasts` 배열을 구독하고, 각 토스트를 `<Toast />` 컴포넌트로 렌더링합니다.
 *
 * 렌더링은 `createPortal`을 통해 HTML의 `#toast-root` 요소에 삽입되며,
 * DOM 계층 구조와 무관하게 항상 화면의 우측 상단 고정 위치에서 토스트가 표시됩니다.
 *
 * 주요 특징:
 * - `toasts.length === 0`인 경우 아무것도 렌더링하지 않습니다.
 * - 기본 위치는 `fixed top-4 right-4`, `z-[9999]`로 다른 UI 위에 표시됩니다.
 * - `#toast-root` DOM 요소가 존재하지 않으면 렌더링하지 않습니다.
 *
 * 주의사항:
 * - 이 컴포넌트를 사용하려면 HTML에 `<div id="toast-root"></div>`가 필요합니다.
 * - 클라이언트에서만 `document.getElementById` 호출이 가능하므로, 초기 마운트 시점에만 `toastRoot`를 설정합니다.
 *   (즉, 서버사이드 렌더링 시엔 포털 렌더링이 발생하지 않음)
 *
 *
 * @returns 전역 토스트 배열 목록을 포탈로 렌더링하는 컴포넌트. 조건을 만족하지 않으면 `null`을 반환합니다.
 *
 */
const ToastProvider = () => {
  // const toasts = useKabanaStore((state) => state.toasts);
  // const [toastRoot, setToastRoot] = useState<HTMLElement | null>(null);
  // useEffect(() => {
  //   setToastRoot(document.getElementById('toast-root'));
  // }, []);
  // if (toasts.length === 0 || !toastRoot) {
  //   return null;
  // }
  // return createPortal(
  //   <div className='fixed top-4 right-4 z-[9999] flex flex-col gap-3'>
  //     {toasts.map((toast) => (
  //       <Toast key={toast.id} toast={toast} />
  //     ))}
  //   </div>,
  //   toastRoot,
  // );
};

export default ToastProvider;

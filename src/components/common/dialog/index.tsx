import ButtonArea from './ButtonArea';
import Close from './Close';
import Content from './Content';
import Root from './Root';
import Title from './Title';
/**
 * Dialog 컴포넌트 모듈입니다.
 *
 * 이 모듈은 다양한 부분으로 구성된 모달 UI 컴포넌트를 제공합니다.
 * 아래의 서브 컴포넌트들을 조합하여 커스터마이징된 모달을 구성할 수 있습니다.
 *
 * title을 제외한 서브 컴포넌트에 className prop을 통해 커스텀이 가능합니다.
 * @example
 * ```tsx
 * <Dialog.Root modalIsOpen={state값} ToggleModal={toggleFn}>
 *   <Dialog.Title>제목</Dialog.Title>
 *   <Dialog.Close />
 *   <Dialog.Content>본문</Dialog.Content>
 *   <Dialog.ButtonArea>
 *     <button>확인</button>
 *   </Dialog.ButtonArea>
 * </Dialog.Root>
 * ```
 */
export default {
  /**
   * 모달의 최상위 래퍼 컴포넌트입니다.
   *
   * @param {string} [className] - 모달 스타일을 커스텀할 때 사용합니다.
   * @param {boolean} ModalIsOpen - 모달의 표시 여부를 제어합니다.
   * @param {() => void} toggleModal - 모달 표시 상태를 토글하는 함수입니다.
   *
   * @remarks
   * - `<Dialog.Root>`는 반드시 포함되어야 합니다.
   * - 내부에는 최소 하나 이상의 하위 컴포넌트가 포함되거나, 직접 너비/높이를 지정해야 합니다.
   * - `<Dialog.Close />`는 `<Dialog.Title />` 오른쪽에 고정되어 렌더링됩니다.
   */
  Root,

  /**
   * 모달의 제목 영역입니다.
   *
   * @param {string} [className] - 제목 텍스트의 커스텀 스타일 클래스입니다.
   */
  Title,

  /**
   * 모달을 닫는 버튼입니다.
   *
   * @component
   * @param {() => void} toggleModal - 모달을 닫기 위한 토글 함수
   */
  Close,

  /**
   * 모달의 본문 영역입니다.
   *
   * @param {string} [className] - 본문 영역의 커스텀 스타일 클래스입니다.
   */
  Content,

  /**
   * 모달의 하단 버튼 영역입니다.
   *
   * @param {string} [className] - 버튼 영역의 커스텀 스타일 클래스입니다.
   */
  ButtonArea,
};

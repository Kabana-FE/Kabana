import ErrorMessage from './ErrorMessage';
import Field from './Field';
import Label from './Label';
import Root from './Root';

/**
 * Input 컴포넌트 모듈입니다.
 *
 * 이 모듈은 다양한 입력 폼 요소들을 조합할 수 있는 합성 컴포넌트 구조를 제공합니다.
 * 아래의 서브 컴포넌트들을 조합하여 로그인, 회원가입, 댓글 등 다양한 입력 폼을 구성할 수 있습니다.
 *
 * 각 컴포넌트는 `className`을 통해 Tailwind 기반의 스타일 확장이 가능합니다.
 *
 * @example
 * ```tsx
 * <Input.Root>
 *   <Input.Label>이메일</Input.Label>
 *   <Input.Field type="email" />
 *   <Input.ErrorMessage>이메일을 입력해주세요</Input.ErrorMessage>
 * </Input.Root>
 * ```
 */
const Input = {
  /**
   * 입력 폼의 최상위 래퍼 컴포넌트입니다.
   *
   * @param {string} [className] - 입력 영역 전체를 감싸는 래퍼 스타일을 지정할 수 있습니다.
   * @param {React.ReactNode} children - 내부에 포함할 Label, Field, ErrorMessage 등을 자식으로 전달합니다.
   *
   * @remarks
   * - `children`의 순서는 무관하지만, `Label → Field → ErrorMessage` 순서로 자동 정렬됩니다.
   * - 내부 정렬은 수직 정렬(`flex-col`, `gap`)로 구성되어 있습니다.
   */
  Root,

  /**
   * 입력 필드와 연결되는 라벨 컴포넌트입니다.
   *
   * @param {string} [className] - 텍스트 스타일을 지정할 수 있습니다.
   * @param {React.ReactNode} children - 라벨에 표시할 텍스트 또는 요소입니다.
   *
   * @remarks
   * - `htmlFor` 속성을 사용해 `<Input.Field>`의 `id`와 연결할 수 있습니다.
   */
  Label,

  /**
   * 실제 사용자 입력을 받는 필드입니다.
   *
   * @param {string} type - 기본값은 `'text'`, `textarea`, `file` 등 지원됩니다.
   * @param {string} [className] - 인풋 영역의 스타일을 지정할 수 있습니다.
   * @param {...rest} 기타 HTML 속성들 - `placeholder`, `autoComplete`, `onChange` 등 기본 input 속성을 전달할 수 있습니다.
   *
   * @remarks
   * - `type="textarea"`이면 `<textarea>`, `type="file"`이면 파일 업로드 input, 그 외는 `<input>`으로 렌더링됩니다.
   */
  Field,

  /**
   * 입력값 오류 메시지를 표시하는 영역입니다.
   *
   * @param {string} [className] - 오류 메시지 스타일 지정
   * @param {React.ReactNode} children - 오류 메시지 텍스트 또는 요소
   *
   * @remarks
   * - 에러가 발생한 필드 하단에 자동 정렬되어 표시됩니다.
   */
  ErrorMessage,
};

export default Input;

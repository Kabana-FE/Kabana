/**
 * `<label>` 요소에 대한 속성 정의입니다.
 * React의 기본 `<label>` 속성을 모두 확장하며, Input 컴포넌트의 라벨로 사용됩니다.
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * 연결할 input 요소의 id입니다. 필수 입력입니다.
   */
  htmlFor: string;
  /**
   * 라벨 안에 렌더링될 내용입니다.
   * 일반적으로 문자열 또는 React 엘리먼트를 사용하며, 관련 입력 필드를 설명하는 텍스트입니다.
   */
  children: React.ReactNode;
}

/**
 * 입력 필드 아래에 표시되는 에러 메시지 컴포넌트의 속성입니다.
 * 입력 유효성 검사 실패 시 사용자에게 피드백을 제공하는 역할을 합니다.
 */
export interface ErrorMessageProps {
  /**
   * 에러 메시지의 스타일을 커스터마이징하기 위한 클래스 이름입니다.
   */
  className?: string;
  /**
   * 렌더링할 에러 메시지 내용입니다.
   * 이 값이 없으면 에러 메시지는 렌더링되지 않습니다.
   */
  children?: React.ReactNode;
}

/**
 * 일반적인 `<input>` 요소에 사용되는 속성입니다.
 * `type`이 `'file'` 또는 `'textarea'`가 아닌 경우에만 사용됩니다.
 */
export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * 입력 타입입니다. 예: `'text'`, `'password'`, `'email'` 등.
   * `'file'`과 `'textarea'`는 이 타입에서 제외되며, 각각 별도의 컴포넌트로 처리됩니다.
   */
  type?: Exclude<string, 'file' | 'textarea'>;
  /**
   * 입력 필드 왼쪽에 렌더링할 아이콘이나 커스텀 요소입니다.
   */
  leftIcon?: React.ReactNode;
  /**
   * 입력 필드 오른쪽에 렌더링할 아이콘이나 커스텀 요소입니다.
   * 보통 비밀번호 보기 토글 버튼이나 검색 버튼 등에 사용됩니다.
   */
  rightIcon?: React.ReactNode;
  /**
   * 유효하지 않은 입력 상태를 나타냅니다.
   * 주로 스타일링(예: 빨간 테두리)을 위해 사용됩니다.
   */
  isInvalid?: boolean;
  /**
   * 내부 `<input>` 요소에 전달될 참조 객체입니다.
   * imperative하게 포커스, 값 접근 등을 할 때 사용됩니다.
   */
  ref?: React.Ref<HTMLInputElement>;
}

/**
 * `<textarea>` 요소에 대한 속성입니다.
 * `type` 속성은 DOM에는 전달되지 않으며, 컴포넌트 내부 분기 처리용으로만 사용됩니다.
 */
export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'autoComplete'> {
  /**
   * 내부 로직에서 `FieldProps` 타입 분기를 위해 사용됩니다.
   * 실제로 `<textarea>` 태그에는 전달되지 않습니다.
   */
  type: 'textarea';
  /**
   * 내부 `<textarea>` 요소에 전달될 참조 객체입니다.
   */
  ref?: React.Ref<HTMLTextAreaElement>;
}

/**
 * 파일 업로드용 `<input type="file">` 요소의 속성입니다.
 * `type`은 항상 `'file'`이며, 실제 DOM에 직접 명시됩니다.
 */
export interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * 내부 로직에서 `FieldProps` 타입 분기를 위해 사용됩니다.
   * 실제 `<input>` 태그에는 `type="file"`로 고정되어 들어갑니다.
   */
  type: 'file';
  /**
   * 내부 `<input>` 요소에 전달될 참조 객체입니다.
   */
  ref?: React.Ref<HTMLInputElement>;
}

/**
 * Input.Field에서 사용 가능한 모든 필드 타입의 유니언입니다.
 * `type` 값에 따라 Text, TextArea, FileUpload 중 적절한 컴포넌트를 선택합니다.
 */
export type FieldProps = TextInputProps | TextAreaProps | FileUploadProps;

/**
 * Input 컴포넌트의 Root 영역에 대한 속성입니다.
 * 보통 label, input, errorMessage를 하나로 묶는 컨테이너 역할을 합니다.
 */
export interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Root 컴포넌트 안에 들어갈 모든 자식 요소입니다.
   * 일반적으로 Label, Field, ErrorMessage 컴포넌트가 포함됩니다.
   */
  children: React.ReactNode;
}

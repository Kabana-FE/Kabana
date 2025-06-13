/**
 * @description 파싱된 오류 객체를 나타내며, 사용자 및 개발자를 위한 별도의 메시지와 HTTP 상태를 제공합니다.
 * @property {number} status - HTTP 상태 코드 (예: 404, 500).
 * @property {string} userMessage - 사용자에게 표시될 오류 메시지.
 * @property {string} devMessage - 개발자가 디버깅을 위해 사용할 상세 오류 메시지.
 */
export interface ParsedError {
  status: number;
  userMessage: string;
  devMessage: string;
}

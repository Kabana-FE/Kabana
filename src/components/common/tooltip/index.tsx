import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

import type { TooltipProps } from './types';

/**
 * Tooltip 컴포넌트
 *
 * 기준 요소(`targetRect`)의 오른쪽 중앙 위치에 툴팁을 포털을 통해 띄웁니다.
 * Tailwind CSS와 `createPortal`을 활용해 고정 위치에 스타일링된 텍스트 박스를 렌더링합니다.
 * 툴팁의 꼬리(삼각형)는 포함되지 않으며, 단순한 정보 표시용 레이어로 사용됩니다.
 *
 * @component
 * @param {TooltipProps} props - Tooltip 컴포넌트에 전달되는 props
 * @param {React.ReactNode} props.children - Tooltip 내부에 표시할 콘텐츠
 * @param {DOMRect | null} props.targetRect - 툴팁을 배치할 기준이 되는 DOM 요소의 위치 및 크기
 * @param {string} [props.className] - Tailwind 등의 추가 스타일을 위한 클래스 이름 (선택 사항)
 *
 * @example
 * ```tsx
 * <Tooltip targetRect={elementRect}>이곳에 설명 표시</Tooltip>
 * ```
 */
const Tooltip = ({ children, targetRect, className }: TooltipProps) => {
  const portalRoot = document.getElementById('portal-root');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (targetRect && tooltipRef.current) {
      const top = targetRect.top + targetRect.height / 2;
      const left = targetRect.right + 8;
      setPosition({ top, left });
    }
  }, [targetRect]);

  if (!portalRoot || !targetRect) return null;

  return createPortal(
    <div
      ref={tooltipRef}
      className={twMerge(
        'fixed z-50 rounded-md bg-cream px-3 py-1.5 text-sm whitespace-nowrap text-capybara shadow-lg',
        className,
      )}
      style={{ top: `${position.top}px`, left: `${position.left}px`, transform: 'translateY(-50%)' }}
    >
      {children}
    </div>,
    portalRoot,
  );
};

export default Tooltip;

import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import type { PopoverOptions, PopoverState } from '@/components/common/popover/types';

/**
 * @function usePopover
 *
 * @description
 * 팝오버 UI를 제어하는 데 필요한 상태 및 로직을 캡슐화한 커스텀 훅입니다.
 *
 * 이 훅은 팝오버 트리거 요소와 콘텐츠 요소를 기준으로 위치를 계산하고,
 * 외부 클릭 시 자동으로 닫히는 등의 UX 개선 기능을 제공합니다.
 *
 * ### 주요 기능
 * - `isOpen` 상태로 팝오버 열림 여부를 관리
 * - `toggle`, `close` 메서드를 통해 팝오버 열고 닫기 제어
 * - `triggerRef`, `contentRef`를 통한 DOM 참조 제공
 * - 팝오버 콘텐츠의 좌표(`coords`)를 트리거 요소 또는 지정된 기준 요소(`anchorRef`)를 기준으로 계산
 * - 트리거/콘텐츠 외부 클릭 또는 ESC 키 입력 시 팝오버 자동 닫힘
 *
 * ### 위치 계산 방식
 * - 기준 요소(`positionRef`) 또는 트리거(`triggerRef`)의 `getBoundingClientRect()`를 기준으로 콘텐츠 위치 계산
 * - `offsetX`, `offsetY`, `align`을 통해 콘텐츠의 정밀한 위치 조정 가능
 *
 * @param {PopoverOptions} [options] - 팝오버 위치 및 오프셋 설정을 위한 옵션 객체
 * @param {number} [options.offsetX=0] - 콘텐츠의 x축 방향 오프셋(px)
 * @param {number} [options.offsetY=2] - 콘텐츠의 y축 방향 오프셋(px)
 * @param {'start' | 'end'} [options.align='start'] - 콘텐츠의 가로 정렬 방식 ('start': 좌측 정렬, 'end': 우측 정렬)
 * @param {React.RefObject<HTMLElement>} [options.positionRef] - 위치 기준 요소를 직접 지정 (기본값: triggerRef)
 * 기본적으로 `triggerRef`를 기준으로 삼지만, 이 값을 전달하면 해당 요소를 기준으로 콘텐츠의 위치가 결정됩니다.
 * 예: 아이콘 버튼이 아닌 별도 엘리먼트를 기준으로 팝오버가 떠야 할 경우 유용합니다.
 *
 * @returns {PopoverState} 팝오버 제어에 필요한 상태 및 메서드를 포함한 객체
 * - `isOpen: boolean` 팝오버가 열려 있는지 여부
 * - `toggle: () => void` 열기/닫기 토글 함수
 * - `close: () => void` 닫기 함수
 * - `triggerRef: RefObject<HTMLElement>` 트리거 요소의 ref
 * - `contentRef: RefObject<HTMLDivElement>` 콘텐츠 요소의 ref
 * - `coords: { bottom: number, left: number } | null` 콘텐츠 위치 좌표
 *
 * @example
 * ```tsx
 * const {
 *   isOpen,
 *   toggle,
 *   close,
 *   triggerRef,
 *   contentRef,
 *   coords,
 * } = usePopover({
 *   offsetX: 10,
 *   offsetY: 8,
 *   align: 'end',
 *   positionRef: customRef, // 트리거가 아닌 다른 요소를 기준으로 위치 계산
 * });
 * ```
 */
const usePopover = (options: PopoverOptions = {}): PopoverState => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ bottom: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { offsetX = 0, offsetY = 2, positionRef, align = 'start' } = options;

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  useLayoutEffect(() => {
    const anchorEl = positionRef?.current || triggerRef.current;

    if (isOpen && anchorEl && contentRef.current) {
      const anchorRect = anchorEl.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      let xPosition: number;
      if (align === 'end') {
        xPosition = anchorRect.right + window.scrollX - contentRect.width;
      } else {
        xPosition = anchorRect.left + window.scrollX;
      }

      setCoords({
        bottom: anchorRect.bottom + window.scrollY + offsetY,
        left: xPosition + offsetX,
      });
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isOpen &&
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        contentRef.current &&
        !contentRef.current.contains(target)
      ) {
        close();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close, offsetX, offsetY, positionRef, align, triggerRef]);

  return { isOpen, toggle, close, triggerRef, contentRef, coords };
};

export default usePopover;

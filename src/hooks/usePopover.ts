import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import type { PopoverOptions, PopoverState } from '@/components/common/popover/types';

/**
 * 팝오버(Popover) UI를 제어하기 위한 커스텀 훅입니다.
 *
 * 이 훅은 팝오버의 열림 상태, 위치 좌표, 트리거 및 콘텐츠 요소의 참조를 제공하며,
 * 팝오버 위치 계산, 외부 클릭 감지, ESC 키 닫기 등의 기능을 포함합니다.
 *
 * 옵션을 통해 위치 기준 요소나 정렬 방식, 오프셋을 지정할 수 있습니다.
 * 콘텐츠는 화면 공간에 따라 자동으로 좌우·상하 정렬이 전환됩니다.
 *
 * ---
 *
 * ### 주요 기능
 * - `toggle`: 팝오버 열기/닫기 토글
 * - `close`: 팝오버 닫기
 * - `triggerRef`, `contentRef`: 요소 위치 참조
 * - `coords`: 위치 좌표 계산 결과
 * - 외부 클릭 또는 ESC 키 입력 시 자동으로 닫힘
 * - resize 시 위치 재계산
 *
 * ---
 *
 * @param {PopoverOptions} [options] - 팝오버 위치 설정 옵션
 * @param {number} [options.offsetX=0] - 콘텐츠 X축 오프셋
 * @param {number} [options.offsetY=2] - 콘텐츠 Y축 오프셋
 * @param {'start' | 'end'} [options.align='start'] - 콘텐츠 수평 정렬 방향
 * @param {React.RefObject<HTMLElement>} [options.positionRef] - 위치 기준 커스텀 요소
 *
 * @returns {PopoverState} 팝오버 상태 객체
 * @returns {boolean} return.isOpen - 팝오버 열림 여부
 * @returns {() => void} return.toggle - 팝오버 열기/닫기 토글 함수
 * @returns {() => void} return.close - 팝오버 닫기 함수
 * @returns {React.RefObject<HTMLElement>} return.triggerRef - 트리거 요소 참조
 * @returns {React.RefObject<HTMLDivElement>} return.contentRef - 콘텐츠 요소 참조
 * @returns {{ bottom: number; left: number } | null} return.coords - 콘텐츠 위치 좌표
 *
 * @example
 * const popover = usePopover({ align: 'end', offsetY: 4 });
 *
 * <Popover.Root {...popover}>
 *   <Popover.Trigger>열기</Popover.Trigger>
 *   <Popover.Content>내용</Popover.Content>
 * </Popover.Root>
 */
const usePopover = (options: PopoverOptions = {}): PopoverState => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ bottom: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { offsetX = 0, offsetY = 2, positionRef, align = 'start' } = options;

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const calculatePosition = useCallback(() => {
    const anchorEl = positionRef?.current ?? triggerRef.current;
    if (!anchorEl || !contentRef.current) return;

    const anchorRect = anchorEl.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();

    const xToTheRight = anchorRect.left + window.scrollX + offsetX;
    const xToTheLeft = anchorRect.right + window.scrollX - contentRect.width;
    const hasSpaceOnRight = anchorRect.left + contentRect.width <= window.innerWidth;
    const hasSpaceOnLeft = anchorRect.right - contentRect.width >= 0;

    const x =
      align === 'start'
        ? hasSpaceOnRight || !hasSpaceOnLeft
          ? xToTheRight
          : xToTheLeft
        : hasSpaceOnLeft || !hasSpaceOnRight
          ? xToTheLeft
          : xToTheRight;

    const yToTheBottom = anchorRect.bottom + window.scrollY + offsetY;
    const yToTheTop = anchorRect.top + window.scrollY - contentRect.height - offsetY;
    const hasSpaceOnBottom = window.innerHeight - anchorRect.bottom >= contentRect.height;
    const hasSpaceOnTop = anchorRect.top >= contentRect.height;

    const y = hasSpaceOnBottom || !hasSpaceOnTop ? yToTheBottom : yToTheTop;

    const newCoords = { bottom: y, left: x };
    setCoords((prevCoords) => {
      if (!prevCoords || prevCoords.bottom !== newCoords.bottom || prevCoords.left !== newCoords.left) {
        return newCoords;
      }
      return prevCoords;
    });
  }, [offsetX, offsetY, align, positionRef]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
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
    },
    [isOpen, close],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    },
    [close],
  );

  useLayoutEffect(() => {
    if (!isOpen) return;

    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, calculatePosition, handleClickOutside, handleKeyDown]);

  return { isOpen, toggle, close, triggerRef, contentRef, coords };
};

export default usePopover;

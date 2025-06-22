import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import type { PopoverOptions, PopoverState } from '@/components/common/popover/types';

const usePopover = (options: PopoverOptions = {}): PopoverState => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ bottom: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { offsetX = 0, offsetY = 2, positionRef, align = 'start' } = options;

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

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

    setCoords({ bottom: y, left: x });
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

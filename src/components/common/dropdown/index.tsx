import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import Popover from '@/components/common/popover';
import usePopover from '@/hooks/usePopover';

import type { DropdownProps } from './types';

/**
 * @description
 * 드롭다운 메뉴를 렌더링하는 재사용 가능한 공통 컴포넌트입니다.
 * 키보드 및 마우스 접근성도 고려했습니다.
 *
 * - 내부적으로 `Popover` 컴포넌트를 기반으로 렌더링됩니다.
 * - 메뉴 항목은 `options` 배열로 정의되며, 링크(`option.to`) 또는 일반 액션(`onSelect`) 중 하나로 동작합니다.
 * - 트리거 요소는 외부에서 전달되며, 스타일은 `triggerClassName`으로 조절할 수 있습니다.
 * - 드롭다운 콘텐츠는 `contentClassName`, 각 항목은 `optionClassName`으로 커스터마이징 가능합니다.
 * - 위치 관련 옵션(`offsetX`, `offsetY`, `positionRef`, `align`)을 통해 정밀한 위치 제어가 가능합니다.
 * - 메뉴가 열리면 첫 항목에 자동 포커스되며, 키보드 화살표 및 Enter/Space/Tab으로 탐색 및 선택 가능합니다.
 *
 * @param {DropdownProps} props - 드롭다운 컴포넌트에 전달되는 props
 * @param {React.ReactNode} props.trigger - 드롭다운을 열기 위한 트리거 요소입니다. 버튼, 아이콘 등 어떤 노드도 가능합니다.
 * @param {string} [props.triggerClassName] - 트리거 요소에 적용할 Tailwind 클래스입니다.
 * @param {DropdownOption[]} props.options - 드롭다운에 표시될 옵션 항목들의 배열입니다.
 * @param {(value: string | number) => void} props.onSelect - `option.to`가 없는 항목 클릭 시 호출되는 콜백 함수입니다. (링크가 아닌 항목만 해당)
 * @param {string} [props.contentClassName] - 드롭다운 콘텐츠 전체에 적용할 Tailwind 클래스입니다.
 * @param {string} [props.optionClassName] - 각 옵션 항목에 공통으로 적용할 Tailwind 클래스입니다.
 * @param {number} [props.offsetX] - 콘텐츠의 수평 위치 보정을 위한 오프셋(px)
 * @param {number} [props.offsetY] - 콘텐츠의 수직 위치 보정을 위한 오프셋(px)
 * @param {React.RefObject<HTMLElement>} [props.positionRef] - 콘텐츠 위치 계산의 기준이 될 DOM 요소 ref입니다.
 * @param {'start' | 'end'} [props.align] - 콘텐츠의 수평 정렬 기준입니다. 기본값은 `'start'`
 *
 * @returns {JSX.Element} 드롭다운 UI를 포함하는 JSX 엘리먼트를 반환합니다.
 *
 * @example
 * 기본 드롭다운 사용 예시
 * ```tsx
 * <Dropdown
 *   trigger={<MoreVertIcon size={24} aria-label="더보기 옵션" />}
 *   triggerClassName="p-2 hover:bg-gray-100 rounded"
 *   contentClassName="min-w-100 p-2"
 *   optionClassName="p-2 text-sm hover:bg-gray-200 rounded"
 *   options={[
 *     { label: '수정하기', value: 'edit' },
 *     { label: '삭제하기', value: 'delete' },
 *     { label: '마이페이지', value: 'mypage', to: '/mypage' },
 *     { label: '로그아웃', value: 'logout' },
 *   ]}
 *   onSelect={(value) => {
 *     console.log('선택된 옵션:', value);
 *   }}
 * />
 * ```
 *
 */
const Dropdown = ({
  trigger,
  options,
  onSelect,
  contentClassName,
  optionClassName,
  offsetX,
  offsetY,
  positionRef,
  align,
  triggerClassName,
}: DropdownProps) => {
  const { isOpen, toggle, close, triggerRef, contentRef, coords } = usePopover({
    offsetX,
    offsetY,
    positionRef,
    align,
  });

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (isOpen && listRef.current) {
      // 메뉴가 열리면 첫 번째 아이템에 포커스
      (listRef.current.querySelector('[role="menuitem"]') as HTMLElement)?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const items = Array.from(listRef.current?.querySelectorAll('[role="menuitem"]') || []) as HTMLElement[];
    if (items.length === 0) return;

    const activeElement = document.activeElement as HTMLElement;
    const currentIndex = items.indexOf(activeElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        items[(currentIndex + 1) % items.length]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        items[(currentIndex - 1 + items.length) % items.length]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case 'Tab':
        e.preventDefault();
        close();
        break;
      case 'Enter':
      case ' ': // Space key
        if (currentIndex > -1) {
          e.preventDefault();
          items[currentIndex]?.click();
        }
        break;
    }
  };

  return (
    <Popover.Root
      close={close}
      contentRef={contentRef}
      coords={coords}
      isOpen={isOpen}
      toggle={toggle}
      triggerRef={triggerRef}
    >
      <Popover.Trigger as='button' className={triggerClassName} triggerRef={triggerRef} onToggle={toggle}>
        {trigger}
      </Popover.Trigger>
      <Popover.Content className={contentClassName} close={close} contentRef={contentRef}>
        {({ close: closeFn }) => (
          <ul ref={listRef} className='flex flex-col' role='menu' onKeyDown={handleKeyDown}>
            {options.map((option) => {
              if (option.to) {
                return (
                  <li key={option.value} role='presentation'>
                    <Link
                      className={twMerge(
                        'block cursor-pointer rounded-md p-2 text-sm text-gray-black hover:bg-cream hover:text-capybara',
                        optionClassName,
                      )}
                      role='menuitem'
                      tabIndex={-1}
                      to={option.to}
                      onClick={closeFn}
                    >
                      {option.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={option.value} role='presentation'>
                  <button
                    className={twMerge(
                      'cursor-pointer rounded-md p-2 text-sm text-gray-black hover:bg-cream hover:text-capybara',
                      optionClassName,
                    )}
                    role='menuitem'
                    tabIndex={-1}
                    type='button'
                    onClick={() => {
                      onSelect(option.value);
                      closeFn();
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </Popover.Content>
    </Popover.Root>
  );
};

export default Dropdown;

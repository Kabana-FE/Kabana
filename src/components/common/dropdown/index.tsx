import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import CheckIcon from '@/assets/icons/CheckIcon';
import Popover from '@/components/common/popover';
import usePopover from '@/hooks/usePopover';

import type { DropdownItemProps, DropdownProps } from './types';

/**
 * @description Dropdown 메뉴의 개별 항목을 렌더링하는 내부 컴포넌트입니다.
 * `option.to` 프로퍼티 유무에 따라 `Link`(라우팅) 또는 `button`(동작 실행)으로 동적으로 렌더링됩니다. (Polymorphic)
 * @param {DropdownItemProps} props - DropdownItem을 렌더링하기 위한 프로퍼티.
 * @param {DropdownOption} props.option - 아이템에 표시될 데이터 객체.
 * @param {boolean} props.isSelected - 현재 아이템이 선택된 상태인지 여부.
 * @param {string} [props.optionClassName] - 아이템에 적용할 추가 CSS 클래스.
 * @param {'start' | 'center'} [props.optionAlign] - 아이템 내부 컨텐츠 정렬.
 * @param {(value: string | number) => void} props.onSelect - 아이템 선택 시 실행될 콜백 함수.
 * @param {() => void} props.onClose - 아이템 선택 후 드롭다운을 닫기 위한 함수.
 */
const DropdownItem = ({ option, isSelected, optionClassName, optionAlign, onSelect, onClose }: DropdownItemProps) => {
  const { to, value, label, withCheck } = option;

  const optionContent = (
    <>
      {withCheck && (
        <span className='flex w-16 justify-center'>
          {isSelected && <CheckIcon color='var(--color-capybara)' size={16} />}
        </span>
      )}
      <span>{label}</span>
    </>
  );

  const commonProps = {
    className: twMerge(
      'flex w-full cursor-pointer items-center rounded-md p-2 text-sm text-gray-black hover:bg-cream hover:text-capybara focus-visible:bg-cream focus-visible:text-capybara focus-visible:outline-capybara',
      optionClassName,
      withCheck && 'gap-8',
      optionAlign === 'center' && 'justify-center',
    ),
    role: 'menuitem',
    tabIndex: -1,
    onClick: () => {
      if (!to) {
        onSelect(value);
      }
      onClose();
    },
  };

  return (
    <li role='presentation'>
      {to ? (
        <Link to={to} {...commonProps}>
          {optionContent}
        </Link>
      ) : (
        <button type='button' {...commonProps}>
          {optionContent}
        </button>
      )}
    </li>
  );
};

/**
 * @description `trigger` 요소 클릭 시 옵션 목록을 보여주는 재사용 가능한 공통 드롭다운 컴포넌트입니다.
 * Popover 컴포넌트를 기반으로 하며, 키보드 방향키, Home, End, Enter, Tab 키를 사용한 완전한 접근성을 지원합니다.
 * @param {DropdownProps} props - Dropdown 컴포넌트를 구성하기 위한 프로퍼티.
 */
const Dropdown = ({
  trigger,
  triggerAs = 'div',
  options,
  onSelect,
  contentClassName,
  optionClassName,
  offsetX,
  offsetY,
  positionRef,
  align,
  triggerClassName,
  selectedValue,
  optionAlign,
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
      listRef.current.focus();
    }
  }, [isOpen]);

  /**
   * @description 드롭다운 메뉴의 키보드 네비게이션을 처리하는 핸들러입니다.
   * - `ArrowDown`/`ArrowUp`: 항목 간 이동
   * - `Home`/`End`: 첫 항목/마지막 항목으로 이동
   * - `Enter`/`Space`: 현재 포커스된 항목 선택 (클릭)
   * - `Tab`: 메뉴를 닫음
   */
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
      case ' ':
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
      <Popover.Trigger as={triggerAs} className={triggerClassName} triggerRef={triggerRef} onToggle={toggle}>
        {trigger}
      </Popover.Trigger>
      <Popover.Content className={twMerge('w-full', contentClassName)} close={close} contentRef={contentRef}>
        {({ close: closeFn }) => (
          <ul
            ref={listRef}
            className='flex flex-col focus:outline-none'
            role='menu'
            tabIndex={-1}
            onKeyDown={handleKeyDown}
          >
            {options.map((option) => (
              <DropdownItem
                key={option.value}
                isSelected={option.value === selectedValue}
                option={option}
                optionAlign={optionAlign}
                optionClassName={optionClassName}
                onClose={closeFn}
                onSelect={onSelect}
              />
            ))}
          </ul>
        )}
      </Popover.Content>
    </Popover.Root>
  );
};

export default Dropdown;

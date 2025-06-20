import { useEffect, useRef } from 'react';

import SearchIcon from '@/assets/icons/SearchIcon';

import Input from '../common/input';
import type SearchParams from './types';

/**
 * 사용자 입력을 받아 지정된 지연 시간(debounce) 후 검색 작업을 수행하는 검색 컴포넌트입니다.
 *
 * @param {string} value - 검색 입력 필드의 현재 값.
 * @param {React.Dispatch<React.SetStateAction<string>>} setValue - 검색 입력 필드의 값을 업데이트하는 React state setter 함수.
 * @param {(value: string) => void} onSearch - 검색 로직을 실행하는 콜백 함수.
 * @param {number} [props.delay=500] - 검색어 입력 후 `onSearch` 함수가 호출되기까지의 지연 시간(밀리초). 기본값은 500ms.
 *
 * @returns {JSX.Element} 검색 입력 필드를 포함하는 JSX 요소.
 */

const Search = ({ value, setValue, onSearch, delay = 500 }: SearchParams) => {
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const timeout = setTimeout(() => onSearch(value), delay);

    return () => clearTimeout(timeout);
  }, [value, delay, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <Input.Root>
      <Input.Field
        className='h-36'
        leftIcon={<SearchIcon />}
        name='search'
        placeholder='검색'
        value={value}
        onChange={handleChange}
      />
    </Input.Root>
  );
};
export default Search;

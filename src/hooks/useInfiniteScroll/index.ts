import { useEffect, useRef } from 'react';

import type { UseInfiniteScrollProps } from './types';

/**
 * `useInfiniteScroll` 훅은 스크롤을 내리다가 뷰포트에 ref가 들어오면 콜백함수를 실행하는 무한 스크롤 기능을 제공합니다.
 * 훅을 호출하면 ref를 반환하는데 이 ref를 콜백함수를 불러올 시점을 감지할 HTML div 요소에 연결하면 됩니다.
 *
 * @param {() => void} callback - 스크롤 트리거 요소가 뷰포트에 들어왔을 때 실행될 콜백 함수입니다.
 * @param {boolean} isMoreData - 더 이상 불러올 데이터가 남아있는지 여부를 나타내는 값입니다.
 * @returns {ref: RefObject<HTMLDivElement>} 무한 스크롤 감지를 위한 `ref` 객체를 반환합니다.
 *
 */
export const useInfiniteScroll = ({ callback, isMoreData }: UseInfiniteScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || !isMoreData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 0.1 }, //뷰 포트에 10% 이상 보일 때 콜백 실행
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [isMoreData, callback]);
  return ref;
};

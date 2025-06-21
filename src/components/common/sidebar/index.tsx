import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLoaderData } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { getDashboardList } from '@/apis/dashboard';
import AddBoxIcon from '@/assets/icons/AddBoxIcon';
import CrownIcon from '@/assets/icons/CrownIcon';
import DotIcon from '@/assets/icons/DotIcon';
import HorizontalLogo from '@/assets/images/HorizontalLogo';
import LogoImage from '@/assets/images/LogoImage';
import LogoTextImage from '@/assets/images/LogoTextImage';
import Button from '@/components/common/button';
import Tooltip from '@/components/common/tooltip';
import CreateDashboard from '@/components/modal/CreateDashboard';
import Pagination from '@/components/pagination';
import { getDashboardDetailPath, ROUTES } from '@/constants/paths';
import type { authGuardLoaderData } from '@/loaders/types';
import { type Dashboard, dashboardListResponseSchema } from '@/schemas/dashboard';
import { useKabanaStore } from '@/stores';

/**
 * Sidebar 컴포넌트
 *
 * Kabana 앱의 대시보드 레이아웃 좌측에 위치하는 네비게이션 사이드바입니다.
 * 대시보드 목록을 표시하고, 새 대시보드를 생성할 수 있으며,
 * 뷰포트 크기와 사이드바 열림 상태에 따라 레이아웃이 반응형으로 조정됩니다.
 *
 * 주요 특징:
 * - `Zustand`의 `useKabanaStore()`를 사용하여 사이드바 상태(열림/닫힘)를 전역 관리합니다.
 * - 모바일에서 화면이 작으니까 토글하면 사이드바가 아예 사라지며, long-press 시 툴팁이 표시됩니다.
 * - 태블릿/PC에서는 토글하면 사이드바가 모바일 사이즈로 고정되며, 호버 시 툴팁이 나타납니다.
 * - 각 대시보드는 `NavLink`로 라우팅되며, 활성화 시 스타일이 변경되고,
 *   사용자가 생성한 대시보드는 Crown 아이콘, 그렇지 않으면 Dot 아이콘으로 구분됩니다.
 * - 페이지네이션 기능을 통해 대시보드 목록을 페이지 단위로 요청하고 렌더링합니다.
 * - `Tooltip` 컴포넌트는 조건부 렌더링되며, 사이드바 상태 및 브레이크포인트에 따라 노출 방식이 다릅니다.
 * - 툴팁은 아이콘에 마우스 호버하거나 모바일에서 long-press(0.5초) 시 표시됩니다.
 *
 *
 */
const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useKabanaStore();
  const loaderData = useLoaderData() as authGuardLoaderData;
  const PAGE_SIZE = loaderData?.pageSize || 10;

  // --- 페이지네이션 상태 관리 ---
  const [dashboards, setDashboards] = useState<Dashboard[]>(loaderData?.dashboards || []);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(loaderData?.totalCount || 0);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // --- 기존 상태 (모달, 툴팁) ---
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const toggleCreateModal = () => setIsCreateModalOpen((prev) => !prev);
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipTargetRect, setTooltipTargetRect] = useState<DOMRect | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]); // 툴팁(long-press) 상태를 관리할 ID와 타이머 Ref
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null); // 플러스 아이콘 버튼을 위한 ref 생성
  const addDashboardButtonRef = useRef<HTMLButtonElement>(null);

  // --- 페이지 변경 핸들러 ---
  const handlePageChange = useCallback(
    async (page: number) => {
      if (isLoading || page < 1 || page > totalPages) return;
      setIsLoading(true);
      try {
        const newDashboardData = await getDashboardList({
          navigationMethod: 'pagination',
          size: PAGE_SIZE,
          page,
        });
        const parsedData = dashboardListResponseSchema.parse(newDashboardData);
        setDashboards(parsedData.dashboards);
        setCurrentPage(page);
        setTotalCount(parsedData.totalCount);
      } catch (error) {
        console.error('🩺 대시보드 페이지 변경 실패:', error);
        // TODO: Toast 메시지 표시
        // showToast({ type: 'error', message: '대시보드 목록을 불러오는데 실패했습니다.' });
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, PAGE_SIZE, totalPages],
  );

  // --- 툴팁 관련 핸들러 (기존과 동일) ---
  const showTooltip = (targetElement: HTMLElement, content: string) => {
    setTooltipTargetRect(targetElement.getBoundingClientRect());
    setTooltipContent(content);
  };

  const hideTooltip = () => {
    setTooltipContent(null);
    setTooltipTargetRect(null);
  };

  // 터치를 시작하면 0.5초 뒤 showTooltip을 호출하는 핸들러
  const handleTouchStart = (id: number, content: string) => {
    // 기존 타이머가 있다면 해제
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    // 0.5초 뒤 툴팁을 표시하는 타이머 설정
    const target = itemRefs.current[id];
    if (!target) return;

    longPressTimer.current = setTimeout(() => {
      showTooltip(target, content);
    }, 500);
  };

  // 터치가 끝나면 타이머를 해제하고 hideTooltip을 호출하는 핸들러
  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    hideTooltip();
  };

  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  const sidebarClasses = twMerge(
    'fixed left-0 h-[calc(100vh-50px)] flex items-center justify-center flex-col border-r border-gray-200 bg-white px-8 py-5 transition-all duration-300 ease-in-out',
    // 모바일: 화면이 작으니까 사이드바가 아예 없어질수도 있게.
    isSidebarOpen ? 'translate-x-0' : '-translate-x-full',

    // 태블릿 이상: 항상 보임 (단, 열림 여부에 따라 너비 조절)
    'tablet:translate-x-0',
    isSidebarOpen ? 'w-70 tablet:w-160 pc:w-300' : 'tablet:w-70',
  );

  const baseLinkClasses =
    'flex w-full items-center gap-4 rounded-lg p-3 text-lg text-gray-500 transition-colors hover:bg-cream p-10';
  const activeLinkClasses = 'bg-cream font-bold text-capybara';

  return (
    <>
      <aside className={sidebarClasses}>
        <Link className='flex h-60 items-center tablet:h-70' to={ROUTES.DASHBOARD_LIST}>
          {isSidebarOpen ? (
            <>
              <LogoImage className='tablet:hidden' size={40} />
              <LogoTextImage className='hidden tablet:block pc:hidden' size={120} />
              <HorizontalLogo className='hidden pc:block' size={200} />
            </>
          ) : (
            <LogoImage className='' size={40} />
          )}
        </Link>
        <div
          className={twMerge(
            'mb-10 flex w-full shrink-0 cursor-pointer items-center justify-center gap-10 rounded-lg p-10 hover:bg-cream',
            isSidebarOpen ? 'justify-center tablet:justify-start' : 'justify-center',
          )}
          onClick={toggleCreateModal}
        >
          <Button
            ref={addDashboardButtonRef}
            aria-label='새로운 대시보드 생성'
            size='none'
            variant='none'
            onMouseEnter={() => {
              if (addDashboardButtonRef.current) {
                showTooltip(addDashboardButtonRef.current, '새로운 대시보드');
              }
            }}
            onMouseLeave={hideTooltip}
          >
            <AddBoxIcon size={22} />
          </Button>
          <span className={twMerge('hidden truncate font-semibold text-capybara', isSidebarOpen && 'tablet:inline')}>
            NEW
          </span>
        </div>

        <nav className='min-h-0 w-full flex-1 overflow-y-auto'>
          <ul className='flex w-full flex-col items-center justify-center'>
            {dashboards.map((dashboard) => (
              <li
                key={dashboard.id}
                ref={(el) => {
                  itemRefs.current[dashboard.id] = el;
                }}
                className='group relative w-full'
                onMouseEnter={() => {
                  const target = itemRefs.current[dashboard.id];
                  if (target) {
                    showTooltip(target, dashboard.title);
                  }
                }}
                onMouseLeave={hideTooltip}
                onTouchEnd={handleTouchEnd}
                onTouchStart={() => handleTouchStart(dashboard.id, dashboard.title)}
              >
                <NavLink
                  className={({ isActive }) =>
                    twMerge(
                      baseLinkClasses,
                      isActive && activeLinkClasses,
                      'flex items-center justify-center gap-10',
                      isSidebarOpen ? 'justify-center tablet:justify-start' : 'justify-center',
                    )
                  }
                  to={getDashboardDetailPath(String(dashboard.id))}
                >
                  <div className='relative'>
                    {dashboard.createdByMe ? (
                      <CrownIcon color={dashboard.color} size={20} />
                    ) : (
                      <DotIcon color={dashboard.color} size={10} />
                    )}
                  </div>
                  <span className={twMerge('hidden truncate', isSidebarOpen && 'tablet:inline')}>
                    {dashboard.title}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className='w-full border-t border-gray-200 pt-10'>
          {totalPages > 1 && (
            <div className='flex'>
              <Pagination
                currentPage={currentPage}
                isLoading={isLoading}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              >
                <span className='mr-8 hidden text-md text-gray-400 pc:block'>{`${currentPage} / ${totalPages}`}</span>
              </Pagination>
            </div>
          )}
          <div className='w-full pt-5 text-xs text-gray-400'>
            {isSidebarOpen && <div className='mt-2 hidden text-center tablet:block'>Powered by Capybara </div>}
          </div>
        </div>
      </aside>
      {tooltipContent && (
        <Tooltip
          className={isSidebarOpen ? 'block tablet:hidden' : 'hidden tablet:block'}
          targetRect={tooltipTargetRect}
        >
          {tooltipContent}
        </Tooltip>
      )}
      <CreateDashboard isModalOpen={isCreateModalOpen} toggleModal={toggleCreateModal} />
    </>
  );
};

export default Sidebar;

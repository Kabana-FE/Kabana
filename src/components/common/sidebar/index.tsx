import { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { getDashboardList } from '@/apis/dashboard';

import TOAST_MESSAGES from '@/constants/messages/toastMessages';

import { useToast } from '@/hooks/useToast';
import type { authGuardLoaderData } from '@/loaders/types';
import type { Dashboard } from '@/schemas/dashboard';
import { dashboardListResponseSchema } from '@/schemas/dashboard';
import { useKabanaStore } from '@/stores';

import SidebarHeader from './Header';
import SidebarNavItem from './NavItem';
import SidebarPagination from './Pagination';
import SidebarTooltip from './Tooltip';

const Sidebar = () => {
  const { isSidebarOpen } = useKabanaStore();
  const loaderData = useLoaderData() as authGuardLoaderData;
  const PAGE_SIZE = loaderData?.pageSize || 10;
  const { showError } = useToast();

  const [dashboards, setDashboards] = useState<Dashboard[]>(loaderData?.dashboards || []);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(loaderData?.totalCount || 0);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipTargetRect, setTooltipTargetRect] = useState<DOMRect | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDashboards(loaderData?.dashboards || []);
  }, [loaderData?.dashboards]);

  const showTooltip = (target: HTMLElement, content: string) => {
    setTooltipTargetRect(target.getBoundingClientRect());
    setTooltipContent(content);
  };

  const hideTooltip = () => {
    setTooltipContent(null);
    setTooltipTargetRect(null);
  };

  const handleTouchStart = (id: number, content: string) => {
    const target = itemRefs.current[id];
    if (!target) return;
    longPressTimer.current = setTimeout(() => {
      showTooltip(target, content);
    }, 500);
  };

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

  const handlePageChange = async (page: number) => {
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
      console.error('🩺 대시보드 리스트 더 불러오기 실패:', error);
      showError(TOAST_MESSAGES.API.FETCH_FAILURE('대시보드'));
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <aside
        className={`fixed top-0 left-0 flex h-[calc(100vh-50px)] flex-col items-center border-r border-gray-200 bg-white px-8 py-5 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} tablet:translate-x-0 ${isSidebarOpen ? 'w-70 tablet:w-160 pc:w-300' : 'tablet:w-70'} `}
      >
        <SidebarHeader hideTooltip={hideTooltip} showTooltip={showTooltip} />

        <nav className='min-h-0 w-full flex-1 overflow-y-auto'>
          <ul className='flex w-full flex-col items-center justify-center'>
            {dashboards.map((dashboard) => (
              <SidebarNavItem
                key={dashboard.id}
                ref={(el) => {
                  itemRefs.current[dashboard.id] = el;
                }}
                dashboard={dashboard}
                isSidebarOpen={isSidebarOpen}
                onHover={showTooltip}
                onHoverOut={hideTooltip}
                onTouchEnd={handleTouchEnd}
                onTouchStart={() => handleTouchStart(dashboard.id, dashboard.title)}
              />
            ))}
          </ul>
        </nav>

        <SidebarPagination
          currentPage={currentPage}
          isLoading={isLoading}
          isSidebarOpen={isSidebarOpen}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </aside>

      <SidebarTooltip
        isSidebarOpen={isSidebarOpen}
        tooltipContent={tooltipContent}
        tooltipTargetRect={tooltipTargetRect}
      />
    </>
  );
};

export default Sidebar;

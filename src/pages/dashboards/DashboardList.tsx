import { useCallback, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { getDashboardList } from '@/apis/dashboard';
import { getInvitationList } from '@/apis/invitation';
import AddIcon from '@/assets/icons/AddIcon';
import NoInvitation from '@/assets/icons/NoInvitationIcon';
import Button from '@/components/common/button';
import DashboardItem from '@/components/dashboardItem';
import InvitationItem from '@/components/invitationItem';
import Pagination from '@/components/pagination';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import type { DashboardListLoaderData } from '@/loaders/dashboard/types';
import { type Dashboard, dashboardListResponseSchema } from '@/schemas/dashboard';
import { type Invitation, invitationListSchema } from '@/schemas/invitation';

// my dashboard
const DashboardList = () => {
  const initialData = useLoaderData() as DashboardListLoaderData;

  const [dashboardList, setDashboardList] = useState<Dashboard[]>(initialData.dashboardList.dashboards);
  const [page, setPage] = useState<number>(1);
  const totalDashboardCount = initialData.dashboardList.totalCount;
  const totalDashboardPage = Math.ceil(totalDashboardCount / 5);

  const [invitationList, setInvitationList] = useState<Invitation[]>(initialData.invitationList.invitations);
  const [cursorId, setCursorId] = useState<number | null>(initialData.invitationList.cursorId);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const rawDashboardList = await getDashboardList({ navigationMethod: 'pagination', size: 5, page });
        const dashboardList = dashboardListResponseSchema.parse(rawDashboardList);
        setDashboardList(dashboardList.dashboards);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDashboard();
  }, [page]);

  const fetchMoreInvitation = useCallback(async () => {
    if (!cursorId) return;
    try {
      const rawMoreInvitation = await getInvitationList({ cursorId });
      const invitationList = await invitationListSchema.parse(rawMoreInvitation);
      setInvitationList((prev) => [...prev, ...invitationList.invitations]);
      setCursorId(invitationList.cursorId);
    } catch (error) {
      console.error(error);
    }
  }, [cursorId]);

  const infiniteScrollRef = useInfiniteScroll({
    callback: fetchMoreInvitation,
    isMoreData: cursorId !== null,
  });

  return (
    <div className='flex w-full'>
      <div className='w-67 bg-white tablet:w-160 pc:w-300' />
      <div className='w-full max-w-1022 p-24'>
        <div>
          <ul className='grid gap-8 tablet:grid-cols-2 tablet:gap-10 pc:grid-cols-3 pc:gap-13'>
            <li>
              <Button
                className='h-58 w-full gap-12 rounded-lg text-md font-semibold text-gray-700 tablet:h-68 tablet:text-lg'
                size='none'
                variant='outlined'
              >
                새로운 대시보드 <AddIcon className='size-20 rounded-sm bg-cream p-5 tablet:size-22 tablet:p-6' />
              </Button>
            </li>
            {dashboardList.map((item) => (
              <li key={item.id}>
                <DashboardItem {...item} />
              </li>
            ))}
          </ul>

          {totalDashboardPage > 1 && (
            <div className='mt-16 mb-24 flex items-center justify-end tablet:mb-48 pc:-mb-34'>
              <span className='mr-16 text-xs font-normal tablet:text-md'>
                {page} 페이지 중 {totalDashboardPage}
              </span>
              <Pagination currentPage={page} totalPages={totalDashboardPage} onPageChange={setPage} />
            </div>
          )}
        </div>
        <div className='mt-32 flex flex-col rounded-lg bg-white tablet:mt-40 pc:mt-74'>
          <div className='flex flex-col gap-16 px-16 py-24 tablet:px-28 tablet:py-32'>
            <h2 className='text-xl font-bold tablet:text-2xl'>초대받은 대시보드</h2>
            {invitationList.length > 0 ? (
              <input className='h-36 border border-gray-300' placeholder='검색' />
            ) : (
              <div className='flex flex-col items-center justify-center gap-16 pt-105 pb-80 tablet:gap-24 tablet:pt-64 tablet:pb-120'>
                <NoInvitation className='size-53 tablet:size-88' />
                <p className='text-md font-normal text-gray-400 tablet:text-2lg'>아직 초대받은 대시보드가 없어요</p>
              </div>
            )}
          </div>
          <ul>
            {invitationList.length > 0 && (
              <li className='hidden px-28 text-gray-400 tablet:flex pc:px-76'>
                <span className='w-3/10'>이름</span>
                <span className='w-2/10'>초대자</span>
                <span className='w-4/10 text-center'>수락 여부</span>
              </li>
            )}
            {invitationList.map((item) => (
              <li
                key={item.id}
                className='border-b border-gray-200 px-16 py-14 tablet:flex tablet:items-center tablet:px-28 tablet:py-22 pc:px-76'
              >
                <InvitationItem dashboardTitle={item.dashboard.title} inviterNickname={item.inviter.nickname} />
              </li>
            ))}
          </ul>
          <div ref={infiniteScrollRef} />
        </div>
      </div>
    </div>
  );
};

export default DashboardList;

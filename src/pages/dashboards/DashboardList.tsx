import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import AddIcon from '@/assets/icons/AddIcon';
import Button from '@/components/common/button';
import DashboardItem from '@/components/dashboardItem';
import Pagination from '@/components/pagination';
import type { DashboardListLoaderData } from '@/loaders/dashboard/types';
import type { Dashboard } from '@/schemas/dashboard';
import type { Invitation } from '@/schemas/invitation';

// my dashboard
const DashboardList = () => {
  const initialData = useLoaderData() as DashboardListLoaderData;
  const [dashboardList, setDashboardList] = useState<Dashboard[]>(initialData.dashboardList.dashboards);
  const [invitationList, setInvitationList] = useState<Invitation[]>(initialData.invitationList.invitations);

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
            {dashboardList.map((item) => {
              return (
                <li key={item.id}>
                  <DashboardItem {...item} />
                </li>
              );
            })}
          </ul>

          <div className='mt-16 mb-24 flex items-center justify-end tablet:mb-48'>
            <span className='mr-16 text-xs font-normal tablet:text-md'>1 페이지 중 1</span>
            <Pagination currentPage={1} totalPages={4} onPageChange={() => {}} />
          </div>
        </div>
        <div className='flex flex-col rounded-lg bg-white'>
          <div className='flex flex-col gap-16 px-16 py-24 tablet:px-28 tablet:py-32'>
            <h2 className='text-xl font-bold tablet:text-2xl'>초대받은 대시보드</h2>
            <input className='h-36 border border-gray-300' placeholder='검색' />
          </div>
          <ul>
            <li className='hidden px-28 text-gray-400 tablet:flex pc:px-76'>
              <span className='w-3/10'>이름</span>
              <span className='w-2/10'>초대자</span>
              <span className='w-4/10 text-center'>수락 여부</span>
            </li>
            <li className='border-b border-gray-200 px-16 py-14 tablet:flex tablet:items-center tablet:px-28 tablet:py-22 pc:px-76'>
              <div className='flex gap-24 text-md font-normal tablet:w-3/10 tablet:text-lg'>
                <span className='w-38 text-gray-400 tablet:hidden'>이름</span>
                <span>프로덕트 디자인</span>
              </div>
              <div className='flex gap-24 text-md font-normal tablet:w-2/10 tablet:text-lg'>
                <span className='w-38 text-gray-400 tablet:hidden'>초대자</span>
                <span>손동희</span>
              </div>
              <div className='mt-14 flex justify-center gap-10 tablet:mt-0 tablet:w-4/10'>
                <Button className='w-full tablet:w-72 tablet:text-md pc:w-84' size='sm'>
                  수락
                </Button>
                <Button className='w-full tablet:w-72 tablet:text-md pc:w-84' size='sm' variant='outlined'>
                  거절
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardList;

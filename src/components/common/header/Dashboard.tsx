import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useRouteLoaderData } from 'react-router';
import { twMerge } from 'tailwind-merge';

import AddBoxIcon from '@/assets/icons/AddBoxIcon';
import ChevronIcon from '@/assets/icons/ChevronIcon';
import CrownIcon from '@/assets/icons/CrownIcon';
import SettingIcon from '@/assets/icons/SettingIcon';
import Avatar from '@/components/Avatar';
import Group from '@/components/Avatar/Group';
import Button from '@/components/common/button';
import InviteMember from '@/components/modal/InviteMember';
import { ROUTES } from '@/constants/paths/routes';
import { useAuth } from '@/hooks/useAuth';
import type { DashboardDetailLoaderData } from '@/loaders/dashboard/types';
import { useKabanaStore } from '@/stores';

import Dropdown from '../dropdown';

const DashboardHeader = () => {
  const location = useLocation();
  const { isSidebarOpen, toggleSidebar } = useKabanaStore();

  const user = useKabanaStore((state) => state.user);
  const userName = user?.nickname;
  const profileImageUrl = user?.profileImageUrl;

  const id = location.pathname.includes('/edit') ? 'edit' : 'detail';

  const data = (useRouteLoaderData(id) as DashboardDetailLoaderData) || undefined;
  const dashboardDetail = data?.dashboardDetail;
  const memberList = data?.memberList;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleOption = (value: string | number) => {
    if (value === 'logout') {
      logout();
      navigate(ROUTES.APP);
    }
  };

  return (
    <>
      <header
        className={twMerge(
          'flex h-60 items-center gap-16 border-b border-gray-300 bg-white pr-8 pl-18 tablet:h-70 tablet:gap-32 tablet:pr-32 tablet:pl-40 pc:gap-40 pc:pr-80 pc:pl-40',
          'fixed top-0 right-0 z-10',
          'transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'left-70 tablet:left-160 pc:left-300' : 'left-0 tablet:left-70',
        )}
      >
        <Button
          aria-label={isSidebarOpen ? '사이드바 닫기' : '사이드바 열기'}
          className='h-auto items-center justify-center rounded-full border bg-white p-10 shadow-md transition hover:bg-gray-100 active:bg-cream'
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <div className='flex items-center justify-center gap-3'>
              <ChevronIcon direction='left' />
            </div>
          ) : (
            <div className='flex items-center justify-center gap-3'>
              <ChevronIcon direction='right' />
            </div>
          )}
        </Button>

        <div className='flex flex-1 items-center justify-between'>
          {dashboardDetail ? (
            <h1 className='invisible flex items-center gap-8 text-lg font-bold text-gray-700 pc:visible'>
              {dashboardDetail.title}
              {dashboardDetail.createdByMe && <CrownIcon color={dashboardDetail.color} />}
            </h1>
          ) : (
            <h1 className='text-lg font-bold text-gray-700'>
              {location.pathname === ROUTES.DASHBOARD_LIST ? '내 대시보드' : '계정관리'}
            </h1>
          )}

          {dashboardDetail?.createdByMe && (
            <div className='flex items-center gap-6 tablet:gap-12 pc:gap-16'>
              <Button
                as={Link}
                className='flex gap-8 rounded-md px-12 py-7 text-md/17 font-medium text-gray-500 tablet:rounded-lg tablet:px-16 tablet:py-8'
                size='none'
                to={`/dashboard/${dashboardDetail.id}/edit`}
                variant='outlined'
              >
                <SettingIcon className='hidden tablet:block' />
                관리
              </Button>
              <Button
                className='flex gap-8 rounded-md px-12 py-7 text-md/17 font-medium text-gray-500 tablet:rounded-lg tablet:px-16 tablet:py-8'
                size='none'
                variant='outlined'
                onClick={() => setIsModalOpen(true)}
              >
                <AddBoxIcon className='hidden tablet:block' />
                초대하기
              </Button>
            </div>
          )}
        </div>

        <div className='flex items-center'>
          {memberList?.members && (
            <>
              <Group className='pr-12 tablet:pr-24 pc:hidden' max={2}>
                {memberList.members.map((member) => (
                  <Avatar key={member.id} nickname={member.nickname} src={member.profileImageUrl ?? undefined} />
                ))}
              </Group>
              <Group className='hidden pr-32 pc:flex' max={4}>
                {memberList.members.map((member) => (
                  <Avatar key={member.id} nickname={member.nickname} src={member.profileImageUrl ?? undefined} />
                ))}
              </Group>
            </>
          )}
          <div className='border-l border-gray-300 pl-16 tablet:pl-32 pc:pl-36'>
            <Dropdown
              align='end'
              optionAlign='center'
              options={[
                { label: '마이페이지', value: 'mypage', to: ROUTES.MYPAGE },
                { label: '로그아웃', value: 'logout' },
              ]}
              positionRef={dropdownRef}
              trigger={
                <div ref={dropdownRef} className='flex w-full items-center gap-12'>
                  <Avatar nickname={userName || ''} src={profileImageUrl ?? undefined} />
                  <span className='hidden text-lg font-medium text-gray-700 tablet:block'>{userName}</span>
                </div>
              }
              triggerClassName='w-full'
              onSelect={handleOption}
            />
          </div>
        </div>
      </header>
      {dashboardDetail && isModalOpen && (
        <InviteMember
          dashboardId={dashboardDetail.id}
          isModalOpen={isModalOpen}
          toggleModal={() => setIsModalOpen((prev) => !prev)}
          onInviteSuccess={() => {}}
        />
      )}
    </>
  );
};

export default DashboardHeader;

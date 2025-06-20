import { Link, useLocation, useRouteLoaderData } from 'react-router';

import AddBoxIcon from '@/assets/icons/AddBoxIcon';
import CrownIcon from '@/assets/icons/CrownIcon';
import SettingIcon from '@/assets/icons/SettingIcon';
import Avatar from '@/components/Avatar';
import Group from '@/components/Avatar/Group';
import { ROUTES } from '@/constants/paths/routes';
import type { DashboardDetailLoaderData } from '@/loaders/dashboard/types';
import { useKabanaStore } from '@/stores';

import Button from '../button';

const DashboardHeader = () => {
  const location = useLocation();

  const user = useKabanaStore((state) => state.user);
  const userName = user?.nickname;
  const profileImageUrl = user?.profileImageUrl;

  const id = location.pathname.includes('/edit') ? 'edit' : 'detail';

  const data = (useRouteLoaderData(id) as DashboardDetailLoaderData) || undefined;
  const dashboardDetail = data?.dashboardDetail;
  const memberList = data?.memberList;

  return (
    <header className='flex h-60 items-center gap-16 border-b border-gray-300 pr-8 pl-18 tablet:h-70 tablet:gap-32 tablet:pr-32 tablet:pl-40 pc:gap-40 pc:pr-80 pc:pl-40'>
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
          <Link className='flex items-center gap-12' to={ROUTES.MYPAGE}>
            <Avatar nickname={userName || ''} src={profileImageUrl ?? undefined} />
            <span className='hidden text-lg font-medium text-gray-700 tablet:block'>{userName}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

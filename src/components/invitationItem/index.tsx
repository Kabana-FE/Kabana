import Button from '@/components/common/button';

import type { InvitationItemProps } from './types';

/**
 * 초대받은 대시보드 목록의 개별 항목을 렌더링하는 컴포넌트입니다.
 * 각 항목은 대시보드 이름, 초대자 정보, 그리고 초대를 수락하거나 거절하는 버튼을 포함합니다.
 *
 * @param {string} dashboardTitle - 초대받은 대시보드의 제목입니다.
 * @param {string} inviterNickname - 초대를 보낸 사용자의 닉네임입니다.
 */
const InvitationItem = ({ dashboardTitle, inviterNickname }: InvitationItemProps) => {
  return (
    <>
      <div className='flex gap-24 text-md font-normal tablet:w-3/10 tablet:text-lg'>
        <span className='w-38 text-gray-400 tablet:hidden'>이름</span>
        <span>{dashboardTitle}</span>
      </div>
      <div className='flex gap-24 text-md font-normal tablet:w-2/10 tablet:text-lg'>
        <span className='w-38 text-gray-400 tablet:hidden'>초대자</span>
        <span>{inviterNickname}</span>
      </div>
      <div className='mt-14 flex justify-center gap-10 tablet:mt-0 tablet:w-4/10'>
        <Button className='w-full tablet:w-72 tablet:text-md pc:w-84' size='sm'>
          수락
        </Button>
        <Button className='w-full tablet:w-72 tablet:text-md pc:w-84' size='sm' variant='outlined'>
          거절
        </Button>
      </div>
    </>
  );
};
export default InvitationItem;

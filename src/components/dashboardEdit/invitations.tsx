import Button from '@/components/common/button';
import type { InvitationsProps } from '@/components/dashboardEdit/types';

const Invitations = ({ email, isLast }: InvitationsProps) => {
  return (
    <>
      <li className='flex items-center justify-between px-20 py-12 tablet:px-28 tablet:py-16'>
        <div className='text-md tablet:text-lg'>{email}</div>
        <Button className='w-52 tablet:w-84 tablet:text-md' size='sm' type='button' variant='outlined'>
          취소
        </Button>
      </li>
      {!isLast && <div className='border-b border-gray-200' />}
    </>
  );
};

export default Invitations;

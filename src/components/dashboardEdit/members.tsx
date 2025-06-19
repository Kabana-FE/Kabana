import Avatar from '../Avatar';
import Button from '../common/button';
import type { MembersProps } from './types';

const Members = ({ nickname, profileImg, isLast }: MembersProps) => {
  return (
    <>
      <li className='flex items-center justify-between px-20 py-12 tablet:px-28 tablet:py-16'>
        <div className='flex items-center justify-between gap-8'>
          <Avatar nickname={nickname} src={profileImg} />
          <span className='text-md tablet:text-lg'>{nickname}</span>
        </div>
        <Button className='w-52 p-0 tablet:w-84 tablet:text-md' size='sm' type='button' variant='outlined'>
          삭제
        </Button>
      </li>
      {!isLast && <div className='border-b border-gray-200' />}
    </>
  );
};

export default Members;

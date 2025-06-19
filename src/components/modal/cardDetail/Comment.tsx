import Avatar from '@/components/Avatar';

import type { CommentPropsType } from './types';

const Comment = ({ data }: CommentPropsType) => {
  return (
    <div className='my-10 flex gap-8'>
      <Avatar nickname={data.author.nickname} src={data.author.profileImageUrl && data.author.profileImageUrl} />
      <div className='flex flex-col'>
        <div className='flex items-center gap-8'>
          <h3 className='text-xs font-semibold text-gray-700 tablet:text-md/24'>{data.author.nickname}</h3>
          <span className='text-[10px] text-gray-400'>{data.createdAt}</span>
        </div>
        <div className='text-xs/18 tablet:text-md/24'>{data.content}</div>
        <div className='flex gap-8'>
          <span className='text-[10px] text-gray-400 underline tablet:text-xs'>수정</span>
          <span className='text-[10px] text-gray-400 underline tablet:text-xs'>삭제</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;

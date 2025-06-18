import { useState } from 'react';

import CalendarIcon from '@/assets/icons/CalendarIcon';
import CardDetail from '@/components/modal/cardDetail';

import Avatar from '../Avatar';
import Tag from '../tag';
import type { CardItemType } from './types';

const CardItem = ({ data }: CardItemType) => {
  const [cardDetail, setCardDetail] = useState(false);

  return (
    <div
      className='my-10 flex flex-col rounded-md border-1 border-gray-300 bg-white p-12 tablet:my-16 tablet:flex-row tablet:justify-between tablet:px-14 tablet:py-20 pc:flex-col'
      onClick={() => setCardDetail(!cardDetail)}
    >
      <img
        alt='카드에 대한 이미지입니다'
        className='h-151 w-full rounded-md bg-gray-400 object-cover tablet:h-53 tablet:w-90 pc:h-160 pc:w-full'
        src={data.imageUrl}
      />
      <div className='flex flex-col justify-between tablet:ml-20 tablet:flex-1/2 tablet:flex-row pc:ml-0 pc:flex-col'>
        <div className='flex flex-1/2 flex-col'>
          <h2 className='my-6 text-md/24 font-medium tablet:text-base'>{data.title}</h2>
          <div>
            {data.tags?.map((tag: string) => {
              return <Tag key={tag}>{tag}</Tag>;
            })}
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <CalendarIcon />
            <span className='ml-6 text-xs/18 font-medium text-gray-500'>{data.dueDate}</span>
          </div>
          <Avatar
            nickname={data.assignee.nickname}
            src={data.assignee.profileImageUrl && data.assignee.profileImageUrl}
          />
        </div>
      </div>
      <CardDetail data={data} modalIsOpen={cardDetail} toggleModal={() => setCardDetail(!cardDetail)} />
    </div>
  );
};

export default CardItem;

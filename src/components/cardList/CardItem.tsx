import CalendarIcon from '@/assets/icons/CalendarIcon';

import Avatar from '../Avatar';
import Tag from '../tag';
import type { CardItemType } from './types';

const CardItem = ({ card, cardId, onSelectCard, setSelectedCardId, toggleModal }: CardItemType) => {
  return (
    <div
      className='my-10 flex flex-col rounded-md border-1 border-gray-300 bg-white p-12 tablet:my-16 tablet:flex-row tablet:justify-between tablet:px-14 tablet:py-20 pc:flex-col'
      onClick={() => {
        onSelectCard();
        toggleModal();
        setSelectedCardId(cardId);
      }}
    >
      <img
        alt='카드에 대한 이미지입니다'
        className='h-151 w-full rounded-md bg-gray-400 object-cover tablet:h-53 tablet:w-90 pc:h-160 pc:w-full'
        src={card.imageUrl}
      />
      <div className='flex flex-col justify-between tablet:ml-20 tablet:flex-1/2 tablet:flex-row pc:ml-0 pc:flex-col'>
        <div className='flex flex-col'>
          <h2 className='my-6 text-md/24 font-medium tablet:text-base'>{card.title}</h2>
          <div className='flex gap-6'>
            {card.tags?.map((tag: string) => {
              return <Tag key={tag}>{tag}</Tag>;
            })}
          </div>
        </div>
        <div className='flex flex-1/2 items-end justify-between'>
          <div className='flex items-center'>
            <CalendarIcon />
            <span className='ml-6 text-xs/18 font-medium text-gray-500'>{card.dueDate}</span>
          </div>
          <Avatar
            nickname={card.assignee.nickname}
            src={card.assignee.profileImageUrl && card.assignee.profileImageUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default CardItem;

import { useState } from 'react';
import { useParams } from 'react-router';

import CalendarIcon from '@/assets/icons/CalendarIcon';
import Avatar from '@/components/Avatar';
import CardDetail from '@/components/modal/cardDetail';
import DeleteCardAlert from '@/components/modal/DeleteCardAlert';
import EditTodo from '@/components/modal/EditTodo';
import Tag from '@/components/tag';

import type { CardItemType } from './types';

const CardItem = ({ card }: CardItemType) => {
  const [cardDetail, setCardDetail] = useState(false);
  const [editTodo, setEditTodo] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const params = useParams();
  return (
    <div
      className='flex flex-col rounded-md border-1 border-gray-300 bg-white p-12 transition-colors duration-200 ease-in-out hover:border-capybara hover:bg-[#f9f5f5] active:bg-[#f1e8e8] tablet:flex-row tablet:justify-between tablet:px-14 tablet:py-20 pc:flex-col'
      onClick={() => setCardDetail(!cardDetail)}
    >
      <img
        alt='카드에 대한 이미지입니다'
        className='h-151 w-full rounded-md bg-gray-400 object-cover tablet:h-53 tablet:w-90 pc:h-160 pc:w-full'
        src={card.imageUrl}
      />
      <div className='flex flex-col justify-between tablet:ml-20 tablet:flex-1/2 tablet:flex-row pc:ml-0 pc:flex-col'>
        <div className='flex flex-col tablet:flex-1/6'>
          <h2 className='my-6 text-md/24 font-medium tablet:text-base'>{card.title}</h2>
          <div className='flex gap-6'>
            {card.tags?.map((tag: string) => {
              return <Tag key={tag}>{tag}</Tag>;
            })}
          </div>
        </div>
        <div className='flex items-baseline-last justify-between align-middle tablet:flex-1/2'>
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
      {cardDetail && (
        <CardDetail
          data={card}
          isModalOpen={cardDetail}
          toggleDeleteAlert={() => setDeleteAlert(!deleteAlert)}
          toggleEditTodo={() => setEditTodo(!editTodo)}
          toggleModal={() => setCardDetail(!cardDetail)}
        />
      )}
      {deleteAlert && (
        <DeleteCardAlert cardId={card.id} isModalOpen={deleteAlert} toggleModal={() => setDeleteAlert(!deleteAlert)} />
      )}
      {editTodo && (
        <EditTodo
          cardId={card.id}
          columnId={card.columnId}
          dashboardId={Number(params.dashboardId)}
          data={card}
          isModalOpen={editTodo}
          toggleModal={() => setEditTodo(!editTodo)}
        />
      )}
    </div>
  );
};

export default CardItem;

import { useEffect, useState } from 'react';

import { getCardList } from '@/apis/card';
import AddIcon from '@/assets/icons/AddIcon';
import DotIcon from '@/assets/icons/DotIcon';
import SettingIcon from '@/assets/icons/SettingIcon';
import CardItem from '@/components/cardList/CardItem';
import Button from '@/components/common/button';
import TOAST_MESSAGES from '@/constants/messages/toastMessages';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useToast } from '@/hooks/useToast';
import { getCardListSchema } from '@/schemas/card';

import CreateTodo from '../modal/createTodo';
import DeleteAlert from '../modal/DeleteAlert';
import EditColumn from '../modal/EditColumn';
import CardSkeleton from './CardSkeleton';
import type { CardListType } from './types';

const CardList = ({ data, title, columnId, dashboardId }: CardListType) => {
  const [createTodo, setCreateTodo] = useState(false);
  const [editColumn, setEditColumn] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const [cardList, setCardList] = useState(data.cards || []);
  const [cursorId, setCursorId] = useState(data.cursorId);
  const [isCardLoading, setIsCardLoading] = useState(false);
  const { showError } = useToast();

  useEffect(() => {
    setCardList(data.cards || []);
    setCursorId(data.cursorId);
  }, [data]);

  const fetchMoreCard = async () => {
    if (cursorId === null || isCardLoading) return;
    setIsCardLoading(true);
    try {
      const rawNewCardList = await getCardList({ columnId, cursorId });
      const newCardList = getCardListSchema.parse(rawNewCardList);
      const cards = newCardList.cards || [];
      setCardList((prev) => [...prev, ...cards]);
      setCursorId(newCardList.cursorId);
    } catch (error) {
      showError(TOAST_MESSAGES.API.FETCH_FAILURE('카드'));
      console.error(error);
    } finally {
      setIsCardLoading(false);
    }
  };

  const ref = useInfiniteScroll({ callback: fetchMoreCard, isMoreData: cursorId !== null });

  return (
    <div className='border-b border-gray-200 px-12 pt-16 pb-20 tablet:px-20 tablet:pt-22 pc:w-354 pc:shrink-0 pc:border-r pc:border-b-0 pc:px-20'>
      <div className='mb-25 flex justify-between'>
        <div className='flex items-center'>
          <DotIcon size={8} />
          <h1 className='mr-12 ml-8 text-2lg font-bold'>{title}</h1>
          <span className='rounded-sm bg-gray-200 px-6 py-3 text-xs font-medium text-gray-500'>{data.totalCount}</span>
        </div>
        <Button className='p-0' variant='none' onClick={() => setEditColumn(!editColumn)}>
          <SettingIcon size={19} />
        </Button>
      </div>
      <Button className='mb-10 w-full rounded-md' variant='outlined' onClick={() => setCreateTodo(true)}>
        <AddIcon />
      </Button>
      <div className='flex max-h-323 flex-col gap-16 overflow-auto tablet:max-h-250 pc:max-h-870'>
        {cardList?.map((card) => {
          return <CardItem key={card.id} card={card} title={title} />;
        })}
        {isCardLoading && <CardSkeleton />}
        <div ref={ref} />
      </div>
      {createTodo && (
        <CreateTodo
          columnId={columnId}
          dashboardId={dashboardId}
          isModalOpen={createTodo}
          toggleModal={() => setCreateTodo(!createTodo)}
        />
      )}
      {editColumn && (
        <EditColumn
          columnId={columnId}
          initialTitle={title}
          isModalOpen={editColumn}
          toggleDeleteAlert={() => setDeleteAlert(!deleteAlert)}
          toggleModal={() => setEditColumn(!editColumn)}
        />
      )}
      {deleteAlert && (
        <DeleteAlert columnId={columnId} isModalOpen={deleteAlert} toggleModal={() => setDeleteAlert(!deleteAlert)} />
      )}
    </div>
  );
};

export default CardList;

import { useState } from 'react';
import { useLoaderData, useLocation } from 'react-router';

import AddIcon from '@/assets/icons/AddIcon';
import CardList from '@/components/cardList/CardList';
import Button from '@/components/common/button';
import CardDetail from '@/components/modal/cardDetail';
import CreateColumn from '@/components/modal/CreateColumn';
import CreateTodo from '@/components/modal/createTodo';
import DeleteAlert from '@/components/modal/DeleteAlert';
import EditColumn from '@/components/modal/EditColumn';
import type { CardType, GetCardListType } from '@/schemas/card';

const DashboardDetail = () => {
  const getModalData = (card: CardType, columnId: number, columnTitle: string) => {
    setSelectedColumnId(columnId);
    setSeletectedCard(card);
    setSelectedColumnTitle(columnTitle);
  };

  const data = useLoaderData();
  const columns = data.columns;
  const location = useLocation();
  const [createColumn, setCreateColumn] = useState(false);
  const [createTodo, setCreateTodo] = useState(false);
  const [editColumn, setEditColumn] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [cardDetail, setCardDetail] = useState(false);

  const [selectedCard, setSeletectedCard] = useState<CardType | null>(null);
  const [selectedColumnId, setSelectedColumnId] = useState<number>();
  const [selectedColumnTitle, setSelectedColumnTitle] = useState<string>();
  const [selectedCardId, setSelectedCardId] = useState<number>(0);
  const dashboardId = Number(location.pathname.split('/')[2]);
  return (
    <div className='flex h-full w-screen'>
      <section className='w-67 bg-white tablet:w-160 pc:w-300'>사이드바</section>
      <section className='flex flex-1 flex-col px-20 pc:flex-row'>
        {data.cardList &&
          data.cardList.map((cardItem: GetCardListType, idx: number) => {
            return (
              <CardList
                key={columns.data[idx].id}
                columnId={columns.data[idx].id}
                data={cardItem}
                setSelectedCardId={(cardId: number) => setSelectedCardId(cardId)}
                title={data.columns.data[idx].title}
                toggleCardDetail={() => setCardDetail(!cardDetail)}
                toggleCreateTodo={() => setCreateTodo(!createTodo)}
                onSelectCard={(card: CardType, columnTitle: string) =>
                  getModalData(card, columns.data[idx].id, columnTitle)
                }
              />
            );
          })}
        <Button className='w-full pc:flex-1/5' variant='outlined' onClick={() => setCreateColumn(!createColumn)}>
          새로운 컬럼 추가하기
          <AddIcon className='ml-15 w-16 bg-cream' />
        </Button>
      </section>
      <CreateColumn
        dashboardId={dashboardId}
        isModalOpen={createColumn}
        toggleModal={() => setCreateColumn(!createColumn)}
      />
      <CreateTodo
        columnId={selectedColumnId ?? 0}
        dashboardId={dashboardId}
        isModalOpen={createTodo}
        toggleModal={() => setCreateTodo(!createTodo)}
      />
      <EditColumn
        columnId={selectedColumnId ?? 0}
        initialTitle={selectedColumnTitle ?? ''}
        isModalOpen={editColumn}
        toggleDeleteAlert={() => setDeleteAlert(!deleteAlert)}
        toggleModal={() => setEditColumn(!editColumn)}
      />
      <DeleteAlert
        columnId={selectedColumnId ?? 0}
        isModalOpen={deleteAlert}
        toggleModal={() => setDeleteAlert(!deleteAlert)}
      />
      {selectedCard && (
        <CardDetail
          data={selectedCard}
          isModalOpen={cardDetail}
          selectedCardId={selectedCardId}
          toggleModal={() => setCardDetail(!cardDetail)}
        />
      )}
    </div>
  );
};

export default DashboardDetail;

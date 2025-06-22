import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router';

import AddIcon from '@/assets/icons/AddIcon';
import CardList from '@/components/cardList/CardList';
import Button from '@/components/common/button';
import CreateColumn from '@/components/modal/CreateColumn';
import type { DashboardDetailLoaderData } from '@/loaders/dashboard/types';
import type { GetCardListType } from '@/schemas/card';

const DashboardDetail = () => {
  const data = useLoaderData() as DashboardDetailLoaderData;
  const params = useParams();

  const dashboardId = Number(params.dashboardId);
  const [createColumn, setCreateColumn] = useState(false);

  return (
    <div className='flex h-full w-screen'>
      <section className='flex w-screen flex-col px-20 pc:flex-row pc:overflow-x-scroll'>
        {data.cardList &&
          data.cardList.map((cardItem: GetCardListType, idx: number) => {
            return (
              <CardList
                key={data.columns.data[idx].id}
                columnId={data?.columns?.data[idx]?.id ?? 0}
                dashboardId={dashboardId}
                data={cardItem}
                title={data.columns.data[idx].title}
              />
            );
          })}
        <Button
          className='w-full shrink-0 pc:flex-1/5'
          variant='outlined'
          onClick={() => {
            setCreateColumn(!createColumn);
          }}
        >
          새로운 컬럼 추가하기
          <AddIcon className='ml-15 w-16 bg-cream' />
        </Button>
      </section>
      <CreateColumn
        dashboardId={dashboardId}
        isModalOpen={createColumn}
        toggleModal={() => setCreateColumn(!createColumn)}
      />
    </div>
  );
};

export default DashboardDetail;

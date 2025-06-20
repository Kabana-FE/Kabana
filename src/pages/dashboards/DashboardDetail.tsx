import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router';

import AddIcon from '@/assets/icons/AddIcon';
import CardList from '@/components/cardList/CardList';
import Button from '@/components/common/button';
import CreateColumn from '@/components/modal/CreateColumn';
import type { GetCardListType } from '@/schemas/card';

const DashboardDetail = () => {
  const data = useLoaderData();
  const params = useParams();
  const dashboardId = Number(params.dashboardId);
  const [createColumn, setCreateColumn] = useState(false);

  return (
    <div className='flex h-full w-screen'>
      <section className='w-67 bg-white tablet:w-160 pc:w-300'>사이드바</section>
      <section className='flex flex-1 flex-col px-20 pc:flex-row'>
        {data.cardList &&
          data.cardList.map((cardItem: GetCardListType, idx: number) => {
            return (
              <CardList
                key={data.columns.data[idx].id}
                columnId={data.columns.data.id}
                dashboardId={dashboardId}
                data={cardItem}
                title={data.columns.data[idx].title}
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
    </div>
  );
};

export default DashboardDetail;

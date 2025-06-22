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
    <div className='w-full bg-gray-100'>
      <section className='flex w-full flex-col pc:flex-row'>
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
        <div className='px-12 pt-16 pb-49 tablet:px-20 tablet:pt-20'>
          <Button
            className='h-66 w-full shrink-0 rounded-lg pc:mt-78 pc:h-70 pc:w-354'
            variant='outlined'
            onClick={() => {
              setCreateColumn(!createColumn);
            }}
          >
            새로운 컬럼 추가하기
            <AddIcon className='size-20 rounded-sm bg-cream p-5 tablet:size-22 tablet:p-6 pc:ml-12' />
          </Button>
        </div>
      </section>
      {createColumn && (
        <CreateColumn
          dashboardId={dashboardId}
          isModalOpen={createColumn}
          toggleModal={() => setCreateColumn(!createColumn)}
        />
      )}
    </div>
  );
};

export default DashboardDetail;

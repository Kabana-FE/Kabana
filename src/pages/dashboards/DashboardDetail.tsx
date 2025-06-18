import { useLoaderData } from 'react-router';

import AddIcon from '@/assets/icons/AddIcon';
import CardList from '@/components/cardList/CardList';
import Button from '@/components/common/button';
import type { GetCardListType } from '@/schemas/card';

const DashboardDetail = () => {
  const data = useLoaderData();
  return (
    <div className='flex h-full w-screen'>
      <section className='w-67 bg-white tablet:w-160 pc:w-300'>사이드바</section>
      <section className='flex flex-1 flex-col px-20 pc:flex-row'>
        {data.cardList &&
          data.cardList.map((cardItem: GetCardListType, idx: number) => {
            return <CardList key={idx} data={cardItem} title={data.columns.data[idx].title} />;
          })}
        <Button className='w-full pc:flex-1/5' variant='outlined'>
          새로운 컬럼 추가하기
          <AddIcon className='ml-15 w-16 bg-cream' />
        </Button>
      </section>
    </div>
  );
};

export default DashboardDetail;

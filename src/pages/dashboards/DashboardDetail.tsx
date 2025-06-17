import { useState } from 'react';

import AddIcon from '@/assets/icons/AddIcon';
import DotIcon from '@/assets/icons/DotIcon';
import SettingIcon from '@/assets/icons/SettingIcon';
import CardItem from '@/components/cardItem';
import Button from '@/components/common/button';
import CreateTodo from '@/components/createTodo';
// main dashboard
const DashboardDetail = () => {
  const [createTodo, setCreateTodo] = useState(false);
  return (
    <div className='flex h-full w-full'>
      <section className='w-67 bg-white tablet:w-160 pc:w-300'>사이드바</section>
      <section className='w-full max-w-1022 p-24'>
        <div>
          <div className='mb-25 flex justify-between'>
            <div className='flex items-center'>
              <DotIcon />
              <h1>To do</h1>
              <span className='rounded-sm bg-gray-200 px-6 py-3'>3</span>
            </div>
            <Button variant='none'>
              <SettingIcon />
            </Button>
          </div>
          <Button className='mb-10 w-full' variant='outlined'>
            <AddIcon />
          </Button>
          <CardItem />
          <CreateTodo modalIsOpen={createTodo} toggleModal={() => setCreateTodo(!createTodo)} />
          <button onClick={() => setCreateTodo(!createTodo)}>모달열기</button>
        </div>
      </section>
    </div>
  );
};

export default DashboardDetail;

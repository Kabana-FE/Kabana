import { useState } from 'react';

import AddIcon from '@/assets/icons/AddIcon';
import DotIcon from '@/assets/icons/DotIcon';
import SettingIcon from '@/assets/icons/SettingIcon';
import CardItem from '@/components/cardList/CardItem';
import Button from '@/components/common/button';

import CreateTodo from '../modal/createTodo';
import DeleteAlert from '../modal/DeleteAlert';
import EditColumn from '../modal/EditColumn';
import type { CardListType } from './types';

const CardList = ({ data, title, columnId, dashboardId }: CardListType) => {
  const [createTodo, setCreateTodo] = useState(false);
  const [editColumn, setEditColumn] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  return (
    <div className='px-12 pc:w-354 pc:shrink-0'>
      <div className='mb-25 flex justify-between'>
        <div className='flex items-center'>
          <DotIcon />
          <h1 className='mr-12 ml-8 text-2lg font-bold'>{title}</h1>
          <span className='rounded-sm bg-gray-200 px-6 py-3 text-xs font-medium text-gray-500'>
            {data.cards?.length}
          </span>
        </div>
        <Button className='p-0' variant='none' onClick={() => setEditColumn(!editColumn)}>
          <SettingIcon />
        </Button>
      </div>
      <Button className='mb-10 w-full' variant='outlined' onClick={() => setCreateTodo(true)}>
        <AddIcon />
      </Button>
      {data.cards?.map((card, idx) => {
        return <CardItem key={`${card.id}-${idx}`} card={card} />;
      })}
      <CreateTodo
        columnId={columnId}
        dashboardId={dashboardId}
        isModalOpen={createTodo}
        toggleModal={() => setCreateTodo(!createTodo)}
      />

      <EditColumn
        columnId={columnId}
        initialTitle={title}
        isModalOpen={editColumn}
        toggleDeleteAlert={() => setDeleteAlert(!deleteAlert)}
        toggleModal={() => setEditColumn(!editColumn)}
      />
      <DeleteAlert columnId={columnId} isModalOpen={deleteAlert} toggleModal={() => setDeleteAlert(!deleteAlert)} />
    </div>
  );
};

export default CardList;

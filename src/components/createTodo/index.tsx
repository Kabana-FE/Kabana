import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import AddIcon from '@/assets/icons/AddIcon';
import Dialog from '@/components/dialog';
import type { CreateTodoType } from '@/schemas/modalSchema';
import { createTodoSchema } from '@/schemas/modalSchema';
import useKabanaStore from '@/stores/store';

import Button from '../button';
import Tag from '../tag';
import colorList from './colorList';
const CreateTodo = () => {
  const defaultValues: CreateTodoType = {
    assigneeUserId: 0,
    dashboardId: 0,
    columnId: 0,
    title: '',
    description: '',
    dueDate: '',
    tags: [],
    imageUrl: '',
  };
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: defaultValues, resolver: zodResolver(createTodoSchema) });
  const modalIsOpen = useKabanaStore((state) => state.createTodo);
  const toggleModal = useKabanaStore((state) => state.toggleCreateTodo);
  const [tagList, setTagList] = useState<string[]>([]);
  const [addedColors, setAddedColors] = useState<string[]>([]);

  const createRandomNumber = () => {
    const result = Math.floor(Math.random() * colorList.length);
    return result;
  };

  const createDeleteTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const randomNum = createRandomNumber();
      if (tagList.includes(e.currentTarget.value)) {
        e.currentTarget.value = '';
        return;
      }
      if (addedColors.indexOf(colorList[randomNum]) === -1) {
        setAddedColors([...addedColors, colorList[randomNum]]);
      }

      const trimedWord = e.currentTarget.value.trim();
      if (trimedWord !== '') {
        setTagList([...tagList, trimedWord]);
        e.currentTarget.value = '';
        e.currentTarget.focus();
      }
    }
    if (e.key === 'Backspace' && e.currentTarget.value !== null) {
      const copy = [...tagList];
      copy.pop();
      setTagList(copy);
    }
  };
  return (
    <Dialog.Root
      className='w-327 rounded-2xl px-16 py-24 tablet:w-584'
      modalIsOpen={modalIsOpen}
      toggleModal={() => {
        toggleModal();
      }}
    >
      <Dialog.Title className='text-2xl font-bold'>할일 생성</Dialog.Title>
      <Dialog.Content>
        <form
          className='flex flex-col'
          id='createTodo'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          onSubmit={handleSubmit((data) => {
            const collectedData = {
              ...data,
              assigneeUserId: 1,
              dashboardId: 1,
              columnId: 1,
              tags: tagList,
            };

            console.log(collectedData);
          })}
        >
          <input {...register('title')} className='border-1 border-black' placeholder='title' type='text' />
          <textarea {...register('description')} className='border-1 border-black' placeholder='설명을 입력해주세요' />
          <input {...register('dueDate')} className='border-1 border-black' name='date' type='date' />
          <div className='border-1 border-black'>
            <span>
              {tagList?.map((tag, idx) => {
                return (
                  <Tag key={tag} className={`mx-3 ${addedColors[idx]}`}>
                    {tag}
                  </Tag>
                );
              })}
            </span>
            <input className='focus:outline-0' name='tags' type='text' onKeyDown={createDeleteTags} />
          </div>
          <label className='mt-5 flex h-76 w-76 items-center justify-center rounded-[6px] bg-[#F5F5F5]' htmlFor='file'>
            <AddIcon />
          </label>
          <input {...register('imageUrl')} className='hidden' id='file' placeholder='imageUrl' type='file' />
        </form>
      </Dialog.Content>
      <Dialog.ButtonArea className='mt-32 flex justify-between'>
        <Button className='tablet:w-256' variant='outlined' onButtonClick={toggleModal}>
          취소
        </Button>
        <button form='createTodo' type='submit'>
          생성
        </button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default CreateTodo;

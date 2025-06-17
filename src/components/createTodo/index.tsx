import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import AddIcon from '@/assets/icons/AddIcon';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Tag from '@/components/tag';
import { type CreateTodoType } from '@/schemas/dashboard';
import { createTodoSchema } from '@/schemas/dashboard';

import colorList from './colorList';
import { type ModalType, type TagListType } from './types';

const CreateTodo = ({ modalIsOpen, toggleModal }: ModalType) => {
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
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateTodoType>({ defaultValues: defaultValues, resolver: zodResolver(createTodoSchema) });

  const [tagList, setTagList] = useState<TagListType[]>([]);

  const createRandomNumber = () => {
    const result = Math.floor(Math.random() * colorList.length);
    return result;
  };

  const createDeleteTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const randomNum = createRandomNumber();
      const tags = tagList.map((tag) => tag.label);
      const colors = tagList.map((color) => color.color);

      if (tags.includes(e.currentTarget.value)) {
        e.currentTarget.value = '';
        return;
      }

      const trimedWord = e.currentTarget.value.trim();
      if (trimedWord !== '') {
        const availableColors = colorList.filter((color) => !colors.includes(color));
        const selectedColor = availableColors[randomNum];
        setTagList([...tagList, { label: trimedWord, color: selectedColor }]);
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
  useEffect(() => {
    const tags = tagList.map((tag) => tag.label);
    setValue('tags', tags);
  }, [tagList]);

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
          onSubmit={handleSubmit(
            (data) => {
              const collectedData = {
                ...data,
                assigneeUserId: 1,
                dashboardId: 1,
                columnId: 1,
              };
            },
            (error) => console.error(error),
          )}
        >
          <input {...register('title')} className='border border-black' placeholder='title' type='text' />
          <textarea {...register('description')} className='border border-black' placeholder='설명을 입력해주세요' />
          <input {...register('dueDate')} className='border-1 border-black' type='date' />
          <div className='flex flex-nowrap items-center gap-2 border border-black p-2'>
            {tagList.map((tag, idx) => (
              <Tag key={tag.label ?? idx} className={`${tag.color ?? 'bg-gray-200'}`}>
                {tag.label ?? '빈값'}
              </Tag>
            ))}
            <input className='flex-1 focus:outline-0' name='tags' type='text' onKeyDown={createDeleteTags} />
          </div>
          <label className='mt-5 flex h-76 w-76 items-center justify-center rounded-md bg-[#F5F5F5]' htmlFor='file'>
            <AddIcon />
          </label>
          <input {...register('imageUrl')} className='hidden' id='file' placeholder='imageUrl' type='file' />
        </form>
      </Dialog.Content>
      <Dialog.ButtonArea className='mt-32 flex justify-between gap-8'>
        <Button className='w-1/2' variant='outlined' onClick={toggleModal}>
          취소
        </Button>
        <Button className='w-1/2' form='createTodo' type='submit'>
          생성
        </Button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default CreateTodo;

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';

import AddIcon from '@/assets/icons/AddIcon';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Input from '@/components/common/input';
import Tag from '@/components/tag';
import colorList from '@/constants/ui/colorList';
import type { CreateTodoType } from '@/schemas/card';
import { createTodoSchema } from '@/schemas/card';

import { type CreateTodoModalType, type TagListType } from './types';
const CreateTodo = ({ isModalOpen, toggleModal, dashboardId, columnId }: CreateTodoModalType) => {
  const submit = useSubmit();

  const defaultValues: CreateTodoType = {
    assigneeUserId: 0,
    dashboardId: dashboardId,
    columnId: columnId,
    title: '',
    description: '',
    dueDate: '',
    tags: [],
    imageUrl: new DataTransfer().files,
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
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

  const onSubmit = (data: CreateTodoType) => {
    const formData = new FormData();

    formData.append('assigneeUserId', String(data.assigneeUserId));
    formData.append('dashboardId', String(data.dashboardId));
    formData.append('columnId', String(data.columnId));
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('dueDate', data.dueDate);
    formData.append('tags', JSON.stringify(data.tags));

    if (data.imageUrl instanceof File) {
      formData.append('imageUrl', data.imageUrl);
    }
    submit(formData, {
      method: 'post',
      encType: 'multipart/form-data',
    });
  };

  useEffect(() => {
    const tags = tagList.map((tag) => tag.label);
    setValue('tags', tags);
  }, [tagList]);

  return (
    <Dialog.Root
      className='w-327 rounded-2xl px-16 py-24 tablet:w-584'
      isModalOpen={isModalOpen}
      toggleModal={() => {
        toggleModal();
      }}
    >
      <Dialog.Title className='text-2xl font-bold'>할일 생성</Dialog.Title>
      <Dialog.Close toggleModal={toggleModal} />
      <Dialog.Content className='mt-32'>
        <Form
          className='flex flex-col'
          encType='multipart/form-data'
          id='createTodo'
          method='post'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            console.log('onSubmit:', data);
          })}
        >
          <div>담당자 선택하는거랑 상태 넣어야함</div>
          <Input.Root className='my-10'>
            <Input.Label htmlFor='title'>
              제목<strong className='text-capybara'>*</strong>
            </Input.Label>
            <Input.Field id='title' {...register('title')} className='h-50' />
            <Input.ErrorMessage>{errors.title?.message}</Input.ErrorMessage>
          </Input.Root>

          <Input.Root className='mb-10'>
            <Input.Label htmlFor='description'>
              설명<strong className='text-capybara'>*</strong>
            </Input.Label>
            <Input.Field
              id='description'
              placeholder='설명을 입력해주세요'
              type='textarea'
              {...register('description')}
            />
            <Input.ErrorMessage>{errors.description?.message}</Input.ErrorMessage>
          </Input.Root>

          <Input.Root className='mb-10'>
            <Input.Label htmlFor='dueDate'>
              마감일<strong className='text-capybara'>*</strong>
            </Input.Label>
            <Input.Field id='dueDate' type='datetime-local' {...register('dueDate')} />
            <Input.ErrorMessage>{errors.dueDate?.message}</Input.ErrorMessage>
          </Input.Root>

          <Input.Root>
            <Input.Label htmlFor='tags'>
              태그<strong className='text-capybara'>*</strong>
            </Input.Label>
            <Input.Field id='tags' onKeyDown={createDeleteTags} />
            <Input.ErrorMessage>{errors.tags?.message}</Input.ErrorMessage>
          </Input.Root>
          <div>
            {tagList.map((tag, idx) => (
              <Tag key={tag.label ?? idx} className={`${tag.color ?? 'bg-gray-200'}`}>
                {tag.label ?? '빈값'}
              </Tag>
            ))}
          </div>
          <Input.Root>
            <Input.Label
              className='mt-5 flex h-76 w-76 items-center justify-center rounded-md bg-[#F5F5F5]'
              htmlFor='file'
            >
              <AddIcon />
            </Input.Label>
            <Input.Field className='hidden' id='file' />
          </Input.Root>
        </Form>
      </Dialog.Content>
      <Dialog.ButtonArea className='mt-32 flex justify-between gap-8'>
        <Button
          className='w-1/2'
          variant='outlined'
          onClick={() => {
            toggleModal();
            reset();
            setTagList([]);
          }}
        >
          취소
        </Button>
        <Button className='w-1/2' disabled={isSubmitting} form='createTodo' type='submit'>
          생성
        </Button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default CreateTodo;

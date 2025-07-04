import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useLoaderData, useSubmit } from 'react-router-dom';

import { uploadCardImage } from '@/apis/card';
import AddIcon from '@/assets/icons/AddIcon';
import TriangleIcon from '@/assets/icons/TriangleIcon';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import type { DropdownOption } from '@/components/common/dropdown/types';
import Input from '@/components/common/input';
import Tag from '@/components/tag';
import type { DashboardDetailLoaderData } from '@/loaders/dashboard/types';
import type { CreateTodoType } from '@/schemas/card';
import { createTodoSchema } from '@/schemas/card';
import type { Column } from '@/schemas/column';

import Dropdown from '../common/dropdown';
import type { EditTodoType } from './types';
const EditTodo = ({ isModalOpen, toggleModal, dashboardId, columnId, data, cardId }: EditTodoType) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(data.imageUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tagList, setTagList] = useState<string[]>(data.tags);
  const [selectedAsignee, setSelectedAsignee] = useState<DropdownOption | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<DropdownOption | null>(null);
  const submit = useSubmit();
  const loader = useLoaderData() as DashboardDetailLoaderData;
  const memberList = loader.memberList.members;

  const columnOptions: DropdownOption[] = loader.columns.data.map((column: Column) => ({
    label: column.title,
    value: column.id,
    withCheck: true,
  }));

  const memberOptions: DropdownOption[] = memberList.map((member) => ({
    label: member.nickname,
    value: member.userId,
    withCheck: true,
  }));
  const result = columnOptions.find((column) => column.value === data.columnId);
  const dropDownContainer = useRef<HTMLDivElement>(null);
  const dropDownContainer2 = useRef<HTMLDivElement>(null);
  const defaultValues: CreateTodoType = {
    assigneeUserId: data.assignee.id,
    dashboardId: dashboardId,
    columnId: columnId,
    title: data.title,
    description: data.description,
    dueDate: data.dueDate,
    tags: data.tags,
    imageUrl: data.imageUrl,
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTodoType>({ defaultValues: defaultValues, resolver: zodResolver(createTodoSchema) });

  const createDeleteTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (tagList.includes(e.currentTarget.value)) {
        e.currentTarget.value = '';
        return;
      }

      const trimedWord = e.currentTarget.value.trim();
      if (trimedWord !== '') {
        setTagList((prev) => [...prev, trimedWord]);
        e.currentTarget.value = '';
        e.currentTarget.focus();
      }
    }

    if (e.key === 'Backspace' && e.currentTarget.value === '') {
      const copy = [...tagList];
      copy.pop();
      setTagList(copy);
    }
  };

  const onSubmit = async (data: CreateTodoType) => {
    if (selectedFile) {
      const imageFormData = new FormData();
      imageFormData.append('image', selectedFile);
      try {
        const uploadImage = await uploadCardImage(columnId, imageFormData);
        setValue('imageUrl', uploadImage.imageUrl);
      } catch (error) {
        console.error('🩺이미지 업로드 실패:', error);
      }
    }
    const formData = new FormData();
    formData.append('intent', 'editTodo');
    formData.append('cardId', String(cardId));
    formData.append('assigneeUserId', String(data.assigneeUserId));
    formData.append('columnId', String(data.columnId));
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('dueDate', data.dueDate);
    formData.append('tags', JSON.stringify(data.tags));
    if (data.imageUrl) {
      formData.append('imageUrl', data.imageUrl);
    }

    submit(formData, {
      method: 'put',
      encType: 'multipart/form-data',
    });
    toggleModal();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setSelectedFile(file);
  };

  const handleAsigneeSelect = async (value: string | number) => {
    const selected = memberOptions?.find((option) => option.value === value);
    if (selected) {
      setSelectedAsignee(selected);
      setValue('assigneeUserId', Number(value));
    }
  };
  const handleColumnSelect = async (value: string | number) => {
    const selected = columnOptions.find((option) => option.value === value);
    if (selected) {
      setSelectedColumn(selected);
      setValue('columnId', Number(value));
    }
  };

  useEffect(() => {
    const tags = tagList.map((tag) => tag);
    setValue('tags', tags);
  }, [tagList]);

  return (
    <Dialog.Root
      className='w-327 content-between rounded-2xl px-16 py-24 tablet:w-584'
      isModalOpen={isModalOpen}
      toggleModal={() => {
        toggleModal();
        reset();
      }}
    >
      <Dialog.Title className='text-2xl font-bold'>할일 수정</Dialog.Title>
      <Dialog.Close resetContent={reset} toggleModal={toggleModal} />
      <Dialog.Content className='mt-32'>
        {/* 상태 */}
        <div className='mb-10 grid grid-cols-2 gap-5'>
          <div className='flex flex-col gap-2'>
            <label>상태</label>
            <Dropdown
              align='start'
              contentClassName='tablet:w-273'
              optionAlign='start'
              optionClassName='h-40'
              options={columnOptions}
              selectedValue={selectedColumn?.value}
              trigger={
                <>
                  <div>{selectedColumn ? selectedColumn.label : result?.label}</div>
                  <TriangleIcon aria-label='더보기 옵션' size={12} />
                </>
              }
              triggerAs='div'
              triggerClassName='flex basis-1/2 shrink-0 items-center justify-between rounded border border-gray-300 px-16 py-11 hover:bg-gray-100'
              onSelect={handleColumnSelect}
            />
          </div>
          {/* 담당자 */}
          <div className='flex flex-col gap-2'>
            <label>담당자</label>
            <Dropdown
              align='end'
              contentClassName='tablet:w-273'
              optionAlign='start'
              optionClassName='h-40'
              options={memberOptions}
              selectedValue={selectedAsignee?.value}
              trigger={
                <>
                  <div>{selectedAsignee ? selectedAsignee.label : data.assignee.nickname}</div>
                  <TriangleIcon aria-label='더보기 옵션' size={12} />
                </>
              }
              triggerAs='div'
              triggerClassName='flex basis-1/2 shrink-0 items-center justify-between rounded border border-gray-300 px-16 py-11 hover:bg-gray-100'
              onSelect={handleAsigneeSelect}
            />
          </div>
        </div>

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
          })}
        >
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
              <Tag key={tag ?? idx}>{tag ?? '빈값'}</Tag>
            ))}
          </div>
        </Form>
        <Input.Root>
          <Input.Label htmlFor='image'>이미지</Input.Label>
        </Input.Root>
        <Input.Root>
          <Input.Label
            className='mt-5 flex h-76 w-76 cursor-pointer items-center justify-center rounded-md bg-[#F5F5F5]'
            htmlFor='file'
          >
            {previewUrl ? (
              <img
                alt='프로필 이미지 미리보기'
                className='h-full w-full rounded-md object-cover'
                src={previewUrl || undefined}
              />
            ) : (
              <AddIcon className='tablet:size-18' size={12} />
            )}
          </Input.Label>
          <Input.Field className='hidden' id='file' type='file' onChange={handleFileChange} />
        </Input.Root>
      </Dialog.Content>
      <Dialog.ButtonArea className='mt-32 flex justify-between gap-8'>
        <Button
          className='w-1/2'
          variant='outlined'
          onClick={() => {
            toggleModal();
          }}
        >
          취소
        </Button>
        <Button className='w-1/2' disabled={isSubmitting} form='createTodo' type='submit'>
          수정
        </Button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default EditTodo;

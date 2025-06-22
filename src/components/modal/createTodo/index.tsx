import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useLoaderData, useSubmit } from 'react-router-dom';

import { uploadCardImage } from '@/apis/card';
import AddIcon from '@/assets/icons/AddIcon';
import TriangleIcon from '@/assets/icons/TriangleIcon';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Dropdown from '@/components/common/dropdown';
import type { DropdownOption } from '@/components/common/dropdown/types';
import Input from '@/components/common/input';
import Tag from '@/components/tag';
import colorList from '@/constants/ui/colorList';
import { useToast } from '@/hooks/useToast';
import type { DashboardDetailLoaderData } from '@/loaders/dashboard/types';
import type { CreateTodoType } from '@/schemas/card';
import { createTodoSchema } from '@/schemas/card';

import { type CreateTodoModalType, type TagListType } from './types';
const CreateTodo = ({ isModalOpen, toggleModal, dashboardId, columnId }: CreateTodoModalType) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tagList, setTagList] = useState<TagListType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
  const submit = useSubmit();
  const loader = useLoaderData() as DashboardDetailLoaderData;
  const memberList = loader.memberList.members;
  const statusOptions: DropdownOption[] = memberList.map((member) => ({
    label: member.nickname,
    value: member.userId,
    withCheck: true,
  }));

  const dropDownContainer = useRef<HTMLDivElement>(null);
  const defaultValues: CreateTodoType = {
    assigneeUserId: 0,
    dashboardId: dashboardId,
    columnId: columnId,
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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTodoType>({ defaultValues: defaultValues, resolver: zodResolver(createTodoSchema) });

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

  const onSubmit = async (data: CreateTodoType) => {
    const formData = new FormData();
    if (selectedFile) {
      const imageFormData = new FormData();
      imageFormData.append('image', selectedFile);
      try {
        const uploadImage = await uploadCardImage(columnId, imageFormData);
        formData.append('imageUrl', uploadImage.imageUrl);
      } catch (error) {
        console.error('🩺이미지 업로드 실패:', error);
      }
    }

    formData.append('intent', 'createTodo');
    formData.append('assigneeUserId', String(data.assigneeUserId));
    formData.append('dashboardId', String(data.dashboardId));
    formData.append('columnId', String(data.columnId));
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('dueDate', data.dueDate);
    formData.append('tags', JSON.stringify(data.tags));

    submit(formData, {
      method: 'post',
      encType: 'multipart/form-data',
    });
    toggleModal();
    reset();
    setTagList([]);
  };

  const { showError } = useToast();
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      showError('지원하지 않는 파일 형식입니다. (jpg, jpeg, png, webp만 가능)');
      return;
    }

    if (file.size > maxSize) {
      showError('파일 용량은 5MB 이하로 업로드해주세요.');
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const handleOptionSelect = async (value: string | number) => {
    const selected = statusOptions.find((option) => option.value === value);
    if (selected) {
      setSelectedStatus(selected);
      setValue('assigneeUserId', Number(value));
    }
  };
  useEffect(() => {
    const tags = tagList.map((tag) => tag.label);
    setValue('tags', tags);
  }, [tagList]);

  return (
    <Dialog.Root
      className='w-327 content-between rounded-2xl px-16 py-24 tablet:w-584'
      isModalOpen={isModalOpen}
      toggleModal={() => {
        toggleModal();
        reset();
        setTagList([]);
        setPreviewUrl(null);
      }}
    >
      <Dialog.Title className='text-2xl font-bold'>할일 생성</Dialog.Title>
      <Dialog.Close resetContent={reset} toggleModal={toggleModal} />
      <Dialog.Content className='mt-32'>
        <Dropdown
          contentClassName='w-295 tablet:w-552 '
          optionAlign='start'
          optionClassName=' h-40'
          options={statusOptions}
          positionRef={dropDownContainer}
          selectedValue={selectedStatus?.value}
          trigger={
            <>
              <div>{selectedStatus ? selectedStatus.label : '담당자를 선택해주세요'}</div>
              <TriangleIcon aria-label='더보기 옵션' size={12} />
            </>
          }
          triggerAs='div'
          triggerClassName='flex w-full items-center justify-between rounded border border-gray-300 px-16 py-11 hover:bg-gray-100'
          onSelect={handleOptionSelect}
        />
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
          <div className='mt-10 flex gap-2'>
            {tagList.map((tag, idx) => (
              <Tag key={tag.label ?? idx} className={`${tag.color ?? 'bg-gray-200'}`}>
                {tag.label ?? '빈값'}
              </Tag>
            ))}
          </div>
        </Form>
        <Input.Root>
          <Input.Label htmlFor='image'>
            이미지<strong className='text-capybara'>*</strong>
          </Input.Label>
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
            reset();
            setTagList([]);
            setPreviewUrl(null);
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

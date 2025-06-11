// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import AddIcon from '@/assets/icons/AddIcon';
import Dialog from '@/components/dialog';
import useKabanaStore from '@/stores/store';

import Tag from '../tag';
import colorList from './colorList';

const CreateTodo = () => {
  const { register, handleSubmit } = useForm();
  const modalIsOpen = useKabanaStore((state) => state.createTodo);
  const toggleModal = useKabanaStore((state) => state.toggleCreateTodo);
  const [tagList, setTagList] = useState<string[]>([]);
  const [addedColors, setAddedColors] = useState<string[]>([]);
  const tagRef = useRef<HTMLInputElement>(null);

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
        <form className='flex flex-col' id='createTodo'>
          <input {...register('title')} className='border-1 border-black' placeholder='title' type='text' />
          <input {...register('desc')} className='border-1 border-black' placeholder='desc' type='text' />
          <input {...register('dueDate')} className='border-1 border-black' placeholder='date' type='date' />
          <div className='border-1 border-black'>
            <span>
              {tagList?.map((tag, idx) => {
                return (
                  <Tag key={tag} className={`mx-3 px-10 py-2 text-[14px] ${addedColors[idx]}`}>
                    {tag}
                  </Tag>
                );
              })}
            </span>
            <input ref={tagRef} className='focus:outline-0' name='tags' type='text' onKeyDown={createDeleteTags} />
          </div>
          <label className='flex h-76 w-76 items-center justify-center rounded-[6px] bg-[#F5F5F5]' htmlFor='file'>
            <AddIcon />
          </label>
          <input {...register('imageFile')} className='hidden' id='file' placeholder='' type='file' />
        </form>
      </Dialog.Content>
      <Dialog.ButtonArea className='flex justify-between'>
        <button>취소</button>
        <button form='createTodo' type='submit'>
          생성
        </button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default CreateTodo;

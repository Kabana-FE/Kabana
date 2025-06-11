// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';

import Dialog from '@/components/dialog';
import useKabanaStore from '@/stores/store';

import Tag from '../tag';
import colorList from './colorList';
const CreateTodo = () => {
  const createTodo = useKabanaStore((state) => state.createTodo);
  const toggleCreateTodo = useKabanaStore((state) => state.toggleCreateTodo);
  const [tagList, setTagList] = useState<string[]>([]);
  const [addedColors, setAddedColors] = useState<string[]>([]);
  const tagRef = useRef<HTMLInputElement>(null);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(createTodoSchema),
  // });
  const createRandomNumber = () => {
    const result = Math.floor(Math.random() * colorList.length);
    return result;
  };

  const createDeleteTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const randomNum = createRandomNumber();
      if (tagList.includes(e.currentTarget.value)) {
        e.currentTarget.value = '';
      }

      if (addedColors.indexOf(colorList[randomNum]) === -1) {
        setAddedColors([...addedColors, colorList[randomNum]]);
      }
      setTagList([...tagList, e.currentTarget.value]);
      e.currentTarget.value = '';
      e.currentTarget.focus();
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
      setToggleModal={() => {
        toggleCreateTodo();
      }}
      toggleModal={createTodo}
    >
      <Dialog.Title className='text-2xl font-bold'>할일 생성</Dialog.Title>
      <Dialog.Content>
        <form className='align flex flex-col'>
          <input className='border-1 border-black' name='title' placeholder='title' type='text' />
          <input className='border-1 border-black' name='description' placeholder='desc' type='text' />
          <input className='border-1 border-black' name='dueDate' placeholder='date' type='date' />
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
          <input type='file' />
        </form>
        <button className='border-1 border-black' type='submit'>
          폼 제출
        </button>
      </Dialog.Content>
      <Dialog.ButtonArea className='flex justify-between'>
        <button onClick={() => toggleCreateTodo()}>취소</button>
        <button>생성</button>
      </Dialog.ButtonArea>
    </Dialog.Root>
  );
};

export default CreateTodo;

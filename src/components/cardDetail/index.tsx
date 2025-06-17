import Badge from '@/components/badge';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import Tag from '@/components/tag';

import Comment from './Comment';
import type { DetailType } from './types';

const Detail = ({ title, description, tagList, column, assignee, dueDate, modalIsOpen, toggleModal }: DetailType) => {
  const tagList1: string[] = ['tag1', 'tag2', 'tagtag3', 'tag2'];
  return (
    <Dialog.Root
      className='w-327 rounded-lg p-16 tablet:w-678 tablet:px-32 tablet:py-24 pc:w-730'
      modalIsOpen={modalIsOpen}
      toggleModal={toggleModal}
    >
      <Dialog.Title className='tablet:11/12 w-7/8 text-[20px] font-bold tablet:text-2xl'>
        <div className='justify flex max-w-full items-center justify-between text-gray-700'>
          <h1>타이틀</h1>
          <span>...</span>
        </div>
      </Dialog.Title>
      <Dialog.Close toggleModal={toggleModal} />
      <Dialog.Content className='mt-10 flex grow-0 flex-col-reverse justify-between tablet:mt-24 tablet:flex-row tablet:gap-13'>
        <section className='tablet:w-420 pc:w-445'>
          <div className='mt-16 flex tablet:mt-0'>
            <div className='border-r-1 border-r-gray-300 pr-12 tablet:pr-20'>
              <Badge>In Progresssss</Badge>
            </div>
            <div className='ml-12 flex h-fit flex-wrap items-center gap-8 tablet:ml-20'>
              {tagList1.map((tag) => {
                return (
                  <Tag key={tag} className='bg-amber-100'>
                    {tag}
                  </Tag>
                );
              })}
            </div>
          </div>
          <div>
            <p className='mt-16 mb-32 text-xs/18 tablet:text-[14px]/24'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante
              cursus eget. Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit at
              leo.
            </p>
          </div>
          <img alt='사용자가 추가한 이미지입니다.' className='h-168 rounded-[6px] bg-gray-500 tablet:h-246 pc:h-260' />
          <div className='relative mt-16'>
            <form>
              <label>
                댓글
                <textarea className='h-70 w-full border border-gray-300' />
              </label>
              <Button className='absolute right-12 bottom-12 h-32 text-xs' type='submit' variant='outlined'>
                입력
              </Button>
            </form>
          </div>
          <Comment />
        </section>
        <section className='box-border flex justify-between rounded-lg border-1 border-gray-300 px-16 py-9 tablet:h-155 tablet:w-181 tablet:flex-col tablet:gap-16 tablet:px-16 tablet:py-14.5 pc:w-200'>
          <div className='flex w-1/2 flex-none flex-col gap-8 tablet:w-full'>
            <h2 className='text-xs/20 font-semibold'>담당자</h2>
            <div className='text-xs/20 tablet:text-md/24'>
              <span>아이콘</span> 배유철
            </div>
          </div>
          <div className='flex w-1/2 flex-col gap-8 tablet:w-full'>
            <h2 className='text-xs/20 font-semibold'>마감일</h2>
            <div className='text-xs tablet:text-md'>날짜</div>
          </div>
        </section>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Detail;

import AddBoxIcon from '@/assets/icons/AddBoxIcon';
import ChevronIcon from '@/assets/icons/ChevronIcon';
import DotIcon from '@/assets/icons/DotIcon';
import Button from '@/components/button';
import Pagination from '@/components/pagination';

const DashboardEdit = () => {
  // 임시 설정
  const profileImageUrl = '';
  return (
    <div className='flex min-h-screen flex-col gap-6 bg-gray-100 px-12 py-16'>
      <nav className='flex items-center gap-8'>
        <Button size='none' variant='none'>
          <ChevronIcon className='tablet:size-20' direction='left' size={18} />
        </Button>
        <span className='text-md tablet:text-lg'>돌아가기</span>
      </nav>
      <div className='flex flex-col gap-24'>
        <div className='flex flex-col gap-16'>
          <section className='flex h-312 max-w-620 flex-col gap-32 rounded-lg bg-white px-16 py-20 tablet:h-344 tablet:gap-40 tablet:px-28 tablet:py-32'>
            <div className='flex flex-col gap-24'>
              <header>
                <h2 className='text-xl font-bold tablet:text-2xl'>비브리지</h2>
              </header>
              <div className='flex flex-col gap-16'>
                {/* input 컴포넌트로 수정 예정 */}
                <label className='flex flex-col gap-8 text-lg tablet:text-2lg'>
                  대시보드 이름
                  <input
                    className='rounded-lg border border-gray-300 p-12 text-md text-gray-400'
                    placeholder='뉴프로젝트'
                    type='text'
                  />
                </label>
                {/* 버튼, 반복으로 수정 예정 */}
                <div className='flex gap-8'>
                  <DotIcon color='var(--color-green)' size={30} />
                  <DotIcon color='var(--color-purple)' size={30} />
                  <DotIcon color='var(--color-orange)' size={30} />
                  <DotIcon color='var(--color-blue)' size={30} />
                  <DotIcon color='var(--color-pink)' size={30} />
                </div>
              </div>
            </div>
            <Button className='rounded-lg' size='lg' type='submit' variant='filled'>
              변경
            </Button>
          </section>
          <section className='flex h-337 max-w-620 flex-col rounded-lg bg-white tablet:h-404'>
            <div className='flex items-center justify-between p-20 tablet:p-28'>
              <header className='flex-1'>
                <h2 className='text-xl font-bold tablet:text-2xl'>구성원</h2>
              </header>
              <span className='pr-12 text-xs tablet:pr-16 tablet:text-md'>1 페이지 중 1</span>
              {/* props 필수라 임의 값 지정 */}
              <Pagination currentPage={1} totalPages={5} onPageChange={() => 'hi'} />
            </div>
            <div className='px-20 text-md text-gray-400 tablet:px-28 tablet:text-lg'>이름</div>
            <ul>
              <li className='flex items-center justify-between px-20 py-12 tablet:px-28 tablet:py-16'>
                <div className='flex items-center justify-between gap-8'>
                  {profileImageUrl ? (
                    <img alt='profile' className='size-34' src={profileImageUrl} />
                  ) : (
                    <DotIcon className='tablet:size-38' size={34} />
                  )}
                  <span className='text-md tablet:text-lg'>nickname</span>
                </div>
                <Button className='w-52 p-0 tablet:w-84 tablet:text-md' size='sm' variant='outlined'>
                  삭제
                </Button>
              </li>
              <div className='border-b border-gray-200' />
            </ul>
          </section>
          <section className='h-406 max-w-620 rounded-lg bg-white tablet:h-477'>
            <div className='flex items-center justify-between p-20 tablet:p-28'>
              <header className='flex-1'>
                <h2 className='text-xl font-bold tablet:text-2xl'>초대내역</h2>
              </header>
              <span className='pr-12 text-xs tablet:pr-16 tablet:text-md'>1 페이지 중 1</span>
              {/* props 필수라 임의 값 지정 */}
              <Pagination currentPage={1} totalPages={5} onPageChange={() => 'hi'} />
            </div>
            <div className='flex justify-between px-20 pb-10 tablet:px-28'>
              <div className='text-gray-400'>이메일</div>
              <Button
                className='flex h-26 w-86 gap-10 p-0 tablet:h-32 tablet:w-105 tablet:text-md'
                size='sm'
                variant='filled'
              >
                <AddBoxIcon className='tablet:size-16' color='var(--color-white)' size={10} />
                초대하기
              </Button>
            </div>
            <ul>
              <li className='flex items-center justify-between px-20 py-12 tablet:px-28 tablet:py-16'>
                <div className='text-md tablet:text-lg'>jihyun@naver.com</div>
                <Button className='w-52 p-0 tablet:w-84 tablet:text-md' size='sm' variant='outlined'>
                  취소
                </Button>
              </li>
              <div className='border-b border-gray-200' />
            </ul>
          </section>
        </div>
        <Button className='max-w-320 rounded-lg text-gray-700 tablet:h-62' size='lg' variant='outlined'>
          대시보드 삭제하기
        </Button>
      </div>
    </div>
  );
};

export default DashboardEdit;

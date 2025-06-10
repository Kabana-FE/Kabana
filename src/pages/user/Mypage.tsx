import AddIcon from '@/assets/icons/AddIcon';
import ChevronIcon from '@/assets/icons/ChevronIcon';

const MyPage = () => {
  return (
    <div className='flex min-h-screen flex-col gap-6 bg-gray-100 px-12 py-16 tablet:gap-18 tablet:px-16'>
      <nav className='flex items-center gap-8'>
        <ChevronIcon direction='left' size={18} />
        <span>돌아가기</span>
      </nav>
      <div className='flex flex-col gap-16 tablet:gap-24'>
        <section className='flex h-496 max-w-672 flex-col gap-40 rounded-lg bg-white p-16 tablet:h-366 tablet:gap-24 tablet:p-24'>
          <header>
            <h2 className='text-2lg font-bold tablet:text-2xl'>프로필</h2>
          </header>
          <div className='flex flex-col gap-40 tablet:flex-row tablet:gap-42'>
            {/* button 컴포넌트로 수정 예정 */}
            <button className='flex size-100 items-center justify-center rounded-md bg-[#f5f5f5] tablet:size-182'>
              <AddIcon size={12} />
            </button>
            <form className='flex flex-1 flex-col gap-24'>
              <div className='flex flex-col gap-16'>
                {/* input 컴포넌트로 수정 예정 */}
                <label className='flex flex-col gap-8 text-md tablet:text-lg'>
                  이메일
                  <input
                    className='rounded-lg border border-gray-300 p-11 text-lg text-gray-400'
                    placeholder='jhondoe@gmail.com'
                    type='text'
                  />
                </label>
                {/* input 컴포넌트로 수정 예정 */}
                <label className='flex flex-col gap-8 text-md tablet:text-lg'>
                  닉네임
                  <input
                    className='rounded-lg border border-gray-300 p-11 text-lg text-gray-400'
                    placeholder='jhondoe@gmail.com'
                    type='text'
                  />
                </label>
              </div>
              {/* button 컴포넌트로 수정 예정 */}
              <button className='rounded-lg bg-capybara py-14 text-lg text-white'>저장</button>
            </form>
          </div>
        </section>
        <section className='flex h-454 max-w-672 flex-col gap-40 rounded-lg bg-white p-16 tablet:h-466 tablet:gap-24 tablet:p-24'>
          <header>
            <h2 className='text-2lg font-bold tablet:text-2xl'>비밀번호 변경</h2>
          </header>
          <form className='flex flex-col gap-24'>
            <div className='flex flex-col gap-16'>
              {/* input 컴포넌트로 수정 예정 */}
              <label className='flex flex-col gap-8 text-md tablet:text-lg'>
                현재 비밀번호
                <input
                  className='rounded-lg border border-gray-300 p-11 text-lg text-gray-400'
                  placeholder='현재 비밀번호 입력'
                  type='password'
                />
              </label>
              {/* input 컴포넌트로 수정 예정 */}
              <label className='flex flex-col gap-8 text-md tablet:text-lg'>
                새 비밀번호
                <input
                  className='rounded-lg border border-gray-300 p-11 text-lg text-gray-400'
                  placeholder='새 비밀번호 입력'
                  type='password'
                />
              </label>
              {/* input 컴포넌트로 수정 예정 */}
              <label className='flex flex-col gap-8 text-md tablet:text-lg'>
                새 비밀번호 확인
                <input
                  className='rounded-lg border border-gray-300 p-11 text-lg text-gray-400'
                  placeholder='새 비밀번호 입력'
                  type='password'
                />
              </label>
            </div>
            {/* button 컴포넌트로 수정 예정 */}
            <button className='rounded-lg bg-capybara py-14 text-lg text-white'>변경</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default MyPage;

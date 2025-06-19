import landing from '@/assets/images/landing_image.webp';
import Button from '@/components/common/button';
const Landing = () => {
  return (
    <div className='bg-black p-16'>
      <div className='m-auto flex flex-col items-center justify-center'>
        <img alt='랜딩 이미지' className='w-287 pt-42 pb-12' src={landing} />
        <span className='text-[40px] font-bold text-white'>새로운 일정관리</span>
        <span className='text-[40px] font-bold text-capybara'>KABANA</span>
        <Button className='mt-100 mb-76 w-235' size='lg' type='button' variant='filled'>
          로그인하기
        </Button>
      </div>
      <div className='flex flex-col gap-60'>
        <section className='m-auto flex h-686 w-343 flex-col items-center rounded-lg bg-gray-black'>
          <span className='pt-60 text-gray-400'>Point1</span>
          <h2 className='pt-80 text-center text-[36px] font-bold text-white'>
            일의 우선순위를
            <br /> 관리하세요
          </h2>
          <span className='mt-114 h-300 w-full rounded-lg bg-white'>image</span>
        </section>
        <section className='m-auto flex h-686 w-343 flex-col items-center rounded-lg bg-gray-black'>
          <span className='pt-60 text-gray-400'>Point2</span>
          <h2 className='pt-80 text-center text-[36px] font-bold text-white'>
            해야 할 일을
            <br /> 등록하세요
          </h2>
          {/* 이미지로 수정 예정 */}
          <span className='mt-114 h-300 w-full rounded-lg bg-white'>image</span>
        </section>
      </div>

      <div className='m-auto flex w-343 flex-col justify-center gap-40'>
        <div className='pt-90 text-center text-2xl font-bold text-white'>생산성을 높이는 다양한 설정 ⚡️</div>
        <section className='w-343'>
          <div className='flex h-235 items-center justify-center rounded-t-lg bg-gray-600'>
            {/* 이미지로 수정 예정 */}
            <div className='h-100 w-260 rounded-lg bg-white'>image</div>
          </div>
          <div className='flex h-112 flex-col gap-16 rounded-b-lg bg-gray-black px-40 py-22 text-white'>
            <div className='text-2lg font-bold'>대시보드 설정</div>
            <div className='text-lg'>대시보드 사진과 이름을 변경할 수 있어요.</div>
          </div>
        </section>
        <section className='w-343'>
          <div className='flex h-235 items-center justify-center rounded-t-lg bg-gray-600'>
            {/* 이미지로 수정 예정 */}
            <div className='h-100 w-260 rounded-lg bg-white'>image</div>
          </div>
          <div className='flex h-112 flex-col gap-16 rounded-b-lg bg-gray-black px-40 py-22 text-white'>
            <div className='text-2lg font-bold'>초대</div>
            <div className='text-lg'>새로운 팀원을 초대할 수 있어요.</div>
          </div>
        </section>
        <section className='w-343'>
          <div className='flex h-235 items-center justify-center rounded-t-lg bg-gray-600'>
            {/* 이미지로 수정 예정 */}
            <div className='h-100 w-260 rounded-lg bg-white'>image</div>
          </div>
          <div className='flex h-112 flex-col gap-16 rounded-b-lg bg-gray-black px-40 py-22 text-white'>
            <div className='text-2lg font-bold'>구성원</div>
            <div className='text-lg'>구성원을 초대하고 내보낼 수 있어요.</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;

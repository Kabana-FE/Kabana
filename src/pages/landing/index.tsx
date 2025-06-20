import landingImg from '@/assets/images/landing_image.webp';
import Landing1 from '@/assets/images/Landing1.png';
import Landing2 from '@/assets/images/Landing2.png';
import Landing3 from '@/assets/images/Landing3.png';
import Landing4 from '@/assets/images/Landing4.png';
import Landing5 from '@/assets/images/Landing5.png';
import Button from '@/components/common/button';

const Landing = () => {
  return (
    <div className='text-white'>
      <div className='flex flex-col items-center justify-center pt-42 pb-76 tablet:pt-94 tablet:pb-180'>
        <img alt='랜딩이미지' className='m-auto w-287 tablet:w-537 pc:w-722' src={landingImg} />
        <div className='flex flex-col items-center justify-center gap-6 pt-26 pb-101 tablet:flex-row tablet:gap-24 tablet:pt-48 tablet:pb-109 pc:pb-111'>
          <div className='text-[40px] font-bold tablet:text-[56px] pc:text-[76px]'>새로운 일정 관리</div>
          <div className='text-[42px] font-bold text-capybara tablet:text-[70px] pc:text-[90px]'>Kabana</div>
        </div>
        <Button className='w-235 text-md tablet:w-280 tablet:text-2lg' type='button' variant='filled'>
          로그인하기
        </Button>
      </div>
      <div className='m-auto flex w-343 flex-col gap-59 pb-90 tablet:w-664 tablet:gap-90 pc:w-1200'>
        <div className='flex h-686 flex-col justify-between rounded-lg bg-gray-black tablet:h-972 pc:h-600 pc:flex-row'>
          <div className='flex flex-col gap-60 text-center tablet:gap-100 tablet:pl-60 tablet:text-left'>
            <div className='pt-60 text-2lg font-medium tablet:text-2xl pc:pt-120'>Point1</div>
            <div className='text-[36px] font-bold tablet:text-[48px]'>
              일의 우선순위를
              <br /> 관리하세요
            </div>
          </div>
          <img alt='랜딩1' className='w-296 self-end tablet:w-519 pc:w-594' src={Landing1} />
        </div>
        <div className='flex h-686 flex-col justify-between rounded-lg bg-gray-black tablet:h-972 tablet:pl-60 pc:h-600 pc:flex-row-reverse pc:justify-end pc:pl-108'>
          <div className='flex flex-col gap-60 text-center tablet:gap-100 tablet:text-left'>
            <div className='pt-60 text-2lg font-medium tablet:text-2xl pc:pt-120'>Point2</div>
            <div className='text-[36px] font-bold tablet:text-[48px]'>
              해야 할 일을
              <br /> 등록하세요
            </div>
          </div>
          <img
            alt='랜딩2'
            className='w-218 self-center tablet:mr-60 tablet:w-360 pc:mr-100 pc:w-436 pc:self-end'
            src={Landing2}
          />
        </div>
      </div>
      <div className='flex flex-col gap-42 pb-120 tablet:pb-160'>
        <div className='text-center text-[22px] font-bold tablet:text-[28px] pc:text-start'>
          생산성을 높이는 다양한 설정 ⚡️
        </div>
        <div className='flex flex-col items-center justify-center gap-40 tablet:gap-48 pc:flex-row'>
          <div className='w-343 tablet:w-378'>
            <div className='flex h-236 items-center justify-center rounded-t-lg bg-gray-600 tablet:h-260'>
              <img alt='랜딩3' className='w-260 tablet:w-300' src={Landing3} />
            </div>
            <div className='flex h-112 flex-col justify-center gap-18 rounded-b-lg bg-gray-black pl-32 tablet:h-124'>
              <div className='text-2lg font-bold'>대시보드 설정</div>
              <div className='text-lg font-medium'>대시보드 사진과 이름을 변경할 수 있어요.</div>
            </div>
          </div>
          <div className='w-343 tablet:w-378'>
            <div className='flex h-236 items-center justify-center rounded-t-lg bg-gray-600 tablet:h-260'>
              <img alt='랜딩3' className='w-260 tablet:w-300' src={Landing4} />
            </div>
            <div className='flex h-112 flex-col justify-center gap-18 rounded-b-lg bg-gray-black pl-32 tablet:h-124'>
              <div className='text-2lg font-bold'>초대</div>
              <div className='text-lg font-medium'>새로운 팀원을 초대할 수 있어요.</div>
            </div>
          </div>
          <div className='w-343 tablet:w-378'>
            <div className='flex h-236 items-center justify-center rounded-t-lg bg-gray-600 tablet:h-260'>
              <img alt='랜딩3' className='w-260 tablet:w-300' src={Landing5} />
            </div>
            <div className='flex h-112 flex-col justify-center gap-18 rounded-b-lg bg-gray-black pl-32 tablet:h-124'>
              <div className='text-2lg font-bold'>구성원</div>
              <div className='text-lg font-medium'>구성원을 초대하고 내보낼 수 있어요.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

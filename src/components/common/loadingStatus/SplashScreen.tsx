import LogoImage from '@/assets/images/LogoImage';
import LogoTextImage from '@/assets/images/LogoTextImage';

const SplashScreen = () => {
  return (
    <div className='animate-fade-in flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center'>
      <div className='mb-6 animate-bounce drop-shadow-lg'>
        <LogoImage size={180} />
      </div>
      <div className='mb-8'>
        <LogoTextImage color='var(--color-capybara)' size={260} />
      </div>
      <h1 className='text-xl font-extrabold text-yellow-700'>당신의 일정에 카피바라 한 마리</h1>
    </div>
  );
};

export default SplashScreen;

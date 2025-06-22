import DotIcon from '@/assets/icons/DotIcon';

/**
 * @description 세 개의 점이 순차적으로 튀어 오르는 애니메이션을 보여주는 로딩 스피너입니다.
 * index.css에 정의된 @keyframes를 직접 사용합니다.
 */
const LoadingSpinner = () => {
  return (
    <div aria-label='로딩 중' className='flex items-center justify-center space-x-8' role='status'>
      <DotIcon
        className='[animation:bounce-delay_1.4s_infinite_ease-in-out]'
        color='var(--color-capybara)'
        size={16}
        style={{ animationDelay: '-0.32s' }}
      />
      <DotIcon
        className='[animation:bounce-delay_1.4s_infinite_ease-in-out]'
        color='var(--color-capybara)'
        size={16}
        style={{ animationDelay: '-0.16s' }}
      />
      <DotIcon className='[animation:bounce-delay_1.4s_infinite_ease-in-out]' color='var(--color-capybara)' size={16} />
    </div>
  );
};

export default LoadingSpinner;

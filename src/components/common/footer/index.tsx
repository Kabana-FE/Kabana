import GithubIcon from '@/assets/icons/GithubIcon';
import Button from '@/components/common/button';
/**
 * Footer 컴포넌트
 * @description
 * 사이트 하단에 고정되는 푸터 컴포넌트입니다.
 *
 * 주요 특징:
 * - 좌측에 `@Kabana - 2025` 저작권 문구를 출력합니다.
 * - 우측에 Kabana GitHub 저장소로 이동할 수 있는 GitHub 아이콘 버튼을 제공합니다.
 */
const Footer = () => {
  return (
    <footer className='flex items-center justify-between bg-black p-40 text-xs text-gray-400 tablet:text-lg pc:px-140'>
      <span>@Kabana - 2025</span>
      <Button
        aria-label='Kabana Github'
        as='a'
        href='https://github.com/Kabana-FE/Kabana'
        rel='noopener noreferrer'
        size='none'
        target='_blank'
        variant='none'
      >
        <GithubIcon className='bg-black tablet:size-22' size={18} />
      </Button>
    </footer>
  );
};

export default Footer;

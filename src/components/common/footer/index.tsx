import GithubIcon from '@/assets/icons/GithubIcon';

import Button from '../button';

const Footer = () => {
  return (
    <footer className='flex items-center justify-between bg-black p-40 text-xs text-gray-400 tablet:text-lg pc:px-140'>
      <span>@Kabana - 2025</span>
      <Button
        aria-label='Kabana Github'
        as='a'
        href='https://github.com/Kabana-FE/Kabana.git'
        size='none'
        variant='none'
      >
        <GithubIcon className='bg-black tablet:size-22' size={18} />
      </Button>
    </footer>
  );
};

export default Footer;

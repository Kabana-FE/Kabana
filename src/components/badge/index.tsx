import DotIcon from '@/assets/icons/DotIcon';

const Badge = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='flex w-fit items-center gap-6 rounded-full bg-[#FDF4D3] px-8 py-4 overflow-ellipsis whitespace-nowrap'>
      <DotIcon />
      <span className='text-xs text-[#764d4d]'>{children}</span>
    </div>
  );
};
export default Badge;

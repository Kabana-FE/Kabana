const SkeletonComment = () => {
  return (
    <div className='my-10 flex animate-pulse gap-8'>
      <div className='size-34 rounded-full bg-gray-300' />
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-8'>
          <div className='h-12 w-40 rounded-lg bg-gray-300' />
          <div className='h-12 w-100 rounded-lg bg-gray-300' />
        </div>
        <div className='h-12 w-200 rounded-lg bg-gray-300 tablet:h-24 tablet:w-350' />

        <div className='flex gap-8'>
          <div className='h-16 w-20 rounded-lg bg-gray-300' />

          <div className='h-16 w-20 rounded-lg bg-gray-300' />
        </div>
      </div>
    </div>
  );
};
export default SkeletonComment;

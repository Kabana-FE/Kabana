const CardSkeleton = () => {
  return (
    <div className='flex animate-pulse flex-col rounded-md border-1 border-gray-300 bg-white p-12 transition-colors duration-200 ease-in-out hover:border-capybara hover:bg-[#f9f5f5] active:bg-[#f1e8e8] tablet:flex-row tablet:justify-between tablet:px-14 tablet:py-20 pc:flex-col'>
      <div className='h-151 w-full rounded-md bg-gray-300 object-cover tablet:h-53 tablet:w-90 pc:h-160 pc:w-full' />
      <div className='flex flex-col justify-between tablet:ml-20 tablet:flex-1/2 tablet:flex-row pc:ml-0 pc:flex-col'>
        <div className='flex flex-col tablet:flex-1/6'>
          <div className='my-6 h-24 w-80 rounded-lg bg-gray-300' />
          <div className='flex gap-6'>
            <div className='h-24 w-50 rounded-lg bg-gray-300' />
            <div className='h-24 w-35 rounded-lg bg-gray-300' />
          </div>
        </div>
        <div className='flex items-baseline-last justify-between align-middle tablet:flex-1/2'>
          <div className='flex items-center'>
            <div className='h-18 w-140 rounded-lg bg-gray-300' />
          </div>
          <div className='size-38 rounded-full bg-gray-300' />
        </div>
      </div>
    </div>
  );
};
export default CardSkeleton;

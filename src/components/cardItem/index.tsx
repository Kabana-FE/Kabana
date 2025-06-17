import CalendarIcon from '@/assets/icons/CalendarIcon';

const CardItem = () => {
  return (
    <div className='rounded-md border-1 border-gray-300 bg-white p-12 tablet:px-14 tablet:py-20'>
      <img alt='카드에 대한 이미지입니다' className='h-151 w-260 rounded-md bg-gray-400' />
      <h2 className='font- font-medium'>title</h2>
      <div>tagList</div>
      <div className='flex'>
        <span>날짜</span>
        <CalendarIcon />
      </div>
    </div>
  );
};

export default CardItem;

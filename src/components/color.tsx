import AddIcon from '@/assets/icons/AddIcon';
import Button from '@/components/common/button';

const Color = () => {
  return (
    <div className='flex gap-10 py-8'>
      <Button className='size-30 rounded-full bg-green' size='none' variant='none'>
        <AddIcon color='var(--color-gray-100)' size={12} />
      </Button>
      <Button className='size-30 rounded-full bg-purple' size='none' variant='none'>
        <AddIcon color='var(--color-gray-100)' size={12} />
      </Button>
      <Button className='size-30 rounded-full bg-orange' size='none' variant='none'>
        <AddIcon color='var(--color-gray-100)' size={12} />
      </Button>
      <Button className='size-30 rounded-full bg-blue' size='none' variant='none'>
        <AddIcon color='var(--color-gray-100)' size={12} />
      </Button>
      <Button className='size-30 rounded-full bg-pink' size='none' variant='none'>
        <AddIcon color='var(--color-gray-100)' size={12} />
      </Button>
    </div>
  );
};

export default Color;

const PendingUI = () => {
  return (
    <div className='fixed inset-0 flex min-h-screen flex-col items-center justify-center bg-cream text-center'>
      <div className='relative h-100 w-100'>
        <div className='absolute inset-0 animate-spin rounded-full border-8 border-capybara border-t-transparent' />
        <div className='absolute inset-2 rounded-full bg-cream' />
        <p className='absolute inset-0 flex animate-pulse items-center justify-center text-lg font-bold text-capybara'>
          카피바라처럼 여유있게
        </p>
      </div>
    </div>
  );
};

export default PendingUI;

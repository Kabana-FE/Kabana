const Error = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-red-600'>Error</h1>
        <p className='mt-4 text-lg text-gray-700'>An unexpected error has occurred.</p>
        <p className='mt-2 text-sm text-gray-500'>Please try again later or contact support.</p>
      </div>
    </div>
  );
};

export default Error;

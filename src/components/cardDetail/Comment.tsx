const Comment = () => {
  return (
    <div className='flex gap-8'>
      <div className='h-26 w-26 rounded-full bg-amber-300 text-center' />
      <div className='flex flex-col'>
        <div className='flex items-center gap-8'>
          <h3 className='text-[12px] font-semibold text-gray-700 tablet:text-md/24'>name</h3>
          <span className='text-[10px] text-gray-400'>date</span>
        </div>
        <div className='text-[12px]/18 tablet:text-md/24'>댓글 코멘트 입니다</div>
        <div className='flex gap-8'>
          <span className='text-[10px] text-gray-400 underline tablet:text-[12px]'>수정</span>
          <span className='text-[10px] text-gray-400 underline tablet:text-[12px]'>삭제</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;

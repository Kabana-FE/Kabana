import { useState } from 'react';

import PagenationButton from '../buttons/pagenation';

const Pagenation = () => {
  const [currentPage, setCurrentPage] = useState(4);
  const totalPages = 5;

  const handelMovePage = (page: number) => {
    setCurrentPage(page);
    console.log(currentPage);
  };

  return (
    <>
      <PagenationButton
        direction='left'
        isDisabled={currentPage === 1}
        onButtonClick={() => handelMovePage(currentPage - 1)}
      />
      <PagenationButton
        direction='right'
        isDisabled={currentPage === totalPages}
        onButtonClick={() => handelMovePage(currentPage + 1)}
      />
    </>
  );
};

export default Pagenation;

import { useState } from 'react';

import CreateDashboard from '@/components/modal/CreateDashboard';

const Landing = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteAlert = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold'>Welcome to Kabana!</h1>
      <button onClick={toggleModal}>구성원 초대하기 모달</button>
      <CreateDashboard isModalOpen={isModalOpen} toggleModal={toggleModal} />
      {/* <DeleteAlert columnId={51081} isModalOpen={isDeleteModalOpen} toggleModal={toggleDeleteAlert} /> */}
    </div>
  );
};

export default Landing;

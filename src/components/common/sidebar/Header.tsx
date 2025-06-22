import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import AddBoxIcon from '@/assets/icons/AddBoxIcon';
import HorizontalLogo from '@/assets/images/HorizontalLogo';
import LogoImage from '@/assets/images/LogoImage';
import LogoTextImage from '@/assets/images/LogoTextImage';
import Button from '@/components/common/button';
import CreateDashboard from '@/components/modal/CreateDashboard';
import { ROUTES } from '@/constants/paths';
import { useKabanaStore } from '@/stores';

import type { SidebarHeaderProps } from './types';

const SidebarHeader = ({ showTooltip, hideTooltip }: SidebarHeaderProps) => {
  const { isSidebarOpen } = useKabanaStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const toggleCreateModal = () => setIsCreateModalOpen((prev) => !prev);

  const addDashboardButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Link className='flex h-60 items-center tablet:h-70' to={ROUTES.DASHBOARD_LIST}>
        {isSidebarOpen ? (
          <>
            <LogoImage className='tablet:hidden' size={40} />
            <LogoTextImage className='hidden tablet:block pc:hidden' size={120} />
            <HorizontalLogo className='hidden pc:block' size={200} />
          </>
        ) : (
          <LogoImage size={40} />
        )}
      </Link>

      <div
        className={`mt-10 mb-10 flex w-full shrink-0 cursor-pointer items-center justify-center gap-10 rounded-lg p-10 hover:bg-cream ${isSidebarOpen ? 'justify-center tablet:justify-start' : 'justify-center'} `}
        onClick={toggleCreateModal}
      >
        <Button
          ref={addDashboardButtonRef}
          aria-label='새로운 대시보드 생성'
          size='none'
          variant='none'
          onMouseEnter={() => {
            const target = addDashboardButtonRef.current?.parentElement;
            if (target) {
              showTooltip(target, '새로운 대시보드');
            }
          }}
          onMouseLeave={hideTooltip}
        >
          <AddBoxIcon size={22} />
        </Button>
        <span className={`hidden truncate font-semibold text-capybara ${isSidebarOpen ? 'tablet:inline' : ''}`}>
          NEW
        </span>
      </div>

      {isCreateModalOpen && <CreateDashboard isModalOpen={isCreateModalOpen} toggleModal={toggleCreateModal} />}
    </>
  );
};

export default SidebarHeader;

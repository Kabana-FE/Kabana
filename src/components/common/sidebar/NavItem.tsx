import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import CrownIcon from '@/assets/icons/CrownIcon';
import DotIcon from '@/assets/icons/DotIcon';
import { getDashboardDetailPath } from '@/constants/paths';

import type { SidebarNavItemProps } from './types';

const SidebarNavItem = forwardRef<HTMLLIElement, SidebarNavItemProps>(
  ({ dashboard, isSidebarOpen, onHover, onHoverOut, onTouchStart, onTouchEnd }, ref) => {
    const baseLinkClasses =
      'flex w-full items-center gap-4 rounded-lg p-3 text-lg text-gray-500 transition-colors hover:bg-cream p-10';
    const activeLinkClasses = 'bg-cream font-bold text-capybara';

    return (
      <li
        ref={ref}
        className='group relative w-full'
        onMouseEnter={(e) => onHover(e.currentTarget, dashboard.title)}
        onMouseLeave={onHoverOut}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
      >
        <NavLink
          className={({ isActive }) =>
            twMerge(
              baseLinkClasses,
              isActive && activeLinkClasses,
              'flex items-center justify-center gap-10',
              isSidebarOpen ? 'justify-center tablet:justify-start' : 'justify-center',
            )
          }
          to={getDashboardDetailPath(String(dashboard.id))}
        >
          <div className='relative'>
            {dashboard.createdByMe ? (
              <CrownIcon color={dashboard.color} size={20} />
            ) : (
              <DotIcon color={dashboard.color} size={10} />
            )}
          </div>
          <span className={twMerge('hidden truncate', isSidebarOpen && 'tablet:inline')}>{dashboard.title}</span>
        </NavLink>
      </li>
    );
  },
);

SidebarNavItem.displayName = 'SidebarNavItem';

export default SidebarNavItem;

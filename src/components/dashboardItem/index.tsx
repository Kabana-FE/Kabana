import { Link } from 'react-router-dom';

import ChevronIcon from '@/assets/icons/ChevronIcon';
import CrownIcon from '@/assets/icons/CrownIcon';
import DotIcon from '@/assets/icons/DotIcon';
import Button from '@/components/common/button';
import { getDashboardDetailPath } from '@/constants/paths';
import type { Dashboard } from '@/schemas/dashboard';

/**
 * 대시보드 목록에서 각 대시보드를 나타내는 항목 컴포넌트.
 * 클릭 시 해당 대시보드의 상세 페이지로 이동합니다.
 *
 * @param {string} color - 대시보드 점 색상
 * @param {boolean} createdByMe - 현재 로그인한 사용자가 생성한 대시보드인지 여부
 * @param {string} title - 대시보드의 제목
 * @param {number} id - 대시보드의 고유 ID
 */

const DashboardItem = ({
  color,
  createdByMe,
  title,
  id,
}: Pick<Dashboard, 'color' | 'createdByMe' | 'id' | 'title'>) => {
  const path = getDashboardDetailPath(String(id));
  return (
    <Button
      as={Link}
      className='h-58 w-full justify-between gap-12 rounded-lg px-20 text-md font-semibold text-gray-700 tablet:h-68 tablet:text-lg'
      size='none'
      to={path}
      variant='outlined'
    >
      <div className='flex items-center'>
        <DotIcon className='mr-12 pc:mr-16' color={color} size={8} />
        {title}
        {createdByMe && <CrownIcon className='ml-4 w-15 tablet:ml-6 tablet:w-18 pc:ml-8 pc:w-20' />}
      </div>
      <ChevronIcon />
    </Button>
  );
};
export default DashboardItem;

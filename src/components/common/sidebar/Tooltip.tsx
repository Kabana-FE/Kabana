import Tooltip from '@/components/common/tooltip';

import type { SidebarTooltipProps } from './types';

const SidebarTooltip = ({ isSidebarOpen, tooltipContent, tooltipTargetRect }: SidebarTooltipProps) => {
  if (!tooltipContent || !tooltipTargetRect) return null;

  return (
    <Tooltip className={isSidebarOpen ? 'block tablet:hidden' : 'hidden tablet:block'} targetRect={tooltipTargetRect}>
      {tooltipContent}
    </Tooltip>
  );
};

export default SidebarTooltip;

import type { SVGProps } from 'react';

export type IconDirection = 'right' | 'left' | 'top' | 'bottom';

export interface BaseIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export interface ColorIconProps extends BaseIconProps {
  color?: string;
}

export interface DirectionIconProps extends ColorIconProps {
  direction?: IconDirection;
}

export interface FillIconProps extends ColorIconProps {
  filled?: boolean;
}

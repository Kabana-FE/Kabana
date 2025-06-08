export interface PagenationButtonProps {
  direction: 'left' | 'right';
  isDisabled?: boolean;
  className?: string;
  onButtonClick?: () => void;
}

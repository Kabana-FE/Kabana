export default interface ButtonProps {
  variant?: 'filled' | 'outlined';
  type?: 'button' | 'submit' | 'reset';
  className: string;
  onButtonClick?: () => void;
  children: React.ReactNode;
}

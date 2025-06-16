import { twMerge } from 'tailwind-merge';

import type { FileUploadProps } from '@/components/input/types';

const FileUpload = ({ className, type, ref, ...props }: FileUploadProps) => {
  return <input ref={ref} className={twMerge('sr-only', className)} type={type} {...props} />;
};

export default FileUpload;

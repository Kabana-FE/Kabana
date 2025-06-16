import { twMerge } from 'tailwind-merge';

import type { FileUploadProps } from '@/components/common/input/types';

const FileUpload = ({ className, ref, ...props }: FileUploadProps) => {
  return <input ref={ref} className={twMerge('sr-only', className)} {...props} />;
};

export default FileUpload;

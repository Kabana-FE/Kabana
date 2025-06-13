import { twMerge } from 'tailwind-merge';

import type { FileUploadProps } from '@/components/input/types';

const FileUpload = ({ className, type, ...props }: FileUploadProps) => {
  return (
    <input
      className={twMerge(
        'block w-full text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200',
        className,
      )}
      type={type}
      {...props}
    />
  );
};

export default FileUpload;

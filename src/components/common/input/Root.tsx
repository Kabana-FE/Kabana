import { Children } from 'react';
import { twMerge } from 'tailwind-merge';

import ErrorMessage from './ErrorMessage';
import Field from './Field';
import Label from './Label';
import type { RootProps } from './types';

const Root = ({ children, className }: RootProps) => {
  const _children = Children.toArray(children) as React.ReactElement[];

  const [label, field, errorMessage] = [
    _children.find((child) => child.type === Label),
    _children.find((child) => child.type === Field),
    _children.find((child) => child.type === ErrorMessage),
  ];

  return (
    <div className={twMerge('flex flex-col gap-8', className)} role='group'>
      {label}
      {field}
      {errorMessage}
    </div>
  );
};

export default Root;

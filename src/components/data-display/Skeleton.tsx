import React from 'react';
import { classNames } from '../../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={classNames('skeleton', className)}
      {...props}
    />
  );
};

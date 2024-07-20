import React, { type FC, memo, type ReactNode } from 'react';

interface ShadowWrapperProps {
  children: ReactNode;
  isActive?: boolean;
}
const ShadowWrapper: FC<ShadowWrapperProps> = ({ children, isActive = true }) => {
  return <div className={isActive ? 'w-60 rounded shadow-md p-1' : ''}>{children}</div>;
};

export default memo(ShadowWrapper);

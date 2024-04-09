import React, { type FC, type ReactNode } from 'react';

interface IShadowContainerProps {
  children: ReactNode;
  isActive?: boolean;
}
const ShadowContainer: FC<IShadowContainerProps> = ({
  children,
  isActive = true,
}) => {
  return (
    <div className={isActive ? 'w-60 rounded shadow-md p-1' : ''}>
      {children}
    </div>
  );
};

export default ShadowContainer;

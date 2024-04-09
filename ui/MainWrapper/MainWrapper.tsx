import React, { type FC, type ReactNode } from 'react';

interface IMainWrapperProps {
  children: ReactNode;
}

const MainWrapper: FC<IMainWrapperProps> = ({ children }) => {
  return (
    <div className="m-auto w-[539px] mt-10 flex flex-col items-end">
      {children}
    </div>
  );
};

export default MainWrapper;

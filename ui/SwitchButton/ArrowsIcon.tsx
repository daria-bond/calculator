import React, { type FC } from 'react';

interface IArrowsIconProps {
  currentColor?: 'blue' | 'grey';
}

const ArrowsIcon: FC<IArrowsIconProps> = ({ currentColor = 'grey' }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 13.3333L4.16666 10L7.5 6.66668M12.5 6.66668L15.8333 10L12.5 13.3333"
        stroke={currentColor === 'grey' ? '#4D5562' : '#5D5FEF'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowsIcon;

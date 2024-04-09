import clsx from 'clsx';
import React, { type FC } from 'react';

interface IButtonProps {
  width?: 'full' | 'small' | 'medium';
  text: string;
  colorButton?: 'white' | 'blue';
  height?: 'small' | 'large';
  onClick?: () => void;
  disabled: boolean;
}

const Button: FC<IButtonProps> = ({
  width = 'small',
  text,
  colorButton = 'white',
  height = 'small',
  onClick,
  disabled,
}) => {
  const widthSizeVariants = {
    full: 'w-full',
    small: 'w-[52px]',
    medium: 'w-[72px]',
  };

  const heightSizeVariants = {
    small: 'h-12',
    large: 'h-16',
  };

  const colorVariants = {
    white:
      'border-[#E2E3E5] border-solid border hover:border-2 hover:border-[#5d5fef] text-gray-900',
    blue: 'bg-[#5D5FEF] text-white',
    blueDisabled: 'bg-[#797bf0] text-white',
    whiteDisabled: 'border-[#E2E3E5] border-solid border text-slate-500',
  };

  return (
    <button
      disabled={disabled}
      className={clsx(
        'rounded-md text-sm/[15px] font-medium text-center',
        `${widthSizeVariants[width]} 
         ${heightSizeVariants[height]} 
         ${colorVariants[disabled ? `${colorButton}Disabled` : colorButton]}
         ${onClick === undefined ? 'cursor-pointer' : ''}
         ${onClick !== undefined && disabled ? 'cursor-move' : ''}
         `,
      )}
      onClick={disabled ? undefined : onClick}
    >
      {text}
    </button>
  );
};

export default Button;

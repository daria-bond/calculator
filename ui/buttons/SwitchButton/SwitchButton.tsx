import React, { type FC } from 'react';
import ArrowsIcon from './ArrowsIcon';
import EyeIcon from './EyeIcon';

interface SwitchButtonProps {
  name: string;
  checked: boolean;
  setCheck: () => void;
}

const SwitchButton: FC<SwitchButtonProps> = ({ name, checked, setCheck }) => {
  return (
    <label
      htmlFor={name}
      className="inline-flex items-center cursor-pointer bg-gray-100 text-gray-800 w-[243px] h-[38px] rounded-md p-px "
    >
      <input
        id={name}
        name={name}
        type="checkbox"
        className="hidden peer"
        checked={checked}
        onChange={() => {
          setCheck();
        }}
      />
      <div className="font-medium text-sm/[15px] px-3 py-2 gap-2  bg-white border border-[#E2E3E5] rounded-[5px] peer-checked:bg-gray-100 peer-checked:border-0 flex items-center h-[36px]">
        <EyeIcon currentColor={checked ? 'grey' : 'blue'} />
        Runtime
      </div>
      <div className="font-medium text-sm/[15px] px-3 py-2 gap-2  bg-gray-100 peer-checked:bg-white peer-checked:border peer-checked:border-[#E2E3E5] peer-checked:rounded-[5px] flex items-center h-[36px]">
        <ArrowsIcon currentColor={checked ? 'blue' : 'grey'} />
        Constructor
      </div>
    </label>
  );
};

export default SwitchButton;

import React from 'react';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
}

const Button: React.FC<IProps> = ({ color, ...props }) => {
  return (
    <button {...props} style={{backgroundColor: `${props.disabled ? '#F5F5F5' : color}`}} className={` py-2 px-4 rounded-[8px]  cursor-pointer ${props.disabled? 'text-[#A4A7AE]' : 'text-white'} `}>
      {props.children}
    </button>
  );
};
export default Button;

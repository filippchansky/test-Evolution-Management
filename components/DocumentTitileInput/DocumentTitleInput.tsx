import React from 'react';

interface IProps {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}

const DocumentTitleInput: React.FC<IProps> = ({ disabled, onChange, value }) => {
  return (
    <input
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type='text'
      className='w-full text-2xl h-14 placeholder:text-2xl placeholder:h-full focus:outline-none'
      placeholder='Название'
    />
  );
};
export default DocumentTitleInput;

import Image from 'next/image';
import React from 'react'
import descIcon from '@/public/icons/text-input.png';

interface IProps {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}

const DocumentDescription:React.FC<IProps> = ({disabled, onChange, value}) => {

  return (
    <div className='flex flex-col gap-2'>
    <div className='flex items-center gap-2'>
      <Image src={descIcon} alt='Описание' />
      <p className='text-black text-[16px]'>Описание</p>
    </div>
    <textarea
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      className='focus:outline-none border rounded-[6px] p-1.5 text-[#414651] border-[rgba(65,70,81,0.2)] w-full'
    />
  </div>
  )
}
export default DocumentDescription;
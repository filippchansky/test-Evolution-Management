import Image from 'next/image';
import React from 'react';
import documentIcon from '@/public/icons/dataflow.png';

interface IProps {
  onClose: () => void;
  mode: 'view' | 'create';
}

const DocumentHeader: React.FC<IProps> = ({ onClose, mode }) => {
  return (
    <>
      <div className='flex justify-between items-center w-full h-14 px-3.5 border-b border-[rgba(0,0,0,0.2)]'>
        <div className='flex'>
          <div className='flex items-center pr-3.5 gap-2 border-r border-[#6F717C]'>
            <Image src={documentIcon} alt='' />
            <h2 className='text-[14px]'>Документы</h2>
          </div>
          <div className='px-3'>
            <p className='text-[14px] text-[#717680]'>
              {mode === 'view' ? `Просмотр документа` : 'Создание документа'}
            </p>
          </div>
        </div>
        <button onClick={onClose} className='cursor-pointer'>
          ✕
        </button>
      </div>
    </>
  );
};
export default DocumentHeader;

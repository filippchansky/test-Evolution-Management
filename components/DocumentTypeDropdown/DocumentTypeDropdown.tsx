'use client'
import { DocumentType } from '@/models';
import DocType from '@/UI/DocType';
import React, { useState } from 'react'

interface IProps {
  type: DocumentType;
  options: { id: number; label: string }[];
  disabled: boolean;
  onChange: (type: DocumentType) => void;
}

const DocumentTypeDropdown:React.FC<IProps> = ({disabled, onChange, options, type}) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onClick={() => setIsOpen(!isOpen)} className='w-full p-2 rounded-[6px] hover:bg-[#F5F5F5] cursor-pointer'>
      <div className='flex relative'>
        <DocType type={type} />
        {!disabled && (
          <ul
            className={`absolute w-48 top-10 p-1 border border-gray-200 rounded-[6px] bg-white ${
              isOpen ? 'visible' : 'invisible'
            }`}
          >
            {options.map((item) => (
              <li
                onClick={() => {
                  onChange(item.id as DocumentType);
                  setIsOpen(false);
                }}
                className='py-2 px-4 hover:bg-gray-200 rounded-[6px]'
                key={item.id}
              >
                <p>{item.label}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default DocumentTypeDropdown;
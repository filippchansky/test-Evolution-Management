'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import typeDoc from '@/public/icons/status-16.svg';
import { IDocument } from '@/models';
import Button from '@/UI/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDocument } from '@/api/documents/createDocument';
import DocumentHeader from '../DocumentHeader/DocumentHeader';
import DocumentTitleInput from '../DocumentTitileInput/DocumentTitleInput';
import DocumentTypeDropdown from '../DocumentTypeDropdown/DocumentTypeDropdown';
import DocumentDescription from '../DocumentDescription/DocumentDescription';
import { DROPDOWN_OPTIONS_DOC_TYPE } from '@/utils/constats';

interface IProp {
  onClose: () => void;
  id?: number | null;
  mode: 'view' | 'create';
}

const DocumentCreate: React.FC<IProp> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const [document, setDocument] = useState<Omit<IDocument, 'id'>>({
    description: '',
    title: '',
    type: 0,
  });

  const { mutate, isError, error } = useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
    onSettled: (_data, error) => {
      if (!error) {
        setDocument({ description: '', title: '', type: 0 });
        onClose();
      }
    },
  });

  const handleSubmit = () => {
    mutate(document);
  };

  return (
    <div className='flex flex-col h-full justify-between'>
      <div>
        <DocumentHeader mode={'create'} onClose={onClose} />
        <div className='p-6 flex flex-col'>
          <DocumentTitleInput
            disabled={false}
            onChange={(title) => setDocument((prev) => ({ ...prev, title }))}
            value={document.title}
          />
          <div className='flex items-center gap-10'>
            <div className='flex gap-2'>
              <Image src={typeDoc} alt='' />
              <p className='text-[14px] text-[#717680] text-nowrap'>Тип документа</p>
            </div>
            <DocumentTypeDropdown
              type={document.type}
              options={DROPDOWN_OPTIONS_DOC_TYPE}
              disabled={false}
              onChange={(type) => setDocument((prev) => ({ ...prev, type }))}
            />
          </div>
          <DocumentDescription
            value={document.description}
            disabled={false}
            onChange={(description) => setDocument((prev) => ({ ...prev, description }))}
          />
          {isError && <p className='text-red-500 mt-2'>Ошибка: {error.message}</p>}
        </div>
      </div>
      <div className='w-full flex justify-end items-center h-14 px-3.5 border-t border-[rgba(0,0,0,0.2)]'>
        <Button
          onClick={handleSubmit}
          disabled={document.title.trim() === '' || document.description.trim() === ''}
          color='#456EFF'
        >
          Создать
        </Button>
      </div>
    </div>
  );
};
export default DocumentCreate;

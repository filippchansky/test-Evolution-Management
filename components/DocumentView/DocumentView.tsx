'use client';
import { getDocumentById } from '@/api/documents/getDocumentById';
import { IDocument } from '@/models';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import typeDoc from '@/public/icons/status-16.svg';
import React, { useEffect, useState } from 'react';
import DocumentDescription from '../DocumentDescription/DocumentDescription';
import DocumentTypeDropdown from '../DocumentTypeDropdown/DocumentTypeDropdown';
import DocumentTitleInput from '../DocumentTitileInput/DocumentTitleInput';
import DocumentHeader from '../DocumentHeader/DocumentHeader';
import { DROPDOWN_OPTIONS_DOC_TYPE } from '@/utils/constats';

interface IProp {
  onClose: () => void;
  id?: number | null;
}

const DocumentView: React.FC<IProp> = ({ id, onClose }) => {
  const [document, setDocument] = useState<Omit<IDocument, 'id'>>({
    description: '',
    title: '',
    type: 0,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['document', id],
    queryFn: () => getDocumentById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setDocument(data[0]);
    }
  }, [data]);

  if (isLoading)
    return (
      <div className='flex justify-center items-center h-full'>
        <p>Загрузка...</p>
      </div>
    );

  if (isError) return <p>Ошибка</p>;

  return (
    <div className='flex flex-col h-full justify-between'>
      <div>
        <DocumentHeader mode={'view'} onClose={onClose} />
        <div className='p-6 flex flex-col'>
          <DocumentTitleInput
            disabled={true}
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
              disabled={true}
              onChange={(type) => setDocument((prev) => ({ ...prev, type }))}
            />
          </div>
          <DocumentDescription
            value={document.description}
            disabled={true}
            onChange={(description) => setDocument((prev) => ({ ...prev, description }))}
          />
        </div>
      </div>
    </div>
  );
};
export default DocumentView;

'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import documentIcon from '@/public/icons/dataflow.png';
import typeDoc from '@/public/icons/status-16.svg';
import DocType from '@/UI/DocType';
import descIcon from '@/public/icons/text-input.png';
import { DocumentType, IDocument } from '@/models';
import Button from '@/UI/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDocument } from '@/api/documents/createDocument';
import { getDocumentById } from '@/api/documents/getDocumentById';

 const DROPDOWM_OPTIONS = [
    {
      id: 0,
      lable: 'Регламент',
    },
    {
      id: 1,
      lable: 'Инструкция',
    },
    {
      id: 2,
      lable: 'Распоряжение',
    },
  ];

interface IProp {
  onClose: () => void;
  id?: number | null;
  mode: 'view' | 'create';
}

const DocumentCreate: React.FC<IProp> = ({ onClose, id, mode }) => {
  const queryClient = useQueryClient();
  const [document, setDocument] = useState<Omit<IDocument, 'id'>>({
    description: '',
    title: '',
    type: 0,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: existingDocument } = useQuery({
    queryKey: ['document', id],
    queryFn: () => getDocumentById(id!),
    enabled: mode === 'view' && !!id,
  });

  useEffect(() => {
    if (mode === 'view' && existingDocument) {
      console.log(existingDocument);
      setDocument(existingDocument[0]);
    }
  }, [existingDocument, mode]);

  const { mutate, status } = useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  useEffect(() => {
    if (status === 'success') {
      setDocument({
        description: '',
        title: '',
        type: 0,
      });
    }
  }, [status]);

  const handleSubmit = () => {
    mutate(document);
  };

  const handleType = (type: DocumentType) => {
    setDocument((prev) => ({
      ...prev,
      type,
    }));
  };

  return (
    <div className='flex flex-col h-full justify-between'>
      <div>
        <div className='flex justify-between items-center w-full h-14 px-3.5 border-b border-[rgba(0,0,0,0.2)]'>
          <div className='flex'>
            <div className='flex items-center pr-3.5 gap-2 border-r border-[#6F717C]'>
              <Image src={documentIcon} alt='' />
              <h2 className='text-[14px]'>Документы</h2>
            </div>
            <div className='px-3'>
              <p className='text-[14px] text-[#717680]'>
                {id ? `Просмотр документа ${id}` : 'Создание документа'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className='cursor-pointer'>
            ✕
          </button>
        </div>
        <div className='p-6 flex flex-col'>
          <input
            disabled={mode === 'view'}
            value={document.title}
            onChange={(e) =>
              setDocument((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            type='text'
            name=''
            id=''
            className='w-full text-2xl h-14 placeholder:text-2xl placeholder:h-full focus:outline-none'
            placeholder='Название'
          />
          <div className='flex items-center gap-10'>
            <div className='flex gap-2'>
              <Image src={typeDoc} alt='' />
              <p className='text-[14px] text-[#717680] text-nowrap'>Тип документа</p>
            </div>
            <div
              onClick={() => {
                if (mode === 'create') {
                  setDropdownOpen(!dropdownOpen);
                }
              }}
              className='w-full p-2 rounded-[6px] hover:bg-[#F5F5F5] cursor-pointer relative'
            >
              <div className='flex relative'>
                <DocType type={document.type} />
                <ul
                  className={`absolute w-48 top-10 p-1 border border-gray-200 rounded-[6px] bg-white ${
                    dropdownOpen ? 'visible' : 'invisible'
                  }`}
                >
                  {DROPDOWM_OPTIONS.map((item) => (
                    <li
                      onClick={() => handleType(item.id as DocumentType)}
                      className='py-2 px-4 hover:bg-gray-200 rounded-[6px]'
                      key={item.id}
                    >
                      <p>{item.lable}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <Image src={descIcon} alt='' />
              <p className='text-black text-[16px]'>Описание</p>
            </div>
            <textarea
              disabled={mode === 'view'}
              value={document.description}
              onChange={(e) =>
                setDocument((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={4}
              className='focus:outline-none border rounded-[6px] p-1.5 text-[#414651] border-[rgba(65,70,81,0.2)] w-full'
            ></textarea>
          </div>
        </div>
      </div>
      {mode === 'create' && (
        <div className='w-full flex justify-end items-center h-14 px-3.5 border-t border-[rgba(0,0,0,0.2)]'>
          <Button
            onClick={handleSubmit}
            disabled={document.title.trim() === '' || document.description.trim() === ''}
            color='#456EFF'
          >
            Создать
          </Button>
        </div>
      )}
    </div>
  );
};
export default DocumentCreate;

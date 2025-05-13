'use client';
import { getDocuments } from '@/api/documents/getDocuments';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import DocumentItem from '../DocumentItem/DocumentItem';
import SideBar from '../SideBar/SideBar';
import DocumentView from '../DocumentView/DocumentView';

const DocumentsList: React.FC = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [documentOpen, setDocumentOpen] = useState<number | null>(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  });

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (isError) return <p>Ошибка</p>;

  return (
    <div>
      <SideBar isOpen={sideBarOpen} onClose={() => setSideBarOpen(false)}>
        <DocumentView onClose={() => setSideBarOpen(false)} id={documentOpen} />
      </SideBar>
      <h1 className='text-2xl font-medium mb-3'>Документы</h1>
      {data?.length ? (
        <ul className='flex flex-col gap-2'>
          {data.map((item) => (
            <li
              className='cursor-pointer'
              onClick={() => {
                setSideBarOpen(true);
                setDocumentOpen(item.id);
              }}
              key={item.id}
            >
              <DocumentItem data={item} />
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p className='text-[18px] text-[#B3B3B3] font-medium'>Список пуст</p>
        </>
      )}
    </div>
  );
};
export default DocumentsList;

import { IDocument } from '@/models';
import React from 'react';

interface IProps {
  data: IDocument;
}

const DocumentItem: React.FC<IProps> = ({ data }) => {
  return (
    <div className='max-w-[400px] h-11 py-3 px-6 border border-[rgba(65,70,81,0.2)] rounded-[6px] flex items-center '>
      <p className='text-[18px] text-[#534F4F]'>{data.title}</p>
    </div>
  );
};
export default DocumentItem;

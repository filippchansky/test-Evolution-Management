import { DocumentType } from '@/models';
import React from 'react';

interface IProps {
  type: DocumentType;
}

const DocType: React.FC<IProps> = ({ type }) => {
  const handleText = () => {
    switch (type) {
      case 0:
        return 'Регламент';
      case 1:
        return 'Инструкция';
      case 2:
        return 'Распоряжение';
      default:
        break;
    }
  };

  return (
    <div
      className='py-1 px-2 border rounded-[6px]'
      style={{
        backgroundColor: `${type === 0 ? '#EFF8FF' : type === 1 ? '#EFFFF1' : '#FEF3F2'}`,
        borderColor: `${type === 0 ? '#B2DDFF' : type === 1 ? '#CAFED8' : '#FECDCA'}`,
        color: `${type === 0 ? '#175CD3' : type === 1 ? '#17D36F' : '#B42318'}`,
      }}
    >
      <p>{handleText()}</p>
    </div>
  );
};
export default DocType;

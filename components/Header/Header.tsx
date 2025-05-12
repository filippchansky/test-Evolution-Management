'use client';
import Button from '@/UI/Button';
import React, { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import DocumentCreate from '../DocumentCreate/DocumentCreate';

const Header: React.FC = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <header className='w-full h-[64px] bg-[#AFAFAF] flex justify-end items-center px-8'>
      <SideBar isOpen={sideBarOpen} onClose={() => setSideBarOpen(false)}>
        <DocumentCreate mode='create' onClose={() => setSideBarOpen(false)}/>
      </SideBar>
      <Button color='#456EFF' onClick={() => setSideBarOpen(true)}>
        Создать
      </Button>
    </header>
  );
};
export default Header;

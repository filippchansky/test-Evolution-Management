import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SideBar: React.FC<SidebarProps> = ({ children, isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-[600px] bg-white z-50 shadow-lg transform transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        
        <div className='h-full overflow-y-auto'>{children}</div>
      </aside>
    </>
  );
};
export default SideBar;

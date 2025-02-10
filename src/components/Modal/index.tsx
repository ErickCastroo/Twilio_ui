import React, { ReactNode, useEffect, useRef } from 'react';

import { FiXOctagon  } from "react-icons/fi";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Cerrar el modal si se hace clic fuera del contenido
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  // Agregar el event listener cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Limpiar el event listener al desmontar el componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-bgSecundario rounded-lg shadow-lg p-6 w-11/12 sm:w-1/2 h-3/4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-slate-200"
        >
          <FiXOctagon size={30} />
        </button>
        {children}
      </div>
    </div>
  );
};

export  { Modal }
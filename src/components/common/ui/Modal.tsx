import { useRef, useEffect, useState } from 'react';
import ModalHeader from './ModalHeader';
import { IconType } from 'react-icons';
import { TbBox, TbX } from 'react-icons/tb';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  icon?: IconType
  title: string;
}

export default function Modal({ open, onClose, children, icon, title }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => setVisible(true));
    } else if (!open && dialog.open) {
      setVisible(false);
      const timeout = setTimeout(() => {
        dialog.close();
      }, 200);
      return () => clearTimeout(timeout);
    }

    const handleClose = () => {
      onClose();
      setVisible(false);
    };

    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [open, onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={`transition-all duration-200 ease-out rounded-2xl shadow-xl backdrop:bg-black/50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg
        ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}
    >
      <ModalHeader title={title} icon={icon || TbBox} action="new">
        <button className="cursor-pointer active:scale-95" onClick={onClose}>
          <TbX />
        </button>
      </ModalHeader>
      {children}
    </dialog>
  );
}

'use client';

import React from 'react';
import Modal from './modal';
import { Button } from './button';
interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function AlertModal({
  onClose,
  onConfirm,
  loading,
  isOpen,
}: AlertModalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Are you sure'
      description='this action can not be reversed'
    >
      <div className='flex items-center justify-between w-full max-w-md pt-6 space-x-3 '>
        <Button
          disabled={loading}
          type='button'
          variant='outline'
          onClick={onClose}
        >
          cancel
        </Button>
        <Button
          disabled={loading}
          type='submit'
          variant='destructive'
          onClick={onConfirm}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
}

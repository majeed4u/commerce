'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export default function Modal({
  children,
  isOpen,
  onClose,
  description,
  title,
}: ModalProps) {
  const handleClose = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}

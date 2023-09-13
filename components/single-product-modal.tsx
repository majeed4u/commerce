'use client';

interface SingleProductModalProps {
  isVisible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export default function SingleProductModal({
  isVisible,
  onClose,
  children,
}: SingleProductModalProps) {
  if (!isVisible) return null;

  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper') onClose();
  };
  return (
    <div
      className='fixed inset-0 z-10 flex items-center justify-center '
      onClick={handleClose}
      id='wrapper'
    >
      <div className='flex flex-col w-fit '>
        <button
          className='p-1 text-xs font-bold rounded-full text-neutral-500 place-self-end'
          onClick={onClose}
        >
          x
        </button>
        <div className='p-2 rounded-md bg-neutral-50 '>{children}</div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

import { ImagePlus, Trash } from 'lucide-react';

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from './ui/button';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;

  value: string;
}

function ImageUpload({ disabled, onChange, value }: ImageUploadProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  if (!mounted) {
    return null;
  }
  return (
    <div>
      <CldUploadWidget onUpload={onUpload} uploadPreset='commerce'>
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type='button'
              disabled={disabled}
              variant='secondary'
              onClick={onClick}
            >
              <ImagePlus className='w-4 h-4 mr-2 ' />
              Upload and image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

export default ImageUpload;

'use client';

import { Button } from '@/components/ui/button';
import { useFileUpload } from '../model/useFileUpload';

export function FileUploadSection() {
  const { status, message, inputRef, openPicker, onFileSelected } = useFileUpload();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-semibold">File Upload</p>
        <Button size="sm" onClick={openPicker}>
          {status === 'uploading' ? 'Uploading...' : 'Pick and Upload'}
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*,application/pdf,*/*"
        onChange={onFileSelected}
      />
      {message ? (
        <p className={status === 'error' ? 'text-sm text-danger' : 'text-sm text-ink/70'}>
          {message}
        </p>
      ) : null}
    </div>
  );
}

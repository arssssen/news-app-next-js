import { RefObject, useCallback, useRef, useState } from 'react';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

type UseFileUploadResult = {
  status: UploadStatus;
  message: string | null;
  inputRef: RefObject<HTMLInputElement>;
  openPicker: () => void;
  onFileSelected: () => Promise<void>;
};

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useFileUpload(): UseFileUploadResult {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onFileSelected = useCallback(async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setMessage('File selection canceled.');
      return;
    }

    try {
      setStatus('uploading');
      setMessage(null);

      await wait(1200);

      setStatus('success');
      setMessage(`Uploaded: ${file.name}`);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to upload file.');
    } finally {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, []);

  return {
    status,
    message,
    inputRef,
    openPicker,
    onFileSelected,
  };
}

import { useCallback, useRef, useState } from 'react';

type DownloadStatus = 'idle' | 'downloading' | 'success' | 'error';

type UseFileDownloadResult = {
  status: DownloadStatus;
  progress: number;
  message: string | null;
  startDownload: (url: string) => Promise<void>;
};

export function useFileDownload(): UseFileDownloadResult {
  const [status, setStatus] = useState<DownloadStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const startDownload = useCallback(async (url: string) => {
    if (!url.trim()) {
      setStatus('error');
      setMessage('Download URL is required.');
      return;
    }

    setStatus('downloading');
    setProgress(0);
    setMessage(null);

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;

    xhr.responseType = 'blob';
    xhr.open('GET', url, true);

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        setProgress(event.loaded / event.total);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300 && xhr.response) {
        const blob = xhr.response as Blob;
        const downloadUrl = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = downloadUrl;
        anchor.download = `download-${Date.now()}`;
        anchor.click();
        URL.revokeObjectURL(downloadUrl);

        setStatus('success');
        setProgress(1);
        setMessage('Download complete.');
      } else {
        setStatus('error');
        setMessage('Download failed.');
      }
    };

    xhr.onerror = () => {
      setStatus('error');
      setMessage('Network error while downloading file.');
    };

    xhr.onloadend = () => {
      xhrRef.current = null;
    };

    xhr.send();
  }, []);

  return {
    status,
    progress,
    message,
    startDownload,
  };
}

'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFileDownload } from '../model/useFileDownload';

const DEFAULT_URL =
  'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

export function FileDownloadSection() {
  const [url, setUrl] = useState(DEFAULT_URL);
  const { status, progress, message, startDownload } = useFileDownload();

  return (
    <div className="space-y-3">
      <p className="font-display text-lg font-semibold">File Download</p>
      <Input
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://example.com/file.pdf"
      />
      <Button
        onClick={() => void startDownload(url)}
        disabled={status === 'downloading'}
      >
        {status === 'downloading' ? 'Downloading...' : 'Download File'}
      </Button>
      {status === 'downloading' ? (
        <p className="text-sm text-ink/70">Progress: {(progress * 100).toFixed(0)}%</p>
      ) : null}
      {message ? (
        <p className={status === 'error' ? 'text-sm text-danger' : 'text-sm text-ink/70'}>
          {message}
        </p>
      ) : null}
    </div>
  );
}

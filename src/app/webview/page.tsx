'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

function WebviewContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const title = searchParams.get('title');

  const safeUrl = useMemo(() => {
    if (!url) {
      return null;
    }
    try {
      return new URL(url).toString();
    } catch {
      return null;
    }
  }, [url]);

  if (!safeUrl) {
    return (
      <Card className="space-y-3">
        <h1 className="font-display text-xl font-semibold">Invalid article URL</h1>
        <p className="text-sm text-ink/60">
          The article link is missing or invalid.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">
            {title ?? 'Article'}
          </h1>
          <p className="text-sm text-ink/60">Embedded view of the source.</p>
        </div>
        <Button
          variant="outline"
          onClick={() => window.open(safeUrl, '_blank', 'noopener,noreferrer')}
        >
          Open in New Tab
        </Button>
      </div>

      <div className="h-[75vh] overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card">
        <iframe
          title={title ?? 'Article'}
          src={safeUrl}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}

export default function WebviewPage() {
  return (
    <Suspense
      fallback={
        <Card className="space-y-3">
          <h1 className="font-display text-xl font-semibold">Loading article</h1>
          <p className="text-sm text-ink/60">Preparing the embedded view...</p>
        </Card>
      }
    >
      <WebviewContent />
    </Suspense>
  );
}

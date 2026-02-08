'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { selectSelectedArticle } from '@/entities/news';
import { ArticleDetailsWidget } from '@/widgets/article-details/ui/ArticleDetailsWidget';
import { useAppSelector } from '@/shared/lib/hooks/redux';

export default function ArticlePage() {
  const router = useRouter();
  const article = useAppSelector(selectSelectedArticle);

  const handleOpenWebView = useCallback(
    (url: string, title?: string) => {
      const params = new URLSearchParams();
      params.set('url', url);
      if (title) {
        params.set('title', title);
      }
      router.push(`/webview?${params.toString()}`);
    },
    [router],
  );

  if (!article) {
    return (
      <Card className="space-y-3">
        <h1 className="font-display text-xl font-semibold">Article not found</h1>
        <p className="text-sm text-ink/60">
          We could not restore the article details. Go back to the news list and open it again.
        </p>
        <Button onClick={() => router.push('/news')}>Back to News</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <ArticleDetailsWidget article={article} onOpenWebView={handleOpenWebView} />
    </div>
  );
}

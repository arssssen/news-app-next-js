'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { NewsArticle, setSelectedArticle } from '@/entities/news';
import { NewsListWidget } from '@/widgets/news-list/ui/NewsListWidget';
import { useAppDispatch } from '@/shared/lib/hooks/redux';

export default function NewsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handlePressArticle = useCallback(
    (article: NewsArticle) => {
      dispatch(setSelectedArticle(article));
      router.push('/article');
    },
    [dispatch, router],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Latest News</h1>
        <p className="text-sm text-ink/60">
          Search and filter breaking stories across categories.
        </p>
      </div>
      <NewsListWidget onPressArticle={handlePressArticle} />
    </div>
  );
}

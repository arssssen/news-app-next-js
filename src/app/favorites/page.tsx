'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { NewsArticle, setSelectedArticle } from '@/entities/news';
import { FavoritesListWidget } from '@/widgets/favorites-list/ui/FavoritesListWidget';
import { useAppDispatch } from '@/shared/lib/hooks/redux';

export default function FavoritesPage() {
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
        <h1 className="font-display text-2xl font-semibold">Favorites</h1>
        <p className="text-sm text-ink/60">Saved stories stay here for later.</p>
      </div>
      <FavoritesListWidget onPressArticle={handlePressArticle} />
    </div>
  );
}

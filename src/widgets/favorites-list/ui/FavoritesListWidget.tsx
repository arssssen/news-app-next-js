'use client';

import { NewsListItem } from '@/entities/news';
import {
  selectFavoriteArticles,
  selectFavoritesHydrated,
} from '@/features/toggle-favorite/model/favoritesSlice';
import { useFavoriteActions } from '@/features/toggle-favorite/model/useFavoriteActions';
import { FavoriteToggleButton } from '@/features/toggle-favorite/ui/FavoriteToggleButton';
import { useAppSelector } from '@/shared/lib/hooks/redux';
import { NewsArticle } from '@/entities/news';

type Props = {
  onPressArticle: (article: NewsArticle) => void;
};

function FavoriteRow({
  article,
  onPressArticle,
}: {
  article: NewsArticle;
  onPressArticle: (article: NewsArticle) => void;
}) {
  const { isFavorite, onToggleFavorite } = useFavoriteActions(article);

  return (
    <NewsListItem
      article={article}
      onPress={onPressArticle}
      footerAction={
        <FavoriteToggleButton isFavorite={isFavorite} onPress={onToggleFavorite} />
      }
    />
  );
}

export function FavoritesListWidget({ onPressArticle }: Props) {
  const favorites = useAppSelector(selectFavoriteArticles);
  const isHydrated = useAppSelector(selectFavoritesHydrated);

  if (!isHydrated) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-sm text-ink/70">Loading favorites...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center text-center">
        <p className="text-base font-semibold text-ink">No favorites yet.</p>
        <p className="text-sm text-ink/60">
          Save articles from News to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {favorites.map((article) => (
        <FavoriteRow key={article.url} article={article} onPressArticle={onPressArticle} />
      ))}
    </div>
  );
}

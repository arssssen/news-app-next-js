'use client';

import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { NewsArticle, NewsListItem } from '@/entities/news';
import { useNewsFilter } from '@/features/news-filter/model/useNewsFilter';
import { NewsFilterBar } from '@/features/news-filter/ui/NewsFilterBar';
import { useNewsSearch } from '@/features/news-search/model/useNewsSearch';
import { NewsSearchInput } from '@/features/news-search/ui/NewsSearchInput';
import { useFavoriteActions } from '@/features/toggle-favorite/model/useFavoriteActions';
import { FavoriteToggleButton } from '@/features/toggle-favorite/ui/FavoriteToggleButton';
import { useNewsList } from '../model/useNewsList';

const EMPTY_STATE = 'No articles found.';

type Props = {
  onPressArticle: (article: NewsArticle) => void;
};

function NewsRow({
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

export function NewsListWidget({ onPressArticle }: Props) {
  const {
    searchText,
    debouncedSearchText,
    onChangeSearchText,
    clearSearch,
  } = useNewsSearch();
  const {
    selectedCategory,
    selectedDateFilter,
    categoryParam,
    fromParam,
    toParam,
    setCategory,
    setDateFilter,
  } = useNewsFilter();

  const filters = useMemo(
    () => ({
      query: debouncedSearchText,
      from: fromParam,
      to: toParam,
      category: categoryParam,
    }),
    [categoryParam, debouncedSearchText, fromParam, toParam],
  );

  const {
    articles,
    isInitialLoading,
    isFetchingNextPage,
    isRefreshing,
    errorMessage,
    hasMore,
    loadNextPage,
    retry,
    refresh,
  } = useNewsList(filters);

  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-3xl border border-ink/10 bg-white/70 p-5 shadow-card">
        <NewsSearchInput
          value={searchText}
          onChangeText={onChangeSearchText}
          onClear={clearSearch}
        />
        <NewsFilterBar
          selectedCategory={selectedCategory}
          selectedDateFilter={selectedDateFilter}
          onSelectCategory={setCategory}
          onSelectDateFilter={setDateFilter}
        />
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={refresh}>
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {isInitialLoading && articles.length === 0 ? (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="flex w-full gap-4 rounded-3xl border border-ink/10 bg-white/70 p-4 shadow-card animate-pulse"
            >
              <div className="h-24 w-24 rounded-2xl bg-sand" />
              <div className="flex flex-1 flex-col gap-3">
                <div className="h-4 w-3/4 rounded-full bg-sand" />
                <div className="h-3 w-full rounded-full bg-sand" />
                <div className="h-3 w-1/2 rounded-full bg-sand" />
                <div className="h-8 w-24 rounded-full bg-sand" />
              </div>
            </div>
          ))}
        </div>
      ) : errorMessage && articles.length === 0 ? (
        <div className="flex h-[50vh] flex-col items-center justify-center gap-3 text-center">
          <p className="text-base font-semibold text-ink">Failed to load news.</p>
          <p className="text-sm text-ink/60">{errorMessage}</p>
          <Button onClick={retry}>Retry</Button>
        </div>
      ) : !isInitialLoading && articles.length === 0 ? (
        <div className="flex h-[50vh] items-center justify-center text-center">
          <p className="text-base font-semibold text-ink">{EMPTY_STATE}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <NewsRow
              key={article.url}
              article={article}
              onPressArticle={onPressArticle}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center">
        {hasMore ? (
          <Button onClick={loadNextPage} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        ) : (
          <p className="text-xs uppercase tracking-wide text-ink/50">
            You are all caught up.
          </p>
        )}
      </div>
    </div>
  );
}

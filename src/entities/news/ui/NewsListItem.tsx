'use client';

import { type ReactNode } from 'react';
import dayjs from 'dayjs';

import { NewsArticle } from '../model/types';
import { cn } from '@/shared/lib/utils';

type Props = {
  article: NewsArticle;
  onPress: (article: NewsArticle) => void;
  footerAction?: ReactNode;
};

export function NewsListItem({ article, onPress, footerAction }: Props) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onPress(article)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onPress(article);
        }
      }}
      className="flex w-full cursor-pointer gap-4 rounded-3xl border border-ink/10 bg-white/90 p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      {article.urlToImage ? (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="h-24 w-24 rounded-2xl object-cover"
          loading="lazy"
        />
      ) : (
        <div className="h-24 w-24 rounded-2xl bg-sand" />
      )}

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="line-clamp-2 text-base font-semibold text-ink">
          {article.title}
        </h3>
        <p className={cn('line-clamp-2 text-sm text-ink/60')}>
          {article.description ?? 'No description available.'}
        </p>
        <p className="text-xs uppercase tracking-wide text-ink/45">
          {dayjs(article.publishedAt).format('MMM D, YYYY')}
        </p>
        {footerAction}
      </div>
    </div>
  );
}

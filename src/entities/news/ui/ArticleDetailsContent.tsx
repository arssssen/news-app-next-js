'use client';

import dayjs from 'dayjs';

import { NewsArticle } from '../model/types';

type Props = {
  article: NewsArticle;
};

export function ArticleDetailsContent({ article }: Props) {
  return (
    <div className="space-y-4">
      {article.urlToImage ? (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="h-64 w-full rounded-3xl object-cover"
        />
      ) : null}

      <h1 className="font-display text-2xl font-semibold text-ink">
        {article.title}
      </h1>

      <div className="space-y-1 text-xs uppercase tracking-wide text-ink/50">
        {article.author ? <p>By {article.author}</p> : null}
        <p>{dayjs(article.publishedAt).format('MMM D, YYYY h:mm A')}</p>
      </div>

      {article.description ? (
        <p className="text-base font-medium text-ink/80">
          {article.description}
        </p>
      ) : null}

      <p className="text-base leading-7 text-ink">
        {article.content ?? 'No full content provided by source.'}
      </p>
    </div>
  );
}

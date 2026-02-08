'use client';

import { Button } from '@/components/ui/button';
import { ArticleDetailsContent, NewsArticle } from '@/entities/news';

type Props = {
  article: NewsArticle;
  onOpenWebView: (url: string, title?: string) => void;
};

export function ArticleDetailsWidget({ article, onOpenWebView }: Props) {
  return (
    <div className="space-y-6">
      <ArticleDetailsContent article={article} />
      <Button onClick={() => onOpenWebView(article.url, article.title)}>
        Read Full Article
      </Button>
    </div>
  );
}

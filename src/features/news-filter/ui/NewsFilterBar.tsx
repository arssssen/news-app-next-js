'use client';

import { Button } from '@/components/ui/button';
import { NewsCategory } from '@/entities/news';
import { NewsDateFilter } from '../model/types';
import { cn } from '@/shared/lib/utils';

const CATEGORIES: Array<NewsCategory | 'all'> = [
  'all',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

const DATE_FILTERS: NewsDateFilter[] = ['all', '24h', '7d'];

type Props = {
  selectedCategory: NewsCategory | 'all';
  selectedDateFilter: NewsDateFilter;
  onSelectCategory: (category: NewsCategory | 'all') => void;
  onSelectDateFilter: (filter: NewsDateFilter) => void;
};

export function NewsFilterBar({
  selectedCategory,
  selectedDateFilter,
  onSelectCategory,
  onSelectDateFilter,
}: Props) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <Button
                key={category}
                type="button"
                size="sm"
                variant={isActive ? 'primary' : 'outline'}
                className={cn('capitalize', isActive && 'shadow-sm')}
                onClick={() => onSelectCategory(category)}
              >
                {category}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">
          Date
        </p>
        <div className="flex flex-wrap gap-2">
          {DATE_FILTERS.map((filter) => {
            const isActive = selectedDateFilter === filter;
            return (
              <Button
                key={filter}
                type="button"
                size="sm"
                variant={isActive ? 'default' : 'outline'}
                onClick={() => onSelectDateFilter(filter)}
              >
                {filter}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

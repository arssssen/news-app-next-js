'use client';

import { Button } from '@/components/ui/button';

type Props = {
  isFavorite: boolean;
  onPress: () => void;
};

export function FavoriteToggleButton({ isFavorite, onPress }: Props) {
  return (
    <Button
      type="button"
      size="sm"
      variant={isFavorite ? 'default' : 'outline'}
      className="mt-2 w-fit"
      onClick={(event) => {
        event.stopPropagation();
        onPress();
      }}
    >
      {isFavorite ? 'Unfavorite' : 'Favorite'}
    </Button>
  );
}

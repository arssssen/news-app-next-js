'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  onClear: () => void;
};

export function NewsSearchInput({ value, onChangeText, onClear }: Props) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <Input
        value={value}
        onChange={(event) => onChangeText(event.target.value)}
        placeholder="Search by title or keyword"
        autoCorrect="off"
      />
      {value.length > 0 ? (
        <Button variant="secondary" size="sm" onClick={onClear}>
          Clear
        </Button>
      ) : null}
    </div>
  );
}

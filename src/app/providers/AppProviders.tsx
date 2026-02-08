import { PropsWithChildren } from 'react';

import { StoreProvider } from './StoreProvider';

export function AppProviders({ children }: PropsWithChildren) {
  return <StoreProvider>{children}</StoreProvider>;
}

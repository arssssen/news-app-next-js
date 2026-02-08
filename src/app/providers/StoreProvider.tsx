'use client';

import { PropsWithChildren, useEffect } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/app/store';
import { hydrateFavorites } from '@/features/toggle-favorite/model/favoritesSlice';
import { authenticateOnLaunch } from '@/processes/auth/model/authSlice';
import { useAppDispatch } from '@/shared/lib/hooks/redux';

function StoreHydrator({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(hydrateFavorites());
    void dispatch(authenticateOnLaunch());
  }, [dispatch]);

  return <>{children}</>;
}

export function StoreProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <StoreHydrator>{children}</StoreHydrator>
    </Provider>
  );
}

import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { AppProviders } from './providers/AppProviders';
import { AppShell } from './providers/AppShell';

export const metadata: Metadata = {
  title: 'Newswire',
  description: 'News app web experience built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}

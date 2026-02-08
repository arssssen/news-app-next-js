const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

if (!NEWS_API_KEY) {
  console.warn(
    'NEXT_PUBLIC_NEWS_API_KEY is not set. News requests will fail until it is configured.',
  );
}

export const env = {
  NEWS_API_KEY,
} as const;

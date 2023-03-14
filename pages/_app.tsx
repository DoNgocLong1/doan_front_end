import { store } from '@/app/store';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import DefaultLayout from '@/Layout/DefaultLayout/DefaultLayout';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 1 * 60 * 60 * 1000, // cache for 1 day
        retry: false,
      },
    },
  });
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </QueryClientProvider>
    </Provider>
  )
}

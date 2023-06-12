import { store } from '@/app/store';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import DefaultLayout from '@/Layout/DefaultLayout/DefaultLayout';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 1 * 60 * 60 * 1000, // cache for 1 day
        retry: true,
      },
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', handleStart);
      window.onload = handleComplete;
    }
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', handleStart);
        window.onload = null;
      }
    };
  }, [router]);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
        <Loading loading={loading} />
      </QueryClientProvider>
    </Provider>
  )
}

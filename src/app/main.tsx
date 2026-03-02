import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import router from './routes';
import Loading from '../components/Loading';
import './index.css';
import { Provider } from 'jotai';
import { myStore } from '@/store/store';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <>
    <StrictMode>
      <Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient}>
          <Provider store={myStore}>
            <RouterProvider router={router} />
          </Provider>
          <Toaster />
        </QueryClientProvider>
      </Suspense>
    </StrictMode>
  </>,
);

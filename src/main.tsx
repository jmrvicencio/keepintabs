import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import router from './router/routes';
import Loading from './pages/Loading';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <>
    <StrictMode>
      <Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Suspense>
    </StrictMode>
  </>,
);

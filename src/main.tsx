import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './router/routes';
import Loading from './pages/Loading';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <>
    <StrictMode>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </StrictMode>
  </>,
);

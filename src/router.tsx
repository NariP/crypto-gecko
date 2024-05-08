import { Navigate, createBrowserRouter } from 'react-router-dom';
import CryptoBookmarkPage from '@/pages/CryptoBookmarkPage';
import CryptoDetailPage from '@/pages/CryptoDetailPage';
import CryptoRoot from '@/pages/CryptoRoot';
import ErrorPage from '@/pages/ErrorPage';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/crypto/market" />,
    },
    {
      path: '/crypto',
      element: <CryptoRoot />,
      children: [
        {
          path: '/crypto/market',
          index: true,
          element: <HomePage />,
        },
        {
          path: '/crypto/bookmark',
          element: <CryptoBookmarkPage />,
        },
      ],
    },
    {
      path: '/crypto/:id',
      element: <CryptoDetailPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ].map(r => ({ ...r, errorElement: <ErrorPage /> }))
);

export default router;

import { Tab } from '@headlessui/react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
const CryptoRoot = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (pathname === '/') {
    return <Navigate replace to="/crypto/market" />;
  }

  const defaultIndex = pathname === '/crypto/market' ? 0 : 1;

  return (
    <>
      <header className="border border-b-gray-300">
        <h1>nav 코인 홈 페이지</h1>
      </header>
      <div className="px-x-sm py-y-sm">
        <Tab.Group defaultIndex={defaultIndex}>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              className={({ selected }) =>
                clsx(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
              onClick={() => {
                if (pathname === '/crypto/market') {
                  return;
                }
                navigate('/crypto/market');
              }}
            >
              가상자산 시세 목록
            </Tab>
            <Tab
              className={({ selected }) =>
                clsx(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
              onClick={() => {
                if (pathname === '/crypto/bookmark') {
                  return;
                }
                navigate('/crypto/bookmark');
              }}
            >
              북마크 목록
            </Tab>
          </Tab.List>
        </Tab.Group>
      </div>
      <Outlet />
    </>
  );
};

export default CryptoRoot;

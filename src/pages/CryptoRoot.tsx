import { Tab } from '@headlessui/react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import TopNav from '@/components/TopNav';
const CryptoRoot = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (pathname === '/') {
    return <Navigate replace to="/crypto/market" />;
  }

  const defaultIndex = pathname === '/crypto/market' ? 0 : 1;

  return (
    <>
      <TopNav>{pathname === '/crypto/market' ? '코인 홈' : '코인 북마크'}</TopNav>
      <div className="px-x-sm py-y-sm">
        <Tab.Group defaultIndex={defaultIndex}>
          <Tab.List className="flex space-x-1 rounded-xl bg-base-primary/40 p-1">
            <Tab
              className={({ selected }) =>
                clsx(
                  'w-full rounded-lg py-2.5 text-body1-bold leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-base-primary focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-base-primary shadow'
                    : 'text-gray-500 hover:bg-white/[0.12] hover:text-white'
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
                  'w-full rounded-lg py-2.5 text-body1-bold leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-base-primary focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-base-primary shadow'
                    : 'text-gray-500 hover:bg-white/[0.12] hover:text-white'
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

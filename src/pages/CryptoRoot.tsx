import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import TopNav from '@/components/TopNav';
import CryptoTabs from '@/screens/crypto/CryptoTabs';
import { useCryptoHomeToolbarStore } from '@/stores/useCryptoHomeToolbarStore';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
const CryptoRoot = () => {
  const { pathname } = useLocation();

  const restCurrencyStore = useCurrencyStore(state => state.reset);
  const resetHomeToolbar = useCryptoHomeToolbarStore(state => state.reset);

  useEffect(() => {
    // 다른 페이지를 갔다오거나 새로고침을 할 경우 기본 설정을 기준으로 리스트를 다시 그려야해서 리셋
    restCurrencyStore();
    resetHomeToolbar();
  }, [resetHomeToolbar, restCurrencyStore]);

  if (pathname === '/') {
    return <Navigate replace to="/crypto/market" />;
  }

  return (
    <>
      <TopNav>{pathname === '/crypto/market' ? '코인 홈' : '코인 북마크'}</TopNav>
      <CryptoTabs />
      <Outlet />
    </>
  );
};

export default CryptoRoot;

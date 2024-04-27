import { Suspense } from 'react';
import ContentsLoader from '@/components/ContentsLoader';
import TopNav from '@/components/TopNav';
import CryptoDetailContents from '@/screens/cryptoDetail/CryptoDetailContents';

const CryptoDetailPage = () => {
  return (
    <>
      <TopNav>코인 상세 페이지</TopNav>
      <Suspense fallback={<ContentsLoader />}>
        <CryptoDetailContents />
      </Suspense>
    </>
  );
};

export default CryptoDetailPage;

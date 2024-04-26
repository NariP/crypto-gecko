import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import ContentsLoader from '@/components/ContentsLoader';
import CryptoDetailContents from '@/screens/cryptoDetail/CryptoDetailContents';

const CryptoDetailPage = () => {
  const { id } = useParams();

  // todo: id 없으면 redirect

  return (
    <>
      <header className="border border-b-gray-300">
        <h1>nav 코인 상세 페이지 {id}</h1>
      </header>
      <Suspense fallback={<ContentsLoader />}>
        <CryptoDetailContents />
      </Suspense>
    </>
  );
};

export default CryptoDetailPage;

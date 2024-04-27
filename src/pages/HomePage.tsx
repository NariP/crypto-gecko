import { Suspense } from 'react';
import ContentsLoader from '@/components/ContentsLoader';
import CryptoHomeContents from '@/screens/crypto/cryptoHome/CryptoHomeContents';
import CryptoHomeToolbar from '@/screens/crypto/cryptoHome/CryptoHomeToolbar';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-y-sm">
      <CryptoHomeToolbar />
      <Suspense fallback={<ContentsLoader />}>
        <CryptoHomeContents />
      </Suspense>
    </div>
  );
};

export default HomePage;

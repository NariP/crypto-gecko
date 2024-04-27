import { Suspense } from 'react';
import ContentsLoader from '@/components/ContentsLoader';
import Page from '@/components/Page';
import CryptoHomeContents from '@/screens/crypto/cryptoHome/CryptoHomeContents';
import CryptoHomeToolbar from '@/screens/crypto/cryptoHome/CryptoHomeToolbar';

const HomePage = () => {
  return (
    <Page>
      <CryptoHomeToolbar />
      <Suspense fallback={<ContentsLoader />}>
        <CryptoHomeContents />
      </Suspense>
    </Page>
  );
};

export default HomePage;

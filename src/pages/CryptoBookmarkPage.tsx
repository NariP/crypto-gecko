import { Suspense } from 'react';
import ContentsLoader from '@/components/ContentsLoader';
import Page from '@/components/Page';
import CryptoBookmarkContents from '@/screens/crypto/cryptoBookmark/CryptoBookmarkContents';

const CryptoBookmarkPage = () => {
  return (
    <Page>
      <Suspense fallback={<ContentsLoader />}>
        <CryptoBookmarkContents />
      </Suspense>
    </Page>
  );
};

export default CryptoBookmarkPage;

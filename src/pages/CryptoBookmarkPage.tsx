import { Suspense } from 'react';
import ContentsLoader from '@/components/ContentsLoader';
import CryptoBookmarkContents from '@/screens/crypto/cryptoBookmark/CryptoBookmarkContents';

const CryptoBookmarkPage = () => {
  return (
    <Suspense fallback={<ContentsLoader />}>
      <CryptoBookmarkContents />
    </Suspense>
  );
};

export default CryptoBookmarkPage;

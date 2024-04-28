import { isEmpty } from 'lodash-es';
import { useBookmarksData } from '@/hooks/useBookmarks';
import CryptoBookmarkTable from '@/screens/crypto/cryptoBookmark/CryptoBookmarkTable';

const CryptoBookmarkContents = () => {
  const { bookmarks } = useBookmarksData();
  if (isEmpty(bookmarks)) {
    return (
      <section className="contents_section">
        <p className="text-base-text text-body1-bold p-[8px]">북마크된 코인이 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="contents_section">
      <CryptoBookmarkTable ids={bookmarks.join('')} />
    </section>
  );
};

export default CryptoBookmarkContents;

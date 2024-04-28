import { isEmpty } from 'lodash-es';
import { useBookmarksData } from '@/hooks/useBookmarks';
import CryptoHomeTable from '@/screens/crypto/cryptoHome/CryptoHomeTable';
import { useCryptoHomeToolbarStore } from '@/stores/useCryptoHomeToolbarStore';

const CryptoHomeContents = () => {
  const display = useCryptoHomeToolbarStore(state => state.display);
  const isBookmarkDisplay = display === 'bookmark';
  const { bookmarks } = useBookmarksData({ enabled: isBookmarkDisplay });

  if (isBookmarkDisplay && isEmpty(bookmarks)) {
    return (
      <section className="contents_section">
        <p className="text-base-text text-body1-bold p-[8px]">북마크된 코인이 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="contents_section">
      <CryptoHomeTable ids={isBookmarkDisplay ? bookmarks.join(',') : ''} />
    </section>
  );
};

export default CryptoHomeContents;

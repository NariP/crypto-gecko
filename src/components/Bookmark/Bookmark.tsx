import { useIsMutating } from '@tanstack/react-query';
import { StarIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

interface BookmarkProps {
  /** 코인 id */
  id: string;
  size?: 'small' | 'medium';
  /** 북마크 등록 함수 */
  toggleOn?: (id: string) => void;
  /** 북마크 등록 해제 함수 */
  toggleOff?: (id: string) => void;
  bookmarks: Set<string>;
}

const Bookmark = ({ id, size = 'medium', bookmarks, toggleOn, toggleOff }: BookmarkProps) => {
  const isMutatingBookmarks = useIsMutating({ mutationKey: ['bookmarks'] });

  const isActive = bookmarks.has(id);
  const toggleBookmark = () => {
    if (isActive) {
      toggleOff?.(id);
      return;
    }
    toggleOn?.(id);
  };

  const isToggleLoading = isMutatingBookmarks > 0;

  return (
    <button
      disabled={isToggleLoading}
      className="flex-grow-0 flex-shrink-0 active:scale-btn-pressed transition-transform disabled:cursor-default"
      type="button"
      name="bookmark_btn"
      onClick={isToggleLoading ? undefined : toggleBookmark}
    >
      <StarIcon
        className={clsx(
          'fill-gray-400 transition-colors hover:fill-yellow-400',
          isActive && 'fill-yellow-400',
          size === 'medium' ? 'w-[24px] h-[24px]' : 'w-[20px] h-[20px]'
        )}
      />
    </button>
  );
};

export default Bookmark;

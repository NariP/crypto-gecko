import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { StarIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { deleteBookmarks, postBookmarks } from '@/apis/bookmarks';
import queries from '@/apis/queries';

interface BookmarkProps {
  /** 코인 id */
  id: string;
  size?: 'small' | 'medium';
}

const Bookmark = ({ id, size = 'medium' }: BookmarkProps) => {
  const queryClient = useQueryClient();
  const { data } = useQuery(queries.bookmarks.list());

  const postMutation = useMutation({
    mutationFn: postBookmarks,
    onSuccess: () => {
      toast.success('북마크가 등록되었습니다.');
      queryClient.invalidateQueries({
        queryKey: [...queries.bookmarks.list().queryKey],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBookmarks,
    onSuccess: () => {
      toast.success('북마크가 해제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: [...queries.bookmarks.list().queryKey],
      });
    },
  });

  const isActive = !!data?.bookmarks?.includes(id);

  const toggleBookmark = () => {
    if (isActive) {
      deleteMutation.mutate({ id });
      return;
    }
    postMutation.mutate({ id });
  };

  const isToggleLoading = postMutation.isPending || deleteMutation.isPending;

  return (
    <button
      disabled={isToggleLoading}
      className="flex-grow-0 flex-shrink-0 active:scale-btn-pressed transition-transform disabled:cursor-default"
      type="button"
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

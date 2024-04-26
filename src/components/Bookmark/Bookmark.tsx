import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { StarIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { deleteBookmarks, postBookmarks } from '@/apis/bookmarks';
import queries from '@/apis/queries';

interface BookmarkProps {
  /** 코인 id */
  id: string;
}

const Bookmark = ({ id }: BookmarkProps) => {
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

  return (
    <button type="button" onClick={toggleBookmark}>
      <StarIcon className={clsx('h-5 w-5 fill-gray-400', isActive && 'fill-yellow-400')} />
    </button>
  );
};

export default Bookmark;

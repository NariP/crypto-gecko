import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteBookmarks, postBookmarks } from '@/apis/bookmarks';
import queries from '@/apis/queries';

export const useBookmarksData = (options?: { enabled?: boolean }) => {
  const { data } = useSuspenseQuery({
    ...queries.bookmarks.list(),
    ...options,
  });

  const bookmarks = data?.bookmarks || [];
  return { bookmarks, bookMarksSet: new Set(bookmarks) };
};

const useBookmarks = () => {
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationKey: ['bookmarks'],
    mutationFn: postBookmarks,
    onSuccess: () => {
      toast.success('북마크가 등록되었습니다.');
      queryClient.invalidateQueries({
        queryKey: [...queries.bookmarks.list().queryKey],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ['bookmarks'],
    mutationFn: deleteBookmarks,
    onSuccess: () => {
      toast.success('북마크가 해제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: [...queries.bookmarks.list().queryKey],
      });
    },
  });

  return {
    toggleOn(id: string) {
      postMutation.mutate({ id });
    },
    toggleOff(id: string) {
      deleteMutation.mutate({ id });
    },
  };
};

export default useBookmarks;

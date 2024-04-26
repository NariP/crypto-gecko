import { createQueryKeys } from '@lukemorales/query-key-factory';
import * as api from '@/apis/bookmarks';

const bookmarksQueries = createQueryKeys('bookmarks', {
  list: (key?: string) => ({
    queryKey: [key],
    queryFn: () => api.getBookmarks(),
  }),
});

export default bookmarksQueries;

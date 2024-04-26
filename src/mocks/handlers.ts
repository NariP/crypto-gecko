import { HttpResponse, delay, http } from 'msw';
import { makeSuccessBody } from '@/mocks/getJsonBody';

const DELAY_TIME = 600;

/** 로컬 스토리지 키 */
const BOOK_MARKS = 'bookmarks';

/** 로컬 스토리지에 저장되어있는 bookmark 를 parse 해서 가져오는 함수 */
const getBookmarks = () => {
  const localItem = window.localStorage.getItem(BOOK_MARKS) || '[]';
  return JSON.parse(localItem) as string[];
};

/** bookmark 를 로컬 스토리지에 저장 */
const setBookmarks = (bookmarks: string[]) => {
  window.localStorage.setItem(BOOK_MARKS, JSON.stringify(bookmarks));
};

export const handlers = [
  http.get('/api/bookmarks', async () => {
    await delay(DELAY_TIME);

    const bookmarks = getBookmarks();

    return HttpResponse.json(
      makeSuccessBody({
        bookmarks,
      }),
      { status: 200 }
    );
  }),
  http.post('/api/bookmarks', async ({ request }) => {
    await delay(DELAY_TIME);

    const bookmarks = getBookmarks();
    const body = (await request.json()) as unknown as {
      id: string;
    };

    const updatedBookmarks = [...bookmarks, body.id];
    setBookmarks(updatedBookmarks);

    return HttpResponse.json(makeSuccessBody({}), { status: 200 });
  }),
  http.delete('/api/bookmarks', async ({ request }) => {
    await delay(DELAY_TIME);

    const bookmarks = getBookmarks();
    const body = (await request.json()) as unknown as {
      id: string;
    };

    const filteredBookmarks = bookmarks.filter(b => b !== body.id);
    setBookmarks(filteredBookmarks);

    return HttpResponse.json(makeSuccessBody(null), { status: 200 });
  }),
];

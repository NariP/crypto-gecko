import { HttpResponse, delay, http } from 'msw';
import { makeSuccessBody } from '@/mocks/getJsonBody';

const DELAY_TIME = 600;

/** 로컬 스토리지 키 */
// const BOOK_MARK = 'bookmark';

/** 로컬 스토리지에 저장되어있는 bookmark 를 parse 해서 가져오는 함수 */
// const getBookmark = () => {
//   const localItem = window.localStorage.getItem(BOOK_MARK) || '[]';
//   return JSON.parse(localItem) as any[];
// };

/** bookmark 를 로컬 스토리지에 저장 */
// const setBookmark = (bookmark: string[]) => {
//   window.localStorage.setItem(BOOK_MARK, JSON.stringify(bookmark));
// };

export const handlers = [
  http.get('/api/bookmark', async () => {
    await delay(DELAY_TIME);

    // localStorage 에서 bookmark data load
    // return

    return HttpResponse.json(
      makeSuccessBody({
        bookmarks: ['hello'],
      }),
      { status: 200 }
    );
  }),
  http.post('/api/bookmark', async () => {
    await delay(DELAY_TIME);
    // localStorage 에서 bookmark data load
    // 추가
    // localStorage 에 변경된 데이터로 set

    return HttpResponse.json(makeSuccessBody({}), { status: 200 });
  }),
  http.delete('/api/bookmark', async () => {
    await delay(DELAY_TIME);

    // localStorage 에서 bookmark data load
    // 삭제
    // localStorage 에 변경된 데이터로 set

    return HttpResponse.json(makeSuccessBody(null), { status: 200 });
  }),
];

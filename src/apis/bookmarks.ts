import axios from '@/libs/axios';
import type { ApiRes } from '@/libs/axios/axios.types';

/** Bookmark 한 코인을 조회하는 API */
export const getBookmarks = () => {
  return axios.get<any, ApiRes<{ bookmarks: string[] }>>('/bookmarks');
};

/** Bookmark 등록하는 API */
export const postBookmarks = (body: { id: string }) => axios.post('/bookmarks', body);

/** Bookmark 해제하는 API */
export const deleteBookmarks = (data: { id: string }) => axios.delete('/bookmarks', { data });

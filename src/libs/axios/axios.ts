import { isEmpty } from 'lodash-es';
import axiosBase from 'axios';
import qs from 'qs';
import type { ErrorRes } from './axios.types';

/** 임의로 추가 **/
export class ApiError {
  message: string;
  code: number;
  title?: string;

  constructor(err: ErrorRes) {
    this.message = err.message || '예상하지 못한 오류가 발생했어요';
    this.code = err.code ?? err.status;
    this.title = err.title;
  }
}

const axios = axiosBase.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'comma' }),
});

axios.interceptors.request.use(config => {
  if (config.url?.startsWith('/v3')) {
    config.headers['x-cg-demo-api-key'] = import.meta.env.VITE_GECKO_API_KEY;
  }
  return config;
});

axios.interceptors.response.use(
  response => {
    /** 사전 정의된 api 에러 */
    if (typeof response.data?.code === 'number' && response.data.code < 0) {
      throw new ApiError(response.data);
    }

    return response.data;
  },
  ({ response = {} }) => {
    let error: ErrorRes = response.data || { code: response.status };

    // api gecko error status
    if (!isEmpty(response.data?.status)) {
      const status = response.data.status;
      error = { code: status.error_code, message: status.error_message } as ErrorRes;
    }

    // api gecko error 2
    if (response.data?.error) {
      const status = response.status;
      error = { code: status, message: response.data.error } as ErrorRes;
    }

    return Promise.reject(new ApiError(error));
  }
);

export default axios;

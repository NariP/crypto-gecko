import axios from '@/libs/axios';
import type { NumberInCurrency } from '@/@types/currency';
import type { PriceListParams } from '@/@types/swagger';

const PREFIX = '/v3/simple';

interface PriceListRes {
  /** coinID */
  [coinId: string]: NumberInCurrency;
}

/** 코인을 지원하는 통화값으로 변경해서 보여주는 API */
export const getSimplePrice = (params: PriceListParams) =>
  axios.get<unknown, PriceListRes>(`${PREFIX}/price`, { params });

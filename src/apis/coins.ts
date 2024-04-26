import { NumberInCurrency } from '@/@types/currency';
import axios from '@/libs/axios';
import type { CoinsDetailParams } from '@/@types/swagger';

const PREFIX = '/v3/coins';

interface CoinsDetailRes {
  /** 코인 상세 설명 */
  description: {
    ko: string;
    en: string;
  };
  /** 코인 local 이름 */
  localization: {
    ko: string;
    en: string;
  };
  /** 코인 이미지 */
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  /** 코인 심볼 */
  symbol: string;
  /** 시가 총액 순위 */
  market_cap_rank: number;
  links: {
    /** 홈페이지 링크 목록 */
    homepage: string[];
  };
  market_data: {
    /** 현재가 */
    current_price: NumberInCurrency;
    /** 24h 증감률 */
    price_change_percentage_24h: number;
    /** 24h 통화별 증감률 */
    price_change_percentage_24h_in_currency: NumberInCurrency;
    /** 시가 총액 */
    market_cap: NumberInCurrency;
    /** 거래대금 */
    total_volume: NumberInCurrency;
  };
}

/** 코인 상세 정보 조회 API */
export const getCoinDetail = ({ id, ...query }: CoinsDetailParams) =>
  axios.get<any, CoinsDetailRes>(`${PREFIX}/${id}`, { params: query });

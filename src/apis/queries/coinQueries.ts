import { createQueryKeys } from '@lukemorales/query-key-factory';
import * as api from '@/apis/coins';
import type { CoinsDetailParams, MarketsListParams } from '@/@types/swagger';

const coinQueries = createQueryKeys('coins', {
  detail: (params: CoinsDetailParams) => ({
    queryKey: [params],
    queryFn: () => api.getCoinsDetail(params),
  }),
  markets: (params: MarketsListParams) => ({
    queryKey: [params],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      api.getCoinsMarkets({ ...params, page: pageParam }),
  }),
});

export default coinQueries;

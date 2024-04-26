import { createQueryKeys } from '@lukemorales/query-key-factory';
import * as api from '@/apis/coins';
import type { CoinsDetailParams } from '@/@types/swagger';

const coinQueries = createQueryKeys('coins', {
  detail: (params: CoinsDetailParams) => ({
    queryKey: [params],
    queryFn: () => api.getCoinDetail(params),
  }),
});

export default coinQueries;

import { createQueryKeys } from '@lukemorales/query-key-factory';
import * as api from '@/apis/simple';
import type { PriceListParams } from '@/@types/swagger';

const simpleQueries = createQueryKeys('simple', {
  price: (params: PriceListParams) => ({
    queryKey: [params],
    queryFn: () => api.getSimplePrice(params),
  }),
});

export default simpleQueries;

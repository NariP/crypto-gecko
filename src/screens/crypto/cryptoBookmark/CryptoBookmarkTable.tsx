import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import queries from '@/apis/queries';
import CryptoTable from '@/components/CryptoTable';
import { useCryptoHomeToolbarStore } from '@/stores/useCryptoHomeToolbarStore';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import type { MarketsListRes } from '@/apis/coins';

interface CryptoBookmarkTableProps {
  ids: string;
}

const CryptoBookmarkTable = ({ ids }: CryptoBookmarkTableProps) => {
  const currency = useCurrencyStore(state => state.currency);
  const limit = useCryptoHomeToolbarStore(state => state.limit);

  const { data } = useSuspenseInfiniteQuery({
    ...queries.coins.markets({
      locale: 'en',
      per_page: 250,
      vs_currency: currency,
      price_change_percentage: '1h,24h,7d',
      order: 'market_cap_desc',
      ids,
    }),
    initialPageParam: 1,
    getNextPageParam: (res: MarketsListRes, allPages) => {
      if (res?.length <= 0 || res?.length < Number(limit)) {
        return;
      }
      return allPages.length + 1;
    },
  });

  const noData = data?.pages === undefined || data?.pages?.length <= 0;

  return (
    <div className="overflow-x-scroll w-full mb-[32px]">
      <CryptoTable className="w-full">
        <CryptoTable.Header />
        <CryptoTable.Body>
          {noData ? <CryptoTable.RowNoData /> : <CryptoTable.Row pages={data.pages} />}
        </CryptoTable.Body>
      </CryptoTable>
    </div>
  );
};

export default CryptoBookmarkTable;

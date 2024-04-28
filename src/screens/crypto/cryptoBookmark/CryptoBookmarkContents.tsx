import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import queries from '@/apis/queries';
import CryptoTable from '@/components/CryptoTable';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import type { MarketsListRes } from '@/apis/coins';

const CryptoBookmarkContents = () => {
  const currency = useCurrencyStore(state => state.currency);

  const { data: bookmarkRes } = useSuspenseQuery(queries.bookmarks.list());

  const { data } = useSuspenseInfiniteQuery({
    ...queries.coins.markets({
      locale: 'en',
      per_page: 250,
      vs_currency: currency,
      price_change_percentage: '1h,24h,7d',
      order: 'market_cap_desc',
      ids: bookmarkRes?.bookmarks.join(','),
    }),
    initialPageParam: 1,
    getNextPageParam: (res: MarketsListRes, allPages) => {
      // data 없음
      if (res?.length < 0) {
        return;
      }
      return allPages.length + 1;
    },
  });

  return (
    <section className="contents_section">
      <div className="overflow-x-scroll w-full">
        <CryptoTable className="w-full">
          <CryptoTable.Header />
          <CryptoTable.Body>
            {data?.pages === undefined || data?.pages?.length <= 0 ? (
              <CryptoTable.RowNoData />
            ) : (
              <CryptoTable.Row pages={data.pages} />
            )}
          </CryptoTable.Body>
        </CryptoTable>
      </div>
    </section>
  );
};

export default CryptoBookmarkContents;

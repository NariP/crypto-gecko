import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import queries from '@/apis/queries';
import CryptoTable from '@/components/CryptoTable';
import { useCryptoHomeToolbarStore } from '@/stores/useCryptoHomeToolbarStore';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import type { MarketsListRes } from '@/apis/coins';

const CryptoHomeContents = () => {
  const currency = useCurrencyStore(state => state.currency);
  const display = useCryptoHomeToolbarStore(state => state.display);
  const limit = useCryptoHomeToolbarStore(state => state.limit);

  const { data: bookmarkRes } = useQuery(queries.bookmarks.list());

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    ...queries.coins.markets({
      locale: 'en',
      per_page: Number(limit),
      vs_currency: currency,
      price_change_percentage: '1h,24h,7d',
      order: 'market_cap_desc',
      ids: display === 'all' ? '' : bookmarkRes?.bookmarks.join(','),
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
    <>
      <CryptoTable>
        <CryptoTable.Header />
        <CryptoTable.Body>
          {data?.pages === undefined || data?.pages?.length <= 0 ? (
            <CryptoTable.RowNoData />
          ) : (
            <CryptoTable.Row pages={data.pages} />
          )}
        </CryptoTable.Body>
      </CryptoTable>
      <button
        type="button"
        disabled={
          isFetchingNextPage ||
          data?.pages === undefined ||
          data?.pages?.length <= 0 ||
          !hasNextPage
        }
        onClick={() => {
          if (isFetchingNextPage) {
            return;
          }
          fetchNextPage();
        }}
      >
        +더보기{isFetchingNextPage ? '...' : ''}
      </button>
    </>
  );
};

export default CryptoHomeContents;

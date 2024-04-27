import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import queries from '@/apis/queries';
import Bookmark from '@/components/Bookmark';
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
      <table>
        <thead>
          <tr>
            <th />
            <th>자산</th>
            <th />
            <th>Price</th>
            <th>1H</th>
            <th>24H</th>
            <th>7D</th>
            <th>24H Volume</th>
          </tr>
        </thead>
        {data?.pages === undefined || data?.pages?.length <= 0 ? (
          <tbody>
            <tr>
              <td>데이터가 없습니다.</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.pages.map(p =>
              p.map(m => {
                return (
                  <tr key={m.id}>
                    <td>
                      <Bookmark id={m.id} />
                    </td>
                    <td>
                      <Link to={`/crypto/${m.id}`}>{m.name}</Link>
                    </td>
                    <td>{m.symbol.toUpperCase()}</td>
                    <td>{m.current_price}</td>
                    <td>{m.price_change_percentage_1h_in_currency}</td>
                    <td>{m.price_change_percentage_24h_in_currency}</td>
                    <td>{m.price_change_percentage_7d_in_currency}</td>
                    <td>{m.total_volume}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        )}
      </table>
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

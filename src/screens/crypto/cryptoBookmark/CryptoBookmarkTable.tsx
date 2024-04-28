import { useEffect } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import queries from '@/apis/queries';
import CryptoTable from '@/components/CryptoTable';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import type { MarketsListRes } from '@/apis/coins';

interface CryptoBookmarkTableProps {
  ids: string;
}

// pagination 없는 api가 없어서 최대값으로 설정
const PER_PAGE = 250;

const CryptoBookmarkTable = ({ ids }: CryptoBookmarkTableProps) => {
  const currency = useCurrencyStore(state => state.currency);

  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
    ...queries.coins.markets({
      locale: 'en',
      per_page: PER_PAGE,
      vs_currency: currency,
      price_change_percentage: '1h,24h,7d',
      order: 'market_cap_desc',
      ids,
    }),
    initialPageParam: 1,
    getNextPageParam: (res: MarketsListRes, allPages) => {
      if (res?.length <= 0 || res?.length < PER_PAGE) {
        return;
      }
      return allPages.length + 1;
    },
  });

  useEffect(() => {
    // pagination 없는 api가 없어서 페이지 없을 때까지 호출
    // totalCount 같이 참고할 값이 없어서 총 250개 일 때는 어쩔 수 없이 한 번 더 호출한다.
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

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

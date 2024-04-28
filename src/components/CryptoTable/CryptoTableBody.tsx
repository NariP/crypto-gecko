import { Link } from 'react-router-dom';
import Bookmark from '@/components/Bookmark';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import { cryptoPercentage, cryptoPercentageColor, toUpperCoinSymbol } from '@/utils/crypto';
import { localeCurrencySymbol } from '@/utils/localeCurrency';
import type { MarketsListRes } from '@/apis/coins';

const CryptoTableBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <tbody className={className}>{children}</tbody>;
};

export const CryptoTableRowNoData = () => {
  return (
    <tr>
      <td>데이터가 없습니다.</td>
    </tr>
  );
};

export const CryptoTableRow = ({ pages }: { pages: MarketsListRes[] }) => {
  const currency = useCurrencyStore(state => state.currency);

  return (
    <>
      {pages.map(p =>
        p.map(m => {
          return (
            <tr
              key={m.id}
              className="[&>td]:px-[8px] [&>td]:py-[12px] [&>td]:text-body1-regular border-b border-b-gray-300"
            >
              <td>
                <Bookmark id={m.id} />
              </td>
              <td>
                <Link to={`/crypto/${m.id}`} className="font-bold">
                  {m.name}
                </Link>
              </td>
              <td>{toUpperCoinSymbol(m.symbol)}</td>
              <td>{localeCurrencySymbol(m.current_price, currency)}</td>
              <td className={cryptoPercentageColor(m.price_change_percentage_1h_in_currency)}>
                <span className="font-bold text-inherit">
                  {cryptoPercentage(m.price_change_percentage_1h_in_currency)}%
                </span>
              </td>
              <td className={cryptoPercentageColor(m.price_change_percentage_24h_in_currency)}>
                <span className="font-bold text-inherit">
                  {cryptoPercentage(m.price_change_percentage_24h_in_currency)}%
                </span>
              </td>
              <td className={cryptoPercentageColor(m.price_change_percentage_7d_in_currency)}>
                <span className="font-bold text-inherit">
                  {cryptoPercentage(m.price_change_percentage_7d_in_currency)}%
                </span>
              </td>
              <td>{localeCurrencySymbol(m.total_volume, currency)}</td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default CryptoTableBody;

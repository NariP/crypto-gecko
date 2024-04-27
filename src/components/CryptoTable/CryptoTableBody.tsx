import { Link } from 'react-router-dom';
import Bookmark from '@/components/Bookmark';
import type { MarketsListRes } from '@/apis/coins';

const CryptoTableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

export const CryptoTableRowNoData = () => {
  return (
    <tr>
      <td>데이터가 없습니다.</td>
    </tr>
  );
};

export const CryptoTableRow = ({ pages }: { pages: MarketsListRes[] }) => {
  return (
    <>
      {pages.map(p =>
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
    </>
  );
};

export default CryptoTableBody;

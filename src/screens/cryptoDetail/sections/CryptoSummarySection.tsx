import clsx from 'clsx';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import { cryptoPercentage, cryptoPercentageColor } from '@/utils/crypto.ts';
import { localeCurrencySymbol } from '@/utils/localeCurrency';
import styles from './CryptoSummarySection.module.scss';
import type { CoinsDetailRes } from '@/apis/coins';

interface CryptoSummarySectionProps {
  data: CoinsDetailRes;
}

/** 테이블 형식으로 시가총액 Rank, 코인 홈페이지, 가격 정보를 표시하는 section */
const CryptoSummarySection = ({ data }: CryptoSummarySectionProps) => {
  const currency = useCurrencyStore(state => state.currency);

  return (
    <section className="contents_section flex flex-wrap">
      <table className={styles.section_inside}>
        <tbody className="text-base-text">
          <tr>
            <th className={styles.gray_table_th}>시가 총액 Rank</th>
            <td className={styles.gray_table_td}>
              Rank <strong className="bold">#{data.market_cap_rank}</strong>
            </td>
          </tr>
          <tr>
            <th className={styles.gray_table_th}>웹사이트</th>
            <td className={styles.gray_table_td}>
              {data.links.homepage.filter(Boolean).map((link, idx) => {
                return (
                  <a
                    key={idx}
                    className="text-blue-500 underline underline-offset-1"
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link}
                  </a>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.section_inside}>
        <div className="inline-flex flex-col flex-wrap w-full pb-[16px] items-start md:items-end md:pb-[8px]">
          <div className="text-right">
            <strong className={styles.current_price}>
              {localeCurrencySymbol(data.market_data.current_price[currency], currency)}
            </strong>
            <span
              className={clsx(
                styles.current_percent,
                cryptoPercentageColor(
                  data.market_data.price_change_percentage_24h_in_currency[currency]
                )
              )}
            >
              {cryptoPercentage(data.market_data.price_change_percentage_24h_in_currency[currency])}
              %
            </span>
          </div>
          <div className="text-right">
            <strong className="text-gray-500 text-body1-bold">
              {data.market_data.current_price.btc} BTC
            </strong>
            <span
              className={clsx(
                styles.current_percent,
                cryptoPercentageColor(data.market_data.price_change_percentage_24h_in_currency.btc)
              )}
            >
              {cryptoPercentage(data.market_data.price_change_percentage_24h_in_currency.btc)}%
            </span>
          </div>
        </div>

        <table className="w-full">
          <tbody className="flex w-full flex-wrap justify-end gap-[16px] md:gap-[8px]">
            <tr className={styles.transparent_table_tr}>
              <th className={styles.transparent_table_th}>시가 총액</th>
              <td className={styles.transparent_table_td}>
                {localeCurrencySymbol(data.market_data.market_cap[currency], currency)}
              </td>
            </tr>
            <tr className={styles.transparent_table_tr}>
              <th className={styles.transparent_table_th}>24시간 거래대금</th>
              <td className={styles.transparent_table_td}>
                {localeCurrencySymbol(data.market_data.total_volume[currency], currency)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CryptoSummarySection;

import { useCurrencyStore } from '@/stores/useCurrencyStore';
import { toUpperCoinSymbol } from '@/utils/crypto';
import styles from './CryptoConverterSection.module.scss';
import type { CoinsDetailRes } from '@/apis/coins';

interface CryptoConverterSectionProps {
  data: CoinsDetailRes;
}

/** 코인 <-> 선택한 통화 섹션 */
const CryptoConverterSection = ({ data }: CryptoConverterSectionProps) => {
  const currency = useCurrencyStore(state => state.currency);
  const symbol = toUpperCoinSymbol(data.symbol);

  return (
    <section className="contents_section">
      <h3 className="text-base-text text-title2-bold pb-[8px]">{symbol} 가격 계산</h3>
      <div className="flex flex-wrap gap-[8px]">
        <div className={styles.input_wrapper}>
          <input
            className={styles.input}
            type="text"
            id="cryptoCurrency"
            defaultValue={1}
            // value={cryptoCurrency}
            // onChange={onChangeInput}
          />
          <label htmlFor="cryptoCurrency" className={styles.input_label}>
            {symbol}
          </label>
        </div>
        <div className={styles.input_wrapper}>
          <input
            className={styles.input}
            type="text"
            id="currency"
            defaultValue={data.market_data.current_price[currency]}
            // value={cryptoCurrency}
            // onChange={onChangeInput}
          />
          <label htmlFor="currency" className={styles.input_label}>
            {currency.toUpperCase()}
          </label>
        </div>
      </div>
    </section>
  );
};

export default CryptoConverterSection;

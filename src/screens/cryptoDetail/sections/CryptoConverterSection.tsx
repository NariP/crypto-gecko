import { useEffect, useState } from 'react';
import Big from 'big.js';
import { type ZodError, z } from 'zod';
import TextInput from '@/components/TextInput.tsx';
import usePrevState from '@/hooks/usePrevState';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import { toUpperCoinSymbol } from '@/utils/crypto';
import { localeCurrency, localeSymbol } from '@/utils/localeCurrency';
import styles from './CryptoConverterSection.module.scss';
import type { CoinsDetailRes } from '@/apis/coins';

interface CryptoConverterSectionProps {
  data: CoinsDetailRes;
}

type InputKeys = 'cryptoCurrency' | 'currency';

const INITIAL_ERRORS = { cryptoCurrency: '', currency: '' };

/** 코인 <-> 선택한 통화 섹션 */
const CryptoConverterSection = ({ data }: CryptoConverterSectionProps) => {
  const currency = useCurrencyStore(state => state.currency);
  const symbol = toUpperCoinSymbol(data.symbol);
  const currentCurrencyPrice = data.market_data.current_price[currency];

  const [cryptoPrice, setCryptoPrice] = useState('1');
  const [currencyPrice, setCurrencyPrice] = useState(
    localeCurrency(currentCurrencyPrice, currency)
  );
  const [errors, setErrors] = useState<Record<InputKeys, string>>(INITIAL_ERRORS);

  const resetError = (name?: 'cryptoCurrency' | 'currency') => {
    setErrors(prev => (name ? { ...prev, [name]: '' } : INITIAL_ERRORS));
  };

  const updateError = (error: ZodError<string>, inputName: InputKeys) => {
    const message = error.flatten().formErrors[0];
    setErrors(prev => ({ ...prev, [inputName]: message }));
  };

  const prevCurrentCurrencyPrice = usePrevState(currentCurrencyPrice);
  useEffect(() => {
    // data 가 변경되어 currentCurrencyPrice 변경이 있는 경우에만 최신값 기준으로 value 세팅
    if (currentCurrencyPrice !== prevCurrentCurrencyPrice) {
      setCurrencyPrice(
        localeCurrency(
          parseFloat(covertCryptoToCurrency(cryptoPrice, currentCurrencyPrice)),
          currency
        )
      );
      resetError('currency');
    }
  }, [currentCurrencyPrice, cryptoPrice, currency, prevCurrentCurrencyPrice]);

  const onChangeCryptoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const validation = cryptoCurrencySchema.safeParse(value);
    if (!validation.success) {
      updateError(validation.error, 'cryptoCurrency');
      return;
    }

    setCryptoPrice(value);
    const currencyPrice =
      value === ''
        ? ''
        : localeCurrency(parseFloat(covertCryptoToCurrency(value, currentCurrencyPrice)), currency);
    setCurrencyPrice(currencyPrice);
    resetError();
  };

  const onChangeCurrencyHandelr = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: rawValue } = event.target;
    const value = rawValue.replace(/,/g, '');

    const currencyValidation = currencySchema.safeParse(value);
    if (!currencyValidation.success) {
      updateError(currencyValidation.error, 'currency');
      return;
    }

    if (currency === 'krw') {
      const krwValidation = krwSchema.safeParse(value);
      if (!krwValidation.success) {
        updateError(krwValidation.error, 'currency');
        return;
      }
    }

    setCurrencyPrice(value === '' ? '' : localeCurrency(parseFloat(value), currency));
    const cryptoPrice = value === '' ? '' : convertCurrencyToCrypto(value, currentCurrencyPrice);
    setCryptoPrice(cryptoPrice);
    resetError();
  };

  const onPasteCurrencyHandler = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const value = event.clipboardData.getData('text/plain');

    const currencyValidation = currencyPasteSchema.safeParse(value);
    if (!currencyValidation.success) {
      updateError(currencyValidation.error, 'currency');
      return;
    }

    if (currency === 'krw') {
      const krwValidation = krwSchema.safeParse(value);
      if (!krwValidation.success) {
        return;
      }
    }

    setCurrencyPrice(value === '' ? '' : localeCurrency(parseFloat(value), currency));
    const cryptoPrice = value === '' ? '' : convertCurrencyToCrypto(value, currentCurrencyPrice);
    setCryptoPrice(cryptoPrice);
    resetError();
  };

  return (
    <section className="contents_section">
      <h3 className="text-base-text text-title2-bold pb-[16px]">{symbol} 가격 계산</h3>
      <div className="flex flex-wrap gap-[8px]">
        <TextInput
          placeholder="숫자를 입력해주세요."
          id="cryptoCurrency"
          value={cryptoPrice}
          isError={!!errors.cryptoCurrency}
          helperText={errors.cryptoCurrency}
          endDecorator={
            <label htmlFor="cryptoCurrency" className={styles.input_label}>
              {symbol}
            </label>
          }
          onChange={onChangeCryptoHandler}
        />
        <TextInput
          id="currency"
          placeholder="숫자를 입력해주세요."
          value={currencyPrice}
          isError={!!errors.currency}
          helperText={errors.currency}
          startDecorator={
            <span className="pl-[4px] text-gray-500 text-label1-bold">
              {localeSymbol(currency)}
            </span>
          }
          endDecorator={
            <label htmlFor="currency" className={styles.input_label}>
              {currency.toUpperCase()}
            </label>
          }
          onChange={onChangeCurrencyHandelr}
          onPaste={onPasteCurrencyHandler}
          onKeyDown={e => {
            if (e.key === '.') {
              e.preventDefault();
            }
          }}
        />
      </div>
      <ul className="text-gray-600 bg-gray-100 text-label2-regular rounded-[4px] p-[8px] mt-[16px] md:mt-[8px]">
        <li className="text-inherit">
          * {symbol} 가격 입력은 숫자와 마침표를 포함한 최대 소수점 8자리의 실수형 숫자 형식만
          가능합니다.
        </li>
        <li className="text-inherit">* {currency.toUpperCase()} 가격 입력은 숫자만 가능합니다.</li>
        <li className="text-inherit">* KRW 의 경우 0으로 시작할 수 없습니다.</li>
      </ul>
    </section>
  );
};

const covertCryptoToCurrency = (crypto: string, coinPriceInCurrency: number) => {
  const bigCrypto = new Big(crypto);
  const bigCoinPriceInCurrency = new Big(coinPriceInCurrency);
  return bigCrypto.times(bigCoinPriceInCurrency).toFixed(2, 1);
};

const convertCurrencyToCrypto = (currentPrice: string, coinPriceInCurrency: number) => {
  const bigCurrentPrice = new Big(currentPrice);
  const bigCoinPriceInCurrency = new Big(coinPriceInCurrency);

  return bigCurrentPrice.div(bigCoinPriceInCurrency).toFixed(8, 1);
};

const cryptoCurrencySchema = z.string().refine(
  val => {
    // 숫자와 '.'만 입력 가능하며, 소수점은 최대 한 번만 허용, 소수점은 최대 8자리까지만 가능
    return /^\d*\.?\d{0,8}$/.test(val);
  },
  {
    message: '입력 가능한 형식을 확인해주세요.',
  }
);

const currencySchema = z.string().refine(
  val => {
    return /^\d*\.?\d*$/.test(val);
  },
  { message: '입력 가능한 형식을 확인해주세요.' }
);

const currencyPasteSchema = z.string().refine(
  val => {
    return /^\d+$/.test(val);
  },
  {
    message: '숫자만 붙여넣기 가능합니다.',
  }
);

const krwSchema = z.string().refine(
  val => {
    return !val.startsWith('0');
  },
  { message: 'KRW 는 0으로 시작할 수 없습니다.' }
);

export default CryptoConverterSection;

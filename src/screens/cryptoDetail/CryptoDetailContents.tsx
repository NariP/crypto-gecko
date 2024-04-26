import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import queries from '@/apis/queries';
import Bookmark from '@/components/Bookmark';
import CurrencyListBox from '@/components/ListBox/CurrencyListBox';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import type { Currency } from '@/@types/currency';

const CryptoDetailContents = () => {
  const { id } = useParams() as { id: string };
  const { data } = useSuspenseQuery(queries.coins.detail({ id, community_data: false }));
  const currency = useCurrencyStore(state => state.currency);

  const [cryptoCurrency, setCryptoCurrency] = useState('1');
  const [inputCurrency, setInputCurrency] = useState(`${data.market_data.current_price[currency]}`);

  const unit = UNIT[currency];
  const symbol = data.symbol.toUpperCase();
  const getLocalePrice = (price: number, locale = 'ko') => price.toLocaleString(locale);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;

    if (id === 'cryptoCurrency') {
      setCryptoCurrency(value);
    } else {
      setInputCurrency(value);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-y-sm">
      <section className="flex justify-between px-x-sm">
        <div className="flex">
          <Bookmark id={id} />
          <div className="flex">
            <img src={data.image.thumb} alt="bitcoin thumb" />
            <h2>
              {data.localization.ko} ({symbol})
            </h2>
          </div>
        </div>
        <CurrencyListBox />
      </section>

      <section className="flex justify-between px-x-sm">
        <table>
          <tbody>
            <tr>
              <td className="bg-gray-100">시가 총액 Rank</td>
              <td>Rank #{data.market_cap_rank}</td>
            </tr>
            <tr>
              <td className="bg-gray-100">웹사이트</td>
              <td>
                {data.links.homepage.filter(Boolean).map((link, idx) => {
                  return (
                    <a key={idx} href={link} target="_blank" rel="noreferrer">
                      {link}
                    </a>
                  );
                })}
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          <div>
            <div>
              <span>
                {unit} {getLocalePrice(data.market_data.current_price[currency])}
              </span>
              <span
                className={clsx(
                  data.market_data.price_change_percentage_24h_in_currency[currency] >= 0
                    ? 'text-trends-upward'
                    : 'text-trends-downward'
                )}
              >
                {data.market_data.price_change_percentage_24h_in_currency[currency]}%
              </span>
            </div>
            <div>
              <span>{data.market_data.current_price.btc} BTC</span>
              <span
                className={clsx(
                  data.market_data.price_change_percentage_24h >= 0
                    ? 'text-trends-upward'
                    : 'text-trends-downward'
                )}
              >
                {data.market_data.price_change_percentage_24h}%
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <div>
              <div>시가 총액</div>
              <div>
                {unit}
                {getLocalePrice(data.market_data.market_cap[currency])}
              </div>
            </div>
            <div>
              <div>24시간 거래대금</div>
              <div>
                {unit}
                {getLocalePrice(data.market_data.total_volume[currency])}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-300 px-x-sm">
        <h3>가격 계산</h3>
        <div className="flex">
          <div>
            <label className="bg-gray-100" htmlFor="crypto">
              {symbol}
            </label>
            <input
              type="text"
              id="cryptoCurrency"
              value={cryptoCurrency}
              onChange={onChangeInput}
            />
          </div>
          <span>&lt; - &gt;</span>
          <div>
            <label className="bg-gray-100" htmlFor="currency">
              {currency.toUpperCase()}
            </label>
            <input type="text" id="inputCurrency" value={inputCurrency} onChange={onChangeInput} />
          </div>
        </div>
      </section>
      {(data.description.ko || data.description.en) && (
        <section className="px-x-sm">
          <details>
            <summary>설명보기</summary>
            <p>{data.description.ko || data.description.en}</p>
          </details>
        </section>
      )}
    </div>
  );
};

const UNIT: Record<Currency, string> = {
  krw: '₩',
  usd: '$',
  btc: '',
};

export default CryptoDetailContents;

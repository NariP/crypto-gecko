import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Disclosure } from '@headlessui/react';
import { useParams } from 'react-router-dom';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import queries from '@/apis/queries';
import Bookmark from '@/components/Bookmark';
import CurrencyListBox from '@/components/ListBox/CurrencyListBox';
import Page from '@/components/Page';
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
    <Page>
      <section className="flex flex-wrap gap-[8px] justify-between items-center px-x-sm">
        <div className="flex gap-[8px] items-center">
          <Bookmark id={id} />
          <div className="flex gap-[4px] items-center">
            <img
              className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] flex-shrink-0 flex-grow-0"
              src={data.image.thumb}
              alt={data.localization.ko}
            />
            <h2 className="text-body1-bold text-gray-900 md:text-title2-bold">
              {data.localization.ko}({symbol})
            </h2>
          </div>
        </div>
        <CurrencyListBox />
      </section>

      <section className="flex flex-wrap gap-[16px] justify-between px-x-sm">
        <table className="flex-1">
          <tbody className="text-gray-900">
            <tr>
              <td className="bg-gray-100 p-[8px] text-label1-bold md:text-body1-bold">
                시가 총액 Rank
              </td>
              <td className="p-[8px] text-label1-regular md:text-body1-regular">
                Rank #{data.market_cap_rank}
              </td>
            </tr>
            <tr>
              <td className="bg-gray-100 text-label1-bold md:text-body1-bold p-[8px]">웹사이트</td>
              <td className="p-[8px] text-label1-regular md:text-body1-regular">
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

        <div className="flex-1 md:text-right flex flex-col gap-[12px]">
          <div>
            <div className="flex gap-[4px] md:justify-end">
              <span className="text-gray-900 text-body1-bold">
                {unit} {getLocalePrice(data.market_data.current_price[currency])}
              </span>
              <span
                className={clsx(
                  'text-body1-regular',
                  data.market_data.price_change_percentage_24h_in_currency[currency] >= 0
                    ? 'text-trends-upward'
                    : 'text-trends-downward'
                )}
              >
                {data.market_data.price_change_percentage_24h_in_currency[currency]}%
              </span>
            </div>
            <div className="flex gap-[4px] md:justify-end">
              <span className="text-gray-500 text-body1-bold">
                {data.market_data.current_price.btc} BTC
              </span>
              <span
                className={clsx(
                  'text-body1-regular',
                  data.market_data.price_change_percentage_24h >= 0
                    ? 'text-trends-upward'
                    : 'text-trends-downward'
                )}
              >
                {data.market_data.price_change_percentage_24h}%
              </span>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <div className="flex-1">
              <div className="text-gray-900 text-label1-bold">시가 총액</div>
              <div className="text-gray-900 text-body1-bold">
                {unit}
                {getLocalePrice(data.market_data.market_cap[currency])}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-gray-900 text-label1-bold">24시간 거래대금</div>
              <div className="text-gray-900 text-body1-bold">
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
        <section className="px-x-sm pb-y-sm md:pb-y-lg">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between gap-[4px] m-auto rounded-lg bg-base-white text-gray-600 hover:text-base-primary hover:bg-gray-100 px-4 py-2 text-left shadow-md shadow-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <span className="text-inherit text-label1-bold md:text-body1-bold">설명보기</span>
                  <ChevronUpIcon
                    className={clsx(
                      'h-5 w-5 fill-gray-600 transition-transform',
                      open && 'rotate-180 transform'
                    )}
                  />
                </Disclosure.Button>
                <Disclosure.Panel
                  as="p"
                  className="mt-4 px-4 pb-2 pt-4 indent-2 text-body1-regular text-gray-500 border-t bordert-gray-300"
                >
                  {data.description.ko || data.description.en}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </section>
      )}
    </Page>
  );
};

const UNIT: Record<Currency, string> = {
  krw: '₩',
  usd: '$',
  btc: '',
};

export default CryptoDetailContents;

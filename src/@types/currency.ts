export type Currency = 'krw' | 'usd' | 'btc';

export type NumberInCurrency = {
  [key in Currency]: number;
};

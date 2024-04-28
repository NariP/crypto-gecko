export type Currency = 'krw' | 'usd';

export type NumberInCurrency = {
  [key in Currency]: number;
};

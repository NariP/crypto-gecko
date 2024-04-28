export type Currency = 'krw' | 'usd';

export type ResCurrency = Currency | 'btc';

export type NumberInCurrency = {
  [key in ResCurrency]: number;
};

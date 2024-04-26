/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type AssetPlatformsListData = any;

export interface AssetPlatformsListParams {
  /**
   * apply relevant filters to results
   *  valid values: "nft" (asset_platform nft-support)
   */
  filter?: string;
}

export type CategoriesListData = any;

export type CategoriesListListData = any;

export interface CategoriesListParams {
  /** valid values: <b>market_cap_desc (default), market_cap_asc, name_desc, name_asc, market_cap_change_24h_desc and market_cap_change_24h_asc</b> */
  order?: string;
}

export type CoinsDetailData = any;

export interface CoinsDetailParams {
  /** Include community_data data (true/false) <b>[default: true]</b> */
  community_data?: boolean;
  /** Include developer_data data (true/false) <b>[default: true]</b> */
  developer_data?: boolean;
  /** pass the coin id (can be obtained from /coins) eg. bitcoin */
  id: string;
  /** Include all localized languages in response (true/false) <b>[default: true]</b> */
  localization?: string;
  /** Include market_data (true/false) <b>[default: true]</b> */
  market_data?: boolean;
  /** Include sparkline 7 days data (eg. true, false) <b>[default: false]</b> */
  sparkline?: boolean;
  /** Include tickers data (true/false) <b>[default: true]</b> */
  tickers?: boolean;
}

export type ContractDetailData = any;

export type ContractDetailResult = any;

export type ContractMarketChartDetailData = any;

export interface ContractMarketChartDetailParams {
  /** Token's contract address */
  contractAddress: string;
  /** Data up to number of days ago (eg. 1,14,30,max) */
  days: string;
  /** The id of the platform issuing tokens (See asset_platforms endpoint for list of options) */
  id: string;
  /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
  precision?: string;
  /** The target currency of market data (usd, eur, jpy, etc.) */
  vs_currency: string;
}

export type ContractMarketChartRangeDetailData = any;

export interface ContractMarketChartRangeDetailParams {
  /** Token's contract address */
  contractAddress: string;
  /** From date in UNIX Timestamp (eg. 1392577232) */
  from: string;
  /** The id of the platform issuing tokens (See asset_platforms endpoint for list of options) */
  id: string;
  /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
  precision?: string;
  /** To date in UNIX Timestamp (eg. 1422577232) */
  to: string;
  /** The target currency of market data (usd, eur, jpy, etc.) */
  vs_currency: string;
}

export type DerivativesListData = any;

export type ExchangeRatesListData = any;

export type ExchangesDetailData = any;

export interface ExchangesDetailParams1 {
  /** pass the exchange id (can be obtained from derivatives/exchanges/list) eg. bitmex */
  id: string;
  /** ['all', 'unexpired'] - expired to show unexpired tickers, all to list all tickers, leave blank to omit tickers data in response */
  include_tickers?: string;
}

export type ExchangesDetailResult = any;

export type ExchangesListData = any;

export type ExchangesListListData = any;

export interface ExchangesListParams {
  /** page through results */
  page?: string;
  /**
   * Valid values: 1...250
   * Total results per page
   * Default value:: 100
   */
  per_page?: number;
}

export interface ExchangesListParams2 {
  /** order results using following params name_asc，name_desc，open_interest_btc_asc，open_interest_btc_desc，trade_volume_24h_btc_asc，trade_volume_24h_btc_desc */
  order?: string;
  /** Page through results */
  page?: number;
  /** Total results per page */
  per_page?: number;
}

export type ExchangesListResult = any;

export type GlobalListData = any;

export type HistoryDetailData = any;

export interface HistoryDetailParams {
  /** The date of data snapshot in dd-mm-yyyy eg. 30-12-2022 */
  date: string;
  /** pass the coin id (can be obtained from /coins) eg. bitcoin */
  id: string;
  /** Set to false to exclude localized languages in response */
  localization?: string;
}

export type ListListData = any;

export type ListListOutput = any;

export interface ListListParams {
  /**
   * flag to include platform contract addresses (eg. 0x.... for Ethereum based tokens).
   *  valid values: true, false
   */
  include_platform?: boolean;
}

export interface ListListParams3 {
  /** The id of the platform issuing tokens (See asset_platforms endpoint for list of options) */
  asset_platform_id?: string;
  /** valid values: <b>h24_volume_native_asc, h24_volume_native_desc, floor_price_native_asc, floor_price_native_desc, market_cap_native_asc, market_cap_native_desc, market_cap_usd_asc, market_cap_usd_desc</b> */
  order?: string;
  /**
   * Page through results
   * @example 1
   */
  page?: number;
  /**
   * Valid values: 1..250<br>Total results per page
   * @example 100
   */
  per_page?: number;
}

export type ListListResult = any;

export type MarketChartDetailData = any;

export interface MarketChartDetailParams {
  /** Data up to number of days ago (eg. 1,14,30,max) */
  days: string;
  /** pass the coin id (can be obtained from /coins) eg. bitcoin */
  id: string;
  /** Data interval. Possible value: daily */
  interval?: string;
  /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
  precision?: string;
  /** The target currency of market data (usd, eur, jpy, etc.) */
  vs_currency: string;
}

export type MarketChartRangeDetailData = any;

export interface MarketChartRangeDetailParams {
  /** From date in UNIX Timestamp (eg. 1392577232) */
  from: string;
  /** pass the coin id (can be obtained from /coins) eg. bitcoin */
  id: string;
  /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
  precision?: string;
  /** To date in UNIX Timestamp (eg. 1422577232) */
  to: string;
  /** The target currency of market data (usd, eur, jpy, etc.) */
  vs_currency: string;
}

export type MarketsListData = any;

export interface MarketsListParams {
  /** filter by coin category. Refer to /coin/categories/list */
  category?: string;
  /** The ids of the coin, comma separated crytocurrency symbols (base). refers to `/coins/list`. */
  ids?: string;
  /**
   * valid values: <b>ar, bg, cs, da, de, el, en, es, fi, fr, he, hi, hr, hu, id, it, ja, ko, lt, nl, no, pl, pt, ro, ru, sk, sl, sv, th, tr, uk, vi, zh, zh-tw</b>
   * @default "en"
   */
  locale?: string;
  /**
   * valid values: <b>market_cap_asc, market_cap_desc, volume_asc, volume_desc, id_asc, id_desc</b>
   * sort results by field.
   * @default "market_cap_desc"
   */
  order?: string;
  /**
   * Page through results
   * @default 1
   */
  page?: number;
  /**
   * valid values: 1..250
   *  Total results per page
   * @default 100
   */
  per_page?: number;
  /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
  precision?: string;
  /** Include price change percentage in <b>1h, 24h, 7d, 14d, 30d, 200d, 1y</b> (eg. '`1h,24h,7d`' comma-separated, invalid values will be discarded) */
  price_change_percentage?: string;
  /**
   * Include sparkline 7 days data (eg. true, false)
   * @default false
   */
  sparkline?: boolean;
  /** The target currency of market data (usd, eur, jpy, etc.) */
  vs_currency: string;
}

export type NftsDetailData = any;

export type OhlcDetailData = number[];

export interface OhlcDetailParams {
  /**  Data up to number of days ago (1/7/14/30/90/180/365/max) */
  days: string;
  /** pass the coin id (can be obtained from /coins/list) eg. bitcoin */
  id: string;
  /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
  precision?: string;
  /** The target currency of market data (usd, eur, jpy, etc.) */
  vs_currency: string;
}

export type PingListData = any;

export type PriceListData = any;

export interface PriceListParams {
  /** <b>true/false</b> to include 24hr_change, <b>default: false</b> */
  include_24hr_change?: string;
  /** <b>true/false</b> to include 24hr_vol, <b>default: false</b> */
  include_24hr_vol?: string;
  /**
   * id of coins, comma-separated if querying more than 1 coin
   * *refers to <b>`coins/list`</b>
   */
  ids: string;
  /** <b>true/false</b> to include last_updated_at of price, <b>default: false</b> */
  include_last_updated_at?: string;
  /** <b>true/false</b> to include market_cap, <b>default: false</b> */
  include_market_cap?: string;
  /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
  precision?: string;
  /**
   * vs_currency of coins, comma-separated if querying more than 1 vs_currency
   * *refers to <b>`simple/supported_vs_currencies`</b>
   */
  vs_currencies: string;
}

export type PublicTreasuryDetailData = any;

export interface SearchListData {
  categories?: {
    item?: {
      id?: number;
      name?: string;
    };
  };
  coins?: {
    item?: {
      id?: string;
      market_cap_rank?: number;
      name?: string;
      symbol?: string;
    };
  };
  exchanges?: {
    item?: {
      id?: string;
      market_type?: string;
      name?: string;
    };
  };
}

export interface SearchListParams {
  /** Search string */
  query: string;
}

export type SupportedVsCurrenciesListData = any;

export type TickersDetailData = any;

export interface TickersDetailParams {
  /** flag to show 2% orderbook depth. i.e., cost_to_move_up_usd and cost_to_move_down_usd. valid values: true, false */
  depth?: string;
  /** filter results by exchange_ids (ref: v3/exchanges/list) */
  exchange_ids?: string;
  /** pass the coin id (can be obtained from /coins/list) eg. bitcoin */
  id: string;
  /** flag to show exchange_logo. valid values: true, false */
  include_exchange_logo?: string;
  /** valid values: <b>trust_score_desc (default), trust_score_asc and volume_desc</b> */
  order?: string;
  /** Page through results */
  page?: number;
}

export interface TickersDetailParams2 {
  /** filter tickers by coin_ids (ref: v3/coins/list) */
  coin_ids?: string;
  /** flag to show 2% orderbook depth. i.e., cost_to_move_up_usd and cost_to_move_down_usd. valid values: true, false */
  depth?: string;
  /** pass the exchange id (can be obtained from /exchanges/list) eg. binance */
  id: string;
  /** flag to show exchange_logo. valid values: true, false */
  include_exchange_logo?: string;
  /** valid values: <b>trust_score_desc (default), trust_score_asc and volume_desc</b> */
  order?: string;
  /** Page through results */
  page?: number;
}

export type TickersDetailResult = any;

export type TokenPriceDetailData = any;

export interface TokenPriceDetailParams {
  /** <b>true/false</b> to include 24hr_change, <b>default: false</b> */
  include_24hr_change?: string;
  /** <b>true/false</b> to include 24hr_vol, <b>default: false</b> */
  include_24hr_vol?: string;
  /** The contract address of tokens, comma separated */
  contract_addresses: string;
  /** The id of the platform issuing tokens (See asset_platforms endpoint for list of options) */
  id: string;
  /** <b>true/false</b> to include last_updated_at of price, <b>default: false</b> */
  include_last_updated_at?: string;
  /** <b>true/false</b> to include market_cap, <b>default: false</b> */
  include_market_cap?: string;
  /** <b>full</b> or any value between 0 - 18 to specify decimal place for currency price value */
  precision?: string;
  /**
   * vs_currency of coins, comma-separated if querying more than 1 vs_currency
   * *refers to <b>`simple/supported_vs_currencies`</b>
   */
  vs_currencies: string;
}

export type TrendingListData = any;

export type VolumeChartDetailData = any;

export interface VolumeChartDetailParams {
  /**  Data up to number of days ago (1/7/14/30/90/180/365) */
  days: number;
  /** pass the exchange id (can be obtained from /exchanges/list) eg. binance */
  id: string;
}

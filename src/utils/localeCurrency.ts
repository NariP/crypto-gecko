const createNumberFormat = (options?: Omit<Intl.NumberFormatOptions, 'maximumFractionDigits'>) => {
  return new Intl.NumberFormat(navigator.language || 'ko-KR', {
    maximumFractionDigits: 2,
    ...options,
  });
};

/** 통화 심볼 표시, 소숫점 두자리까지만 표시 */
export const localeCurrencySymbol = (price: number, currency = 'krw') => {
  const formatter = createNumberFormat({
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    currency: currency.toUpperCase(),
  });

  const safePrice = price ?? 0;
  return formatter.format(safePrice);
};

/** 숫자만 표시 */
export const localeCurrency = (price: number, currency = 'krw') => {
  const formatter = createNumberFormat({
    currency: currency.toUpperCase(),
  });

  const safePrice = price ?? 0;
  return formatter.format(safePrice);
};

/** 통화 심볼만 표시 */
export const localeSymbol = (currency = 'krw') => {
  const formatter = createNumberFormat({
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    currency: currency.toUpperCase(),
  });

  const parts = formatter.formatToParts();
  const currencyPart = parts.find(part => part.type === 'currency');
  return currencyPart ? currencyPart.value : '';
};

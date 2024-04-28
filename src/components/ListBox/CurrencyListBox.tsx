import { Currency } from '@/@types/currency';
import ListBox from '@/components/ListBox/ListBox';
import { useCurrencyStore } from '@/stores/useCurrencyStore';

interface CurrencyOption {
  id: Currency;
  label: string;
}

const CurrencyListBox = ({ className }: { className?: string }) => {
  const currency = useCurrencyStore(state => state.currency);
  const setCurrency = useCurrencyStore(state => state.setCurrency);

  return (
    <ListBox
      className={className}
      selected={OPTIONS.find(o => o.id === currency) as CurrencyOption}
      options={OPTIONS}
      onChange={(option: CurrencyOption) => setCurrency(option.id)}
    />
  );
};

const OPTIONS: CurrencyOption[] = [
  { id: 'krw', label: 'KRW 보기' },
  { id: 'usd', label: 'USD 보기' },
];

export default CurrencyListBox;

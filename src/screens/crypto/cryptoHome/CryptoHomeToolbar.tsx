import ListBox from '@/components/ListBox';
import CurrencyListBox from '@/components/ListBox/CurrencyListBox';
import { useCryptoHomeToolbarStore } from '@/stores/useCryptoHomeToolbarStore';

interface DisplayOption {
  id: 'all' | 'bookmark';
  label: string;
}

interface LimitOption {
  id: '10' | '30' | '50';
  label: string;
}

const CryptoHomeToolbar = () => {
  const display = useCryptoHomeToolbarStore(state => state.display);
  const limit = useCryptoHomeToolbarStore(state => state.limit);
  const setToolbarOption = useCryptoHomeToolbarStore(state => state.setToolbarOptions);

  return (
    <section className="contents_section flex flex-wrap gap-2">
      <ListBox
        selected={DISPLAY_OPTIONS.find(o => o.id === display) as DisplayOption}
        options={DISPLAY_OPTIONS}
        onChange={option => {
          setToolbarOption({ display: option.id });
        }}
      />
      <CurrencyListBox />
      <ListBox
        selected={LIMIT_OPTIONS.find(o => o.id === limit) as LimitOption}
        options={LIMIT_OPTIONS}
        onChange={option => {
          setToolbarOption({ limit: option.id });
        }}
      />
    </section>
  );
};

const DISPLAY_OPTIONS: DisplayOption[] = [
  { id: 'all', label: '전체보기' },
  { id: 'bookmark', label: '북마크보기' },
];

const LIMIT_OPTIONS: LimitOption[] = [
  { id: '10', label: '10개 보기' },
  { id: '30', label: '30개 보기' },
  { id: '50', label: '50개 보기' },
];

export default CryptoHomeToolbar;

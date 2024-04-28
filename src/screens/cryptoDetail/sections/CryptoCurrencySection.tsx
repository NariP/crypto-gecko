import { useParams } from 'react-router-dom';
import Bookmark from '@/components/Bookmark';
import CurrencyListBox from '@/components/ListBox/CurrencyListBox';
import useBookmarks, { useBookmarksData } from '@/hooks/useBookmarks';
import { toUpperCoinSymbol } from '@/utils/crypto';
import type { CoinsDetailRes } from '@/apis/coins';

interface CryptoCurrencySectionProps {
  data: CoinsDetailRes;
}

/** 북마크 버튼, 코인 local 이름, 심볼, 통화 SelectBox 를 표시하는 섹션  */
const CryptoCurrencySection = ({ data }: CryptoCurrencySectionProps) => {
  const { id } = useParams() as { id: string };
  const { toggleOff, toggleOn } = useBookmarks();
  const { bookMarksSet } = useBookmarksData();

  return (
    <section className="contents_section flex flex-col md:flex-row flex-wrap justify-between items-center">
      <div className="flex flex-1 w-full gap-[8px] justify-start">
        <Bookmark id={id} bookmarks={bookMarksSet} toggleOff={toggleOff} toggleOn={toggleOn} />
        <div className="flex gap-[4px] items-center">
          <img
            className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] flex-shrink-0 flex-grow-0"
            src={data.image.thumb}
            alt={data.localization.ko}
          />
          <h2 className="truncate text-title2-bold text-base-text">
            {data.localization.ko}({toUpperCoinSymbol(data.symbol)})
          </h2>
        </div>
      </div>
      <CurrencyListBox className="w-full md:w-[200px]" />
    </section>
  );
};

export default CryptoCurrencySection;

import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import type { CoinsDetailRes } from '@/apis/coins';

interface CryptoDescriptionSectionProps {
  data: CoinsDetailRes;
}

/** 코인 설명을 표시하는 섹션 */
const CryptoDescriptionSection = ({ data }: CryptoDescriptionSectionProps) => {
  const description = data.description.ko || data.description.en;
  if (!description) {
    return null;
  }

  return (
    <section className="contents_section">
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
              {description}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </section>
  );
};

export default CryptoDescriptionSection;

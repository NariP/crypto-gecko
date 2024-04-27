import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import queries from '@/apis/queries';
import Page from '@/components/Page';
import CryptoConverterSection from '@/screens/cryptoDetail/sections/CryptoConverterSection';
import CryptoCurrencySection from '@/screens/cryptoDetail/sections/CryptoCurrencySection';
import CryptoDescriptionSection from '@/screens/cryptoDetail/sections/CryptoDescriptionSection';
import CryptoSummarySection from '@/screens/cryptoDetail/sections/CryptoSummarySection';

const CryptoDetailContents = () => {
  const { id } = useParams() as { id: string };
  const { data } = useSuspenseQuery(queries.coins.detail({ id, community_data: false }));

  return (
    <Page>
      <CryptoCurrencySection data={data} />
      <CryptoSummarySection data={data} />
      <CryptoConverterSection data={data} />
      <CryptoDescriptionSection data={data} />
    </Page>
  );
};

export default CryptoDetailContents;

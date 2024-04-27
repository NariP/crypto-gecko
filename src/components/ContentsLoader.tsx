import Page from '@/components/Page';
import Spinner from '@/components/Spinner';

const ContentsLoader = () => {
  return (
    <Page>
      <Spinner className="my-[60px] md:my-[68px]" />
    </Page>
  );
};

export default ContentsLoader;

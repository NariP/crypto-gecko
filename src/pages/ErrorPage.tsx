import { useRouteError } from 'react-router-dom';
import Page from '@/components/Page';
import TopNav from '@/components/TopNav';
import { ApiError } from '@/libs/axios/axios';

const ErrorPage = () => {
  const error = useRouteError() as Error | ApiError;
  const isApiError = error instanceof ApiError;
  console.log(isApiError);

  return (
    <>
      <TopNav>오류 발생</TopNav>
      <Page>앗! 오류가 발생했어요</Page>
    </>
  );
};

export default ErrorPage;

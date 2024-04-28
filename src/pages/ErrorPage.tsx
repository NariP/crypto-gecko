import { useNavigate, useRouteError } from 'react-router-dom';
import Page from '@/components/Page';
import TopNav from '@/components/TopNav';
import { ApiError } from '@/libs/axios/axios';

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError() as Error | ApiError;
  const isApiError = error instanceof ApiError;

  return (
    <>
      <TopNav>오류 발생</TopNav>
      <Page>
        <section className="contents_section">
          <h2 className="text-display2-bold text-error-default py-[32px]">
            앗! {isApiError ? 'API' : 'JS'} 오류가 발생했어요
          </h2>
          {isApiError ? (
            <p className="px-[8px] py-[12px] rounded-[4px] bg-error-background text-body1-regular text-error-default">
              [{error.code}]: {error.message}
            </p>
          ) : (
            <p className="px-[8px] py-[12px] rounded-[4px] bg-gray-100 text-body1-regular">
              [{error.name}]: {error.message || ''}
            </p>
          )}
          <button
            type="button"
            className="my-[8px] bg-base-primary rounded-[8px] text-base-white text-body1-bold px-[12px] py-[8px]"
            onClick={() => {
              window.location.reload();
            }}
          >
            새로고침하기
          </button>
          <button
            type="button"
            className="my-[8px] ml-[8px] bg-base-white rounded-[8px] border border-base-primary text-base-primary text-body1-bold px-[12px] py-[8px]"
            onClick={() => {
              navigate(-1);
            }}
          >
            뒤로가기
          </button>
        </section>
      </Page>
    </>
  );
};

export default ErrorPage;

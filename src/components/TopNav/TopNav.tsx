import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

const TopNav = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const navigate = useNavigate();

  return (
    <header
      className={clsx(
        'bg-base-white border border-b-gray-300 px-x-sm md:px-x-lg flex items-center gap-2',
        className
      )}
    >
      <button
        className="w-fit h-fit p-2"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ChevronLeftIcon className="h-6 w-6 fill-base-text" aria-hidden="true" />
      </button>
      <h1 className="flex-1 text-title2-bold py-2 md:py-4">{children}</h1>
    </header>
  );
};

export default TopNav;

import clsx from 'clsx';

const TopNav = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <header
      className={clsx('bg-base-white border border-b-gray-300 px-x-sm md:px-x-lg', className)}
    >
      <h1 className="text-title2-bold py-2 md:py-4">{children}</h1>
    </header>
  );
};

export default TopNav;

import clsx from 'clsx';

const Page = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={clsx('bg-base-white w-full mt-y-sm md:mt-y-lg flex justify-center', className)}>
      <div className="max-w-[1200px] w-full flex flex-col gap-y-sm md:gap-y-lg">{children}</div>
    </div>
  );
};

export default Page;

import clsx from 'clsx';

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        'animate-spin bg-transparent border-gray-200 border-4 border-t-base-primary rounded-[50%] m-auto w-[24px] h-[24px] md:w-[48px] md:h-[48px]',
        className
      )}
    />
  );
};

export default Spinner;

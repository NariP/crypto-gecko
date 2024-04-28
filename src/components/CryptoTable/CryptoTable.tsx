import clsx from 'clsx';
import CryptoTableBody, {
  CryptoTableRow,
  CryptoTableRowNoData,
} from '@/components/CryptoTable/CryptoTableBody';
import CryptoTableHeader from '@/components/CryptoTable/CryptoTableHeader';

const CryptoTableRoot = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <table className={clsx('border-collapse', className)}>{children}</table>;
};

const CryptoTable = Object.assign(CryptoTableRoot, {
  Header: CryptoTableHeader,
  Body: CryptoTableBody,
  RowNoData: CryptoTableRowNoData,
  Row: CryptoTableRow,
});

export default CryptoTable;

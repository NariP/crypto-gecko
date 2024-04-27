import CryptoTableBody, {
  CryptoTableRow,
  CryptoTableRowNoData,
} from '@/components/CryptoTable/CryptoTableBody';
import CryptoTableHeader from '@/components/CryptoTable/CryptoTableHeader';

const CryptoTableRoot = ({ children }: { children: React.ReactNode }) => {
  return <table>{children}</table>;
};

const CryptoTable = Object.assign(CryptoTableRoot, {
  Header: CryptoTableHeader,
  Body: CryptoTableBody,
  RowNoData: CryptoTableRowNoData,
  Row: CryptoTableRow,
});

export default CryptoTable;

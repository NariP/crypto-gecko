const CryptoTableHeader = ({ className }: { className?: string }) => {
  return (
    <thead className={className}>
      <tr className="border-b border-b-gray-300 [&>th]:p-[8px] [&>th]:text-gray-700 [&>th]:text-body1-bold">
        <th />
        <th>자산</th>
        <th />
        <th>Price</th>
        <th>1H</th>
        <th>24H</th>
        <th>7D</th>
        <th>24H Volume</th>
      </tr>
    </thead>
  );
};

export default CryptoTableHeader;

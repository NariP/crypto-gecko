/**
 * 심볼을 대문자로 변경하는 함수
 * - 공용으로 뺀 이유: 심볼은 페이지 내에서 표시될 때 대문자만 사용한다고 가정했기 때문
 * */
export const toUpperCoinSymbol = (symbol: string) => symbol.toUpperCase();

export const cryptoPercentage = (percentage: number) => {
  return parseFloat(percentage.toFixed(1).toString()).toFixed(1);
};

/** percentage 값에 따라 컬러 변경 반올림한 경우는 어쩌지 */
export const cryptoPercentageColor = (percentage: number) => {
  if (percentage > 0) {
    return 'text-trends-upward';
  }

  if (percentage < 0) {
    return 'text-trends-downward';
  }

  return 'text-gray-600';
};

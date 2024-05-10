import RawBig, { type BigSource } from 'big.js';

type ResSafeBig =
  | { isSuccess: true; bigNum: RawBig.Big; value: BigSource }
  | { isSuccess: false; value: BigSource; fallback: string | number };

interface IBig {
  (value: BigSource): {
    safeBig(fallback: string | number): ResSafeBig;
    big: () => RawBig.Big;
  };
}

const Big: IBig = (value: BigSource) => {
  return {
    // bigNumber 생성자 생성 오류 발생시 인스턴스를 생성하지 않는다.
    safeBig(fallback: string | number) {
      try {
        const bigNum = new RawBig(value);
        return { isSuccess: true, bigNum, value };
      } catch (e) {
        return { isSuccess: false, fallback, value };
      }
    },
    big() {
      return new RawBig(value);
    },
  };
};

export default Big;

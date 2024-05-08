# Title

### Version
- node: v20.11.1
- pnpm: v9.0.6

### Start (꼭 읽어주세요!!!!)
```
# env 파일 추가 (.env.example 파일 참고)

# install
pnpm i

# devserver start
pnpm dev
```

http://localhost:3000/


### 프로젝트 구조
- 프로젝트에 사용: Vite, React, ts
- UI: tailwind, headlessui, clsx, scss
- 클라이언트 전역 상태관리: zustand
- api 관련: axios, react-query, query-key-factory, qs
- 포멧팅, 린팅: eslint, prettier
- 유틸성: lodash-es, big.js(소숫점 연산), zod(validation), ts-pattern(필요할 것 같아서 설치했는데 삭제 못함)

**북마크**
- msw 로 모킹하여 진행
코인API
- gecko open api 사용, api limit 이슈로 데모키 발급
- 타입은 swagger 기준으로 자동생성 함

**폴더 구조**
<img style="display: block;" width="185" alt="image" src="https://github.com/NariP/crypto-gecko/assets/23569208/bd88e144-82e5-47df-9476-c64759a8fa81">

- @types: 사용하는 타입들
- apis: api 코드 모음
- components: 공용컴포넌트
- constants: 상수값 모음
- generator: 타입 생성 스크립트 (루트에서 package.json 스크립트로만 실행해야함, 직접 실행X)
- hooks: 커스텀훅
- libs: 라이브러리 래핑
- mocks: 모킹 파일
- pages: 페이지들
- screens: 페이지 의존성 있는 컴포넌트들
- stores: zustand store
- utils: 유틸 함수들

**페이지 구조**
- Page > contents(페이지를 구성하는 api 데이터 사용, 로더 표시) > section
- GET 에러 발생 > 글로벌 에러 UI 표시 (기본 설정)
- Mutation 에러 발생 > mutation 사용처에서 처리 또는 에러 토스트 (기본 설정)
- JS 에러 발생 > 글로벌 에러 UI 표시

**가격계산 부분**
- 암호화폐 부분 인풋에 0을 넣으면 krw 여도 0이 입력됨
- 대신 krw 인 경우 인풋에 0 입력 안됨

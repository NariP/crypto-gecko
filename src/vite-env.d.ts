/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 다른 환경 변수들에 대한 타입 정의... */
  readonly VITE_GECKO_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

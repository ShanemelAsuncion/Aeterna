/// <reference types="vite/client" />

declare module "*.css" {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_RESEND_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

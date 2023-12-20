/// <reference types="vite/client" />
declare module '*.vue' {
  import { Component } from 'vue'
  const component: Component
  export default component
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 环境变量 TypeScript的智能提示
interface ImportMetaEnv {
  VITE_APP_TITLE: string
  VITE_APP_PORT: string
  VITE_APP_BASE_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  _AMapSecurityConfig: {
    securityJsCode: string
  }
  QC: {
    Login: {
      check(): boolean
      getMe(cb: (openId: string) => void): void
    }
  }
}

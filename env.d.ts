/// <reference types="vite/client" />

interface Window {
  onLoadingEnd: () => void
  BUILD_TIME: Date
}

/** 构建时间 */
declare const BUILD_TIME: number

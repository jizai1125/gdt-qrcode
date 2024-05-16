export interface QRCodeInst {
  config: QRCodeConfig
  dom: HTMLElement
  domClassName: string
  iframe: HTMLIFrameElement | undefined
  url: string | undefined
  render: () => void
  update: (config?: QRCodeConfig) => void
  updateUrl: (url?: string) => void
  updateStyle: (config?: QRCodeStyleConfig) => void
  messageHandler: (event: MessageEvent) => void
}
export interface QRCodeConfig {
  // 应用标识
  clientId?: string
  // 回调地址
  redirectUri?: string
  // 扫码登录域名
  domain?: string
  // 扫码登录完整地址
  url?: string | ((config: QRCodeConfig) => string)
  // iframe 宽
  width?: number | string
  // iframe 高
  height?: number | string
  // 元素单独占一行，display: block
  blockLine?: boolean
  // 是否展示 logo
  showLogo?: boolean
  // 只展示二维码
  onlyShowCode?: boolean
  // 扫码登录成功回调，拿到临时授权码 code
  onScanned?: (code: string, data: object) => void
}

export type QRCodeStyleConfig = Omit<QRCodeConfig, 'clientId' | 'redirectUri' | 'url'>
export type InitQRCodeConfig = MakeRequired<QRCodeConfig, 'clientId' | 'redirectUri'>

type MakeRequired<T, K extends keyof T = never> = {
  [P in K]-?: T[P]
} & {
  [P in keyof Omit<T, K>]: T[P]
}

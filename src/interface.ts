export interface QRCodeInst {
  dom: HTMLElement | undefined
  domClassName: string
  iframe: HTMLIFrameElement | undefined
  url: string | undefined
  options: QRCodeOptions
  render: () => void
  update: (options?: QRCodeOptions) => void
  updateUrl: (url?: string) => void
  updateStyle: (options?: QRCodeOptions) => void
  destroy: () => void
}
export interface QRCodeOptions {
  // 应用标识
  clientId?: string
  // 回调地址
  redirectUri?: string
  // 扫码登录域名
  domain?: string
  // 扫码登录完整地址
  url?: string | ((options: QRCodeOptions) => string)
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

export type QRCodeStyleOptions = Omit<QRCodeOptions, 'clientId' | 'redirectUri' | 'url'>
export type InitQRCodeOptions = MakeRequired<QRCodeOptions, 'clientId' | 'redirectUri'>

type MakeRequired<T, K extends keyof T = never> = {
  [P in K]-?: T[P]
} & {
  [P in keyof Omit<T, K>]: T[P]
}

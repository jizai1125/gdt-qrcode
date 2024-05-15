export interface QRCodeInst {
  config: QRCodeConfig
  dom: HTMLElement
  domClassName: string
  style: HTMLStyleElement | undefined
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
  width?: number
  // iframe 高
  height?: number
  // 是否展示 logo
  showLogo?: boolean
  // 只展示二维码
  onlyShowCode?: boolean
  // 扫码登录成功回调，拿到临时授权码 code
  onScanned?: (code: string, data: object) => void
}
type QRCodeStyleConfig = Omit<QRCodeConfig, 'clientId' | 'redirectUri' | 'url'>
type InitQRCodeConfig = MakeRequired<QRCodeConfig, 'clientId' | 'redirectUri'>
type MakeRequired<T, K extends keyof T = never> = {
  [P in K]-?: T[P]
} & {
  [P in keyof Omit<T, K>]: T[P]
}

const defaultDomain = 'https://login-pro.ding.zj.gov.cn'
export const defaultConfig: QRCodeConfig = {
  domain: defaultDomain,
  url: `${defaultDomain}/oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true`,
  width: 220,
  height: 320,
  showLogo: true,
  onlyShowCode: false
}

export function initQRCode(dom: HTMLElement, config: InitQRCodeConfig): QRCodeInst | undefined {
  if (!dom) {
    console.warn('[gdt-qrcode]', 'dom is not exist')
    return
  }
  const ctx: QRCodeInst = {
    config,
    dom,
    domClassName: 'gdt-qrcode-wrapper',
    style: undefined,
    iframe: undefined,
    url: undefined,
    render,
    update,
    updateUrl,
    updateStyle,
    messageHandler
  }

  ctx.render()
  window.addEventListener('message', messageHandler)
  function messageHandler(evt: MessageEvent) {
    if (evt.origin.match(ctx.config.domain!)) {
      ctx.config.onScanned?.(evt.data.code, evt.data)
    }
  }
  function render() {
    ctx.dom.innerHTML = ''
    ctx.dom.classList.add(ctx.domClassName)
    const iframe = document.createElement('iframe')
    ctx.iframe = iframe
    ctx.update()
    ctx.dom.appendChild(iframe)
  }
  function update(config?: QRCodeConfig) {
    if (!ctx.iframe) return
    _updateConfig(config)
    ctx.updateUrl()
    ctx.updateStyle()
  }
  function updateUrl(url?: string) {
    if (!ctx.iframe) return
    if (url) {
      _updateConfig({ url })
    }
    ctx.url = _formatUrl()
    ctx.iframe.src = ctx.url
  }
  function updateStyle(config?: QRCodeStyleConfig) {
    if (!ctx.iframe) return
    const { width, height, showLogo, onlyShowCode } = _updateConfig(config)
    ctx.iframe.frameBorder = '0'
    ctx.iframe.width = `${width}px`
    ctx.iframe.height = `${height}px`
    ctx.iframe.style.marginTop = onlyShowCode ? '-80px' : showLogo ? '0' : '-40px'
    if (!ctx.style) {
      const style = document.createElement('style')
      style.innerHTML = `
      .${ctx.domClassName} {
        display: inline-block;
        overflow: hidden;
      }
      `
      ctx.style = style
      ctx.dom.appendChild(style)
    }
  }

  function _updateConfig(config?: QRCodeConfig): QRCodeConfig {
    ctx.config = {
      ...defaultConfig,
      ...ctx.config,
      ...config
    }
    return ctx.config
  }
  function _formatUrl(): string {
    const { clientId, redirectUri, url } = ctx.config
    if (typeof url === 'function') {
      return url(ctx.config)
    }
    return `${url}&${genURLQueryString({
      client_id: clientId,
      redirect_uri: redirectUri
    })}`
  }

  return ctx
}

function genURLQueryString(obj: { [k: string]: any }, skipNullOrUndefined = true): string {
  const params = new URLSearchParams()
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const value = obj[key]
      if (!skipNullOrUndefined || (value !== null && value !== undefined)) {
        params.append(key, value)
      }
    }
  }
  return params.toString()
}

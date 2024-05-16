import type { QRCodeConfig, QRCodeInst, QRCodeStyleConfig, InitQRCodeConfig } from './interface'
import { genURLQueryString, formatLength } from './util'

const defaultDomain = 'https://login-pro.ding.zj.gov.cn'
export const defaultConfig: QRCodeConfig = {
  domain: defaultDomain,
  url: `${defaultDomain}/oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true`,
  width: '100%',
  height: 320,
  showLogo: true,
  onlyShowCode: false,
  blockLine: true
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
    const { width, height, showLogo, onlyShowCode, blockLine } = _updateConfig(config)
    ctx.iframe.frameBorder = '0'
    ctx.iframe.width = formatLength(width)
    ctx.iframe.height = formatLength(height)
    ctx.iframe.style.marginTop = onlyShowCode ? '-80px' : showLogo ? '0' : '-40px'
    ctx.dom.style.display = blockLine ? 'block' : 'inline-block'
    ctx.dom.style.overflow = 'hidden'
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

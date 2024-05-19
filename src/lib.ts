import type { QRCodeOptions, QRCodeStyleOptions, InitQRCodeOptions } from './interface'
import { addUrlQueryParams, formatLength } from './util'

const defaultDomain = 'https://login-pro.ding.zj.gov.cn'
export const defaultOptions: QRCodeOptions = {
  domain: defaultDomain,
  url: `${defaultDomain}/oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true`,
  width: '100%',
  height: 320,
  showLogo: true,
  onlyShowCode: false,
  blockLine: true
}

export class GdtQRCode {
  dom: HTMLElement | undefined
  domClassName = 'gdt-qrcode-wrapper'
  options: QRCodeOptions = defaultOptions
  iframe: HTMLIFrameElement | undefined
  url: string | undefined
  constructor(dom: HTMLElement, options: InitQRCodeOptions) {
    this.options = {
      ...defaultOptions,
      ...options
    }
    this.dom = dom
    this.render()
    this.registerMessage()
  }
  render(options?: QRCodeOptions): void {
    if (!this.dom) return
    this.dom.innerHTML = ''
    this.dom.classList.add(this.domClassName)
    const iframe = document.createElement('iframe')
    this.iframe = iframe
    this.update(options)
    this.dom.appendChild(iframe)
  }
  update(options?: QRCodeOptions): void {
    this.updateOptions(options)
    this.updateUrl()
    this.updateStyle()
  }
  updateOptions(options?: QRCodeOptions): QRCodeOptions {
    this.options = {
      ...this.options,
      ...options
    }
    return this.options
  }
  updateUrl(url?: string): void {
    if (!this.iframe) return
    if (url) {
      this.updateOptions({ url })
    }
    this.url = this.formatUrl()
    this.iframe.src = this.url
  }
  updateStyle(options?: QRCodeStyleOptions): void {
    if (!this.iframe || !this.dom) return
    const { width, height, showLogo, onlyShowCode, blockLine } = this.updateOptions(options)
    this.iframe.frameBorder = '0'
    this.iframe.width = formatLength(width)
    this.iframe.height = formatLength(height)
    this.iframe.style.marginTop = onlyShowCode ? '-80px' : showLogo ? '0' : '-40px'
    this.dom.style.display = blockLine ? 'block' : 'inline-block'
    this.dom.style.overflow = 'hidden'
  }
  destroy(): void {
    if (this.iframe) {
      this.iframe.remove()
      this.iframe = undefined
    }
    this.url = undefined
    this.offMessage()
  }
  private formatUrl(): string {
    const { clientId, redirectUri, url } = this.options
    if (typeof url === 'function') {
      return url(this.options)
    }
    return addUrlQueryParams(url as string, {
      client_id: clientId,
      redirect_uri: redirectUri
    })
  }
  private offMessage(): void {
    window.removeEventListener('message', this.messageHandler)
  }
  private registerMessage(): void {
    this.offMessage()
    window.addEventListener('message', this.messageHandler)
  }
  private messageHandler(evt: MessageEvent): void {
    if (this.options && evt.origin.match(this.options.domain!)) {
      this.options.onScanned?.(evt.data.code, evt.data)
    }
  }
}

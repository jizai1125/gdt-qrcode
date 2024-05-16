# gdt-qrcode [![npm](https://img.shields.io/npm/v/gdt-qrcode?color=green)](https://www.npmjs.com/package/gdt-qrcode) ![](https://img.shields.io/bundlephobia/min/gdt-qrcode)
    
> 政务钉钉扫码登录功能封装，可以通过 js 方法或 Vue 组件方式接入项目。[钉钉开放平台-扫码登录](https://openplatform-portal.dg-work.cn/portal/?spm=a2q2b.13441934.0.0.46b96fbaXigJaE#/helpdoc?apiType=DEV_GUIDE&docKey=3355049)

## [Demo](https://jizai1125.github.io/gdt-qrcode/examples/)

## 安装

**npm**

```bash
npm i gdt-qrcode
```

<details>
<summary><strong>cdn</strong></summary>
cdn 方式引入，暴露的全局变量为 GdtQRCode

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="app">
       <qr-code  
          client-id="应用标识" 
          redirect-uri="回调地址" />
    </div>

    <script src="https://unpkg.com/vue@latest"></script>
    <script src="https://unpkg.com/gdt-qrcode@latest/dist/gdt-qrcode.iife.js"></script>
    <script>
        const app = Vue.createApp({})
        app.component('QrCode', GdtQRCode.QRCode)
        app.mount('#app')
    </script>
  </body>
</html>
```

</details>

## 使用

**方式一：使用 JS 方法**

```js
import { initQRCode } from 'gdt-qrcode'

initQRCode(document.getElementById('#domId'), {
  clientId: '应用标识',
  redirectUri: '回调地址',
  onScanned(code: string) {
    console.log('扫码成功', code)
  }
})
```

**方式二：使用 Vue 组件**

```vue
<script setup lang="ts">
import { QRCode } from 'gdt-qrcode'

function handleScanned(code: string) {
  console.log('扫码成功', code)
}
</script>

<template>
  <QRCode
    client-id="应用标识"
    redirect-uri="回调地址"
    @scanned="handleScanned" />
</template>
```

## 类型定义

```ts

interface QRCodeConfig {
  // 应用标识，会作为 iframe src 地址参数
  clientId: string
  // 回调地址，会作为 iframe src 地址参数
  redirectUri: string
  // 扫码登录域名，默认 https://login-pro.ding.zj.gov.cn
  domain?: string
  // 扫码登录完整地址，默认 domian + /oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true
  url?: string | ((config: QRCodeConfig) => string)
  // iframe 宽，默认 100%
  width?: number | string
  // iframe 高，默认 320px
  height?: number | string
  // 元素是否单独占一行，display: block
  blockLine?: boolean
  // 是否展示 logo
  showLogo?: boolean
  // 只展示二维码
  onlyShowCode?: boolean
  // 扫码登录成功回调，拿到临时授权码 code
  onScanned?: (code: string, data: object) => void
}

interface QRCodeInst {
  config: QRCodeConfig
  dom: HTMLElement
  domClassName: string
  iframe: HTMLIFrameElement | undefined
  // iframe src 地址
  url: string | undefined
  render: () => void
  update: (config?: QRCodeConfig) => void
  updateUrl: (url?: string) => void
  updateStyle: (config?: QRCodeStyleConfig) => void
  messageHandler: (event: MessageEvent) => void
}
```

## License

MIT

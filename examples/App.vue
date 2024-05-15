<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QRCode, initQRCode, type QRCodeConfig, type QRCodeInst } from '../src'

// --- 1. js 方法加载
const qrcodeContainerRef = ref<HTMLElement>()
const qrcodeInst1 = ref<QRCodeInst>()
onMounted(() => {
  qrcodeInst1.value = initQRCode(qrcodeContainerRef.value!, {
    clientId: 'xs_jcsc_dingoa',
    redirectUri: 'http://195.195.32.162:9000',
    onScanned(code: string) {
      console.log('js 方法扫码成功', code)
    }
  })
})

// --- 2. 使用 Vue 组件
const qrcodeInst2 = ref<QRCodeInst>()
function handleLoad(inst: QRCodeInst) {
  qrcodeInst2.value = inst
}
function handleScanned(code: string) {
  console.log('vue event 扫码成功', code)
}
const defaultUrl =
  'https://login-pro.ding.zj.gov.cn/oauth2/auth.htm?response_type=code&scope=get_user_info&authType=QRCODE&embedMode=true'
const url = ref(defaultUrl)
const toggleUrl = ref(false)
function changeUrl() {
  url.value = toggleUrl.value ? defaultUrl : 'https://login-pro.ding.zj.gov.cn/xxxx'
  qrcodeInst1.value?.updateUrl(url.value)
  toggleUrl.value = !toggleUrl.value
}

const style = ref<QRCodeConfig>({})
const toggleStyle = ref(false)
function changeStyle() {
  toggleStyle.value = !toggleStyle.value
  style.value.width = toggleStyle.value ? 400 : 220
  style.value.height = toggleStyle.value ? 400 : 320
  qrcodeInst1.value?.updateStyle(style.value)
}
const showLogo = ref(true)
function changeLogo() {
  showLogo.value = !showLogo.value
  qrcodeInst1.value?.updateStyle({ showLogo: showLogo.value })
}
const onlyShowCode = ref(false)
function changeOnlyCode() {
  onlyShowCode.value = !onlyShowCode.value
  qrcodeInst1.value?.updateStyle({ onlyShowCode: onlyShowCode.value })
}
</script>

<template>
  <div class="app-container">
    <div class="action-bar">
      <button @click="changeUrl">change url</button>
      <button @click="changeOnlyCode">only show code | {{ onlyShowCode }}</button>
      <button @click="changeLogo">show logo | {{ showLogo }}</button>
      <button @click="changeStyle">
        change style | width: {{ style.width }}px, height: {{ style.height }}px
      </button>
    </div>
    <h3 class="title">方式一：使用 js 方法</h3>
    <div ref="qrcodeContainerRef" class="qrcode-container"></div>
    <div class="url">
      完整地址：<code>{{ qrcodeInst1?.url }}</code>
    </div>
    <div class="divider"></div>

    <h3 class="title">方式二：使用 Vue 组件</h3>
    <div class="qrcode-container">
      <QRCode
        :url="url"
        client-id="xs_jcsc_dingoa"
        redirect-uri="http://195.195.32.162:9000"
        :only-show-code="onlyShowCode"
        :show-logo="showLogo"
        :width="style.width"
        :height="style.height"
        @load="handleLoad"
        @scanned="handleScanned" />
    </div>
    <div class="url">
      完整地址：<code>{{ qrcodeInst2?.url }}</code>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  box-sizing: border-box;
  width: 100%;
  padding: 0 40px;
  margin: 10px 0;
  font-size: 18px;
}
.url {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.divider {
  width: 100%;
  margin: 10px 0;
  height: 1px;
  background-color: #e5e5e5;
}
.action-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
}
.qrcode-container {
  border: 1px solid #e5e5e5;
}
code {
  display: block;
  padding: 8px 15px;
  background-color: #f6f8fa;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  overflow-x: auto;
  font-family:
    Monaco,
    Bitstream Vera Sans Mono,
    Lucida Console,
    Terminal;
  color: #333;
  font-size: 12px;
}
</style>
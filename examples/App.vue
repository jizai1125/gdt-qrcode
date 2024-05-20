<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { GdtQRCode, VGdtQRCode, type QRCodeOptions, type QRCodeInst } from '../src'

const clientId = ref()
const redirectUri = ref()
// --- 1. js 方法加载
const qrcodeContainerRef = ref<HTMLElement>()
const qrcodeInst1 = ref<QRCodeInst>()
onMounted(() => {
  qrcodeInst1.value = new GdtQRCode(qrcodeContainerRef.value!, {
    clientId: clientId.value,
    redirectUri: redirectUri.value,
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

function update() {
  qrcodeInst1.value?.update({
    clientId: clientId.value,
    redirectUri: redirectUri.value
  })
}
const style = ref<QRCodeOptions>({ width: '100%', height: 320 })
const toggleStyle = ref(false)
function changeStyle() {
  toggleStyle.value = !toggleStyle.value
  style.value.width = toggleStyle.value ? 400 : '100%'
  style.value.height = toggleStyle.value ? 400 : 320
  qrcodeInst1.value?.updateStyle({ ...style.value, blockLine: !toggleStyle.value })
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
const toggleDestroy = ref(false)
function destroy() {
  toggleDestroy.value ? qrcodeInst1.value?.render() : qrcodeInst1.value?.destroy()
  toggleDestroy.value = !toggleDestroy.value
}
const defaultUrl =
  'https://login-pro.ding.zj.gov.cn/oauth2/auth.htm?response_type=code&client_id=xxx&redirect_uri=http://xxx&scope=get_user_info&authType=QRCODE&embedMode=true'
const url = ref()
const toggleUrl = ref(true)
function changeUrl() {
  url.value = toggleUrl.value ? defaultUrl : undefined
  // qrcodeInst1.value?.updateUrl(url.value)
  toggleUrl.value = !toggleUrl.value
}
</script>

<template>
  <div class="app-container">
    <div class="input-bar">
      <div class="input-item">
        <span class="label">client id：</span>
        <input type="text" v-model="clientId" />
      </div>
      <div class="input-item">
        <span class="label">redirect uri：</span>
        <input type="text" v-model="redirectUri" />
      </div>
      <button @click="update">update</button>
    </div>
    <div class="action-bar">
      <button @click="changeUrl">change url</button>
      <button @click="changeOnlyCode">only show code | {{ onlyShowCode }}</button>
      <button @click="changeLogo">show logo | {{ showLogo }}</button>
      <button @click="changeStyle">
        change style | width: {{ style.width }}, height: {{ style.height }}
      </button>
      <button @click="destroy">{{ toggleDestroy ? 'recreate' : 'destroy' }}</button>
    </div>
    <h3 class="title">方式一：使用 js 方法</h3>
    <div class="qrcode-container">
      <div ref="qrcodeContainerRef" class="bordered"></div>
    </div>
    <div class="url">
      完整地址：<code>{{ qrcodeInst1?.url }}</code>
    </div>
    <div class="divider"></div>

    <h3 class="title">方式二：使用 Vue 组件</h3>
    <div class="qrcode-container">
      <!-- :url="url" -->
      <VGdtQRCode
        class="bordered"
        :client-id="clientId"
        :redirect-uri="redirectUri"
        :only-show-code="onlyShowCode"
        :show-logo="showLogo"
        :width="style.width"
        :height="style.height"
        :block-line="!toggleStyle"
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
.input-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
}
.input-item {
  display: flex;
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
  width: 100%;
}
.bordered {
  border: 1px solid #e5e5e5;
}
code {
  display: block;
  padding: 8px 15px;
  background-color: #f6f8fa;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  overflow-x: auto;
  font-family: Monaco, Bitstream Vera Sans Mono, Lucida Console, Terminal;
  color: #333;
  font-size: 12px;
}
</style>

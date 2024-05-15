<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { initQRCode, defaultConfig, type QRCodeConfig, type QRCodeInst } from './lib'

const props = withDefaults(defineProps<QRCodeConfig>(), defaultConfig)
const emit = defineEmits<{
  load: [inst: QRCodeInst]
  scanned: [code: string, data: object]
}>()

const qrcodeContainerRef = ref()
const qrCodeInst = ref<QRCodeInst>()

function doEmitLoad() {
  if (qrCodeInst.value) {
    emit('load', { ...qrCodeInst.value })
  }
}
watch(
  [() => props.url, () => props.clientId, () => props.redirectUri],
  ([url, clientId, redirectUri]) => {
    qrCodeInst.value?.update({
      url,
      clientId,
      redirectUri
    })
    doEmitLoad()
  }
)
watch(
  [() => props.width, () => props.height, () => props.onlyShowCode, () => props.showLogo],
  ([width, height, onlyShowCode, showLogo]) => {
    qrCodeInst.value?.updateStyle({
      width,
      height,
      onlyShowCode,
      showLogo
    })
  }
)
function handleScanned(code: string, data: object) {
  emit('scanned', code, data)
}
onMounted(() => {
  qrCodeInst.value = initQRCode(qrcodeContainerRef.value, { ...props, onScanned: handleScanned })
  doEmitLoad()
})
onUnmounted(() => {
  if (qrCodeInst.value) {
    window.removeEventListener('message', qrCodeInst.value.messageHandler)
  }
})
</script>

<template>
  <div ref="qrcodeContainerRef"></div>
</template>

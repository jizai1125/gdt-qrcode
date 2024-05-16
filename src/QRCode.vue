<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { initQRCode, defaultConfig } from './lib'
import type { QRCodeConfig, QRCodeInst } from './interface'

const props = withDefaults(defineProps<QRCodeConfig>(), defaultConfig)
const emit = defineEmits<{
  scanned: [code: string, data: object]
}>()

const qrcodeContainerRef = ref<HTMLElement>()
const qrCodeInst = ref<QRCodeInst>()

watch(
  [() => props.url, () => props.clientId, () => props.redirectUri],
  ([url, clientId, redirectUri]) => {
    qrCodeInst.value?.update({
      url,
      clientId,
      redirectUri
    })
  }
)
watch(
  [
    () => props.width,
    () => props.height,
    () => props.onlyShowCode,
    () => props.showLogo,
    () => props.blockLine
  ],
  ([width, height, onlyShowCode, showLogo, blockLine]) => {
    qrCodeInst.value?.updateStyle({
      width,
      height,
      onlyShowCode,
      showLogo,
      blockLine
    })
  }
)
function handleScanned(code: string, data: object) {
  emit('scanned', code, data)
}
onMounted(() => {
  qrCodeInst.value = initQRCode(qrcodeContainerRef.value!, { ...props, onScanned: handleScanned })
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

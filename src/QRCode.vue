<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { GdtQRCode, defaultOptions } from './lib'
import type { QRCodeOptions, QRCodeInst } from './interface'

const props = withDefaults(defineProps<QRCodeOptions>(), defaultOptions)
const emit = defineEmits<{
  load: [inst: QRCodeInst]
  scanned: [code: string, data: object]
}>()
const qrcodeContainerRef = ref<HTMLElement>()
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
  qrCodeInst.value = new GdtQRCode(qrcodeContainerRef.value!, {
    ...props,
    onScanned: handleScanned
  })
  doEmitLoad()
})
onUnmounted(() => {
  qrCodeInst.value?.destroy()
})
</script>

<template>
  <div ref="qrcodeContainerRef"></div>
</template>

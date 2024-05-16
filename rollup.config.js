// rollup.config.js
import { getBabelOutputPlugin } from '@rollup/plugin-babel'

export default {
  input: 'dist/gdt-qrcode.js',
  plugins: [
    getBabelOutputPlugin({
      presets: ['@babel/preset-env'],
      allowAllFormats: true
    })
  ],
  external: ['vue'],

  output: [
    { file: 'dist/gdt-qrcode.es.js', format: 'es' },
    {
      file: 'dist/gdt-qrcode.umd.js',
      format: 'umd',
      name: 'GdtQRCode',
      globals: {
        vue: 'Vue'
      }
    }
  ]
}

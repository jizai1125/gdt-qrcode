// rollup.config.js
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'dist/gdt-qrcode.js',
  plugins: [
    getBabelOutputPlugin({
      presets: [
        [
          '@babel/preset-env',
          {
            targets: '>2%, not IE 11'
          }
        ]
      ],
      allowAllFormats: true
    }),
    terser()
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

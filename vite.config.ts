import { fileURLToPath, URL } from 'node:url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// 自定义 Vite 插件来处理字体文件
function handleFontFiles(): Plugin {
  return {
    name: 'handle-font-files',
    apply: 'build',
    enforce: 'pre',
    transform(src: any, id: any) {
      // 匹配字体文件并返回处理后的内容
      if (/\.(woff|woff2|ttf|eot|otf)$/i.test(id)) {
        // 返回处理后的内容
        return {
          code: src // 这里可以对字体文件进行一些处理
        }
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    handleFontFiles(),
    vue({ reactivityTransform: true }),
    Components({
      dts: false
    }),
    createSvgIconsPlugin({
      // 指定图标文件夹，绝对路径（NODE代码）
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://consult-api.itheima.net', // 这里配置您的后端服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/test-build/',
})

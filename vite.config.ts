import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const proxy = {
    '/api': {
        target: 'http://127.0.0.1:5165',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
    },
}

export default defineConfig({
    plugins: [vue()],
    base: '/parkmon/',
    server: {
        port: 5173,
        proxy,
    },
    preview: {
        port: 4173,
        proxy,
    },
})
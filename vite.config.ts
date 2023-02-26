import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetIcons, presetUno } from 'unocss'

export default defineConfig({
    resolve: {
        alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: {
        host: true,
    },
    plugins: [
        Vue(),
        UnoCSS({
            presets: [
                presetUno({
                    dark: 'media',
                    preflight: false,
                }),
                presetIcons({
                    scale: 1.2,
                    extraProperties: { 'display': 'inline-block', 'vertical-align': 'bottom' },
                }),
            ],
        }),
    ],
})

import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetIcons, presetUno } from 'unocss'
import JsDelivr from 'vite-plugin-jsdelivr'

export default defineConfig({
    resolve: {
        alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: {
        host: true,
    },
    plugins: [
        Vue(),
        JsDelivr({
            packages: {
                html2canvas: {
                    var: 'html2canvas',
                    filePath: 'dist/html2canvas.min.js',
                },
            },
        }),
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

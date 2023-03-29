<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useElementSize } from '@vueuse/core'

const canvasElement = ref<HTMLCanvasElement>()
const { width } = useElementSize(canvasElement)

const WIDTH = 1920
const HEIGHT = 1200
const SPACE_WIDTH = 100

const left = ref<string>('Video')
const right = ref<string>('Cover~')
const info = ref<string>('A simple video cover generator.')
const color = ref<string[]>([randomColor(), randomColor()])

watch(
    () => ({
        ctx: canvasElement.value?.getContext('2d'),
        left: left.value,
        right: right.value,
        info: info.value,
        color: color.value,
    }),
    ({ ctx, left, right, info, color }) => {
        if (!ctx)
            return

        // init
        ctx.canvas.style.letterSpacing = '2px'
        ctx.fillStyle = '#121212'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        // draw info
        ctx.font = '80px Trebuchet MS'
        ctx.textAlign = 'center'
        ctx.fillStyle = '#767676'
        ctx.fillText(info, WIDTH / 2, HEIGHT - 200)

        ctx.font = 'bold 180px Trebuchet MS'
        ctx.textAlign = 'left'

        const lw = ctx.measureText(left).width
        const rw = ctx.measureText(right).width
        const full = lw + SPACE_WIDTH + rw
        const lx = (WIDTH - full) / 2
        const y = 120 + 420

        ctx.fillStyle = '#ddd'
        ctx.fillText(left, lx, y)

        const gradient = ctx.createLinearGradient(lx + lw + SPACE_WIDTH, y + 120, lx + lw + SPACE_WIDTH + rw, y)
        gradient.addColorStop(0, color[0])
        gradient.addColorStop(1, color[1])
        ctx.fillStyle = gradient
        ctx.fillText(right, lx + lw + SPACE_WIDTH, y)
    },
    { immediate: true },
)

function randomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 20%, 50%)`
}

function download() {
    const dataURL = canvasElement.value?.toDataURL('image/jpeg')
    if (!dataURL)
        return
    const a = document.createElement('a')
    a.download = 'video-cover.jpg'
    a.href = dataURL
    a.click()
}
</script>

<template>
    <div mx-auto mt-16 select-none w-4xl max-w="[calc(100%-4rem)]">
        <canvas
            ref="canvasElement"
            bg="#121212" w-full block :width="WIDTH" :height="HEIGHT"
            :style="{ height: `${(width * HEIGHT) / WIDTH}px` }"
        ></canvas>

        <div flex gap-2 mt-8>
            <button @click="color = [randomColor(), randomColor()]">Random Color</button>
            <button @click="download">Download</button>
        </div>

        <div flex="~ col" w-full md:w="50%" gap-2 mt-2>
            <input v-model="left" type="text" />
            <input v-model="right" type="text" />
            <input v-model="info" type="text" />
        </div>

        <footer my-24>
            <span>Made by </span>
            <a href="https://zhaojiakun.cn">Jiakun Zhao</a>
            <span> | </span>
            <a href="https://github.com/jiakun-zhao/video-cover">Source Code</a>
        </footer>
    </div>
</template>

<style>
a {
    color: inherit;
}

button:hover {
    cursor: pointer;
    background-color: #121212;
}

button,
input {
    outline: none;
    background: transparent;
    color: inherit;
    font-size: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.16);
    padding: 0.4rem 0.7rem;
    letter-spacing: inherit;
}
</style>

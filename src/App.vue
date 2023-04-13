<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useElementSize } from '@vueuse/core'

const canvasElement = ref<HTMLCanvasElement>()
const { width } = useElementSize(canvasElement)

// const WIDTH = 1920
const WIDTH = 1600
// const HEIGHT = 1200
const HEIGHT = 1000
const SPACE_WIDTH = 40

const left = ref<string>('Video')
const right = ref<string>('Cover~')
const info = ref<string>('A simple video cover generator.')
const color = ref<string[]>([randomColor(), randomColor()])
const isEdgeShow = ref<boolean>(true)
const fontSize = ref<number>(120)

const realHeight = computed(() => (width.value * HEIGHT) / WIDTH)

watch(
    () => ({
        ctx: canvasElement.value?.getContext('2d'),
        left: left.value,
        right: right.value,
        info: info.value,
        fontSize: fontSize.value,
        color: color.value,
    }),
    ({ ctx, left, right, info, fontSize, color }) => {
        if (!ctx)
            return

        // init
        ctx.canvas.style.letterSpacing = '2px'
        ctx.fillStyle = '#121212'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        // draw info
        ctx.font = `${WIDTH / 32}px Trebuchet MS`
        ctx.textAlign = 'center'
        ctx.fillStyle = '#767676'
        ctx.fillText(info, WIDTH / 2, HEIGHT - 160)

        // draw title
        ctx.font = `bold ${fontSize}px Trebuchet MS`
        ctx.textAlign = 'left'

        const lw = ctx.measureText(left).width
        const rw = ctx.measureText(right).width
        const full = lw + SPACE_WIDTH + rw
        const lx = (WIDTH - full) / 2
        const y = HEIGHT / 2.1

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
    <div mx-auto mt-16 select-none w-4xl relative max-w="[calc(100%-4rem)]">
        <canvas
            ref="canvasElement"
            bg="#121212" w-full block :width="WIDTH" :height="HEIGHT"
            :style="{ height: `${realHeight}px` }"
        ></canvas>

        <div
            v-show="isEdgeShow"
            absolute w-full top-0 left-0 flex items-center justify-center
            :style="{ height: `${realHeight}px` }"
        >
            <div
                absolute border-x="1 dashed" border-color-white:20
                :style="{ width: `${realHeight * 4 / 3}px`, height: `${realHeight}px` }"
            ></div>
            <div
                absolute w-full border-y="1 dashed" border-color-white:20
                :style="{ height: `${width * 9 / 16}px` }"
            ></div>
        </div>

        <div flex gap-2 mt-8>
            <button @click="color = [randomColor(), randomColor()]">Random Color</button>
            <button @click="isEdgeShow = !isEdgeShow">Edge</button>
            <button @click="fontSize += 2">Font size +</button>
            <button @click="fontSize -= 2">Font size -</button>
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

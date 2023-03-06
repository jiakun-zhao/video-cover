<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import html2canvas from 'html2canvas'

const isInputBoxShow = ref(false)
const part1 = ref<string>('Haha, it')
const part2 = ref<string>('works!!')
const part3 = ref<string>('A simple video cover generator.')
const coverEl = ref<HTMLDivElement>()
const part2TextColor = ref<string>('')
const inputStyle = 'outline-none border-none color-inherit bg-transparent text-sm w-32 inline-block px-4 border-l-1 border-l-solid border-white:20'

function download() {
    html2canvas(coverEl.value!, {
        width: coverEl.value!.clientWidth,
        height: coverEl.value!.clientHeight,
        scale: 1920 / coverEl.value!.clientWidth,
    }).then((canvas) => {
        const dataURL = canvas.toDataURL('image/jpeg')
        const a = document.createElement('a')
        a.download = 'cover.jpg'
        a.href = dataURL
        a.click()
    })
}

function randomColor() {
    part2TextColor.value = `hsl(${Math.floor(Math.random() * 360)}, 20%, 50%)`
}

function toggleInputBoxShow() {
    isInputBoxShow.value = !isInputBoxShow.value
}

onMounted(() => randomColor())
</script>

<template>
    <!-- !Cover -->
    <div ref="coverEl" class="aspect-16/10 bg-#121212 flex flex-col justify-end max-w-full mx-auto text-center" :style="{ width: 'calc(100vh * 16 / 10)' }">
        <div class="font-bold h-45%" :style="{ fontSize: 'calc((100vh * 16 / 10) / 15)' }">
            <span>{{ part1 }}</span>
            <span class="ml-.8em" :style="{ color: part2TextColor }">{{ part2 }}</span>
        </div>
        <div class="h-20%" :style="{ fontSize: 'calc((100vh * 16 / 10) / 40)' }">{{ part3 }}</div>
    </div>

    <!-- !Control -->
    <div class="bg-black border-1 border-solid border-white:20 bottom-4 fixed flex items-center leading-1 left-4 rounded-1.2">
        <!-- !Btn: Input Box Show -->
        <div class="cursor-pointer pl-3 pr-1.5 py-2" @click="toggleInputBoxShow">
            <div :class="isInputBoxShow ? 'i-ph:eye-duotone' : 'i-ph:eye-closed-duotone'"></div>
        </div>
        <!-- !Btn: Random Color -->
        <div class="cursor-pointer px-1.5 py-2" @click="randomColor">
            <div class="i-ph:palette-duotone"></div>
        </div>
        <!-- !Btn: Download -->
        <div class="cursor-pointer pl-1.5 pr-3 py-2" @click="download">
            <div class="i-ph:download-duotone"></div>
        </div>
        <!-- !Input -->
        <div v-show="isInputBoxShow">
            <input v-model="part1" placeholder="Part 1" :class="inputStyle" type="text" />
            <input v-model="part2" placeholder="Part 2" :class="inputStyle" type="text" />
            <input v-model="part3" placeholder="Part 3" :class="inputStyle" type="text" />
        </div>
    </div>
</template>

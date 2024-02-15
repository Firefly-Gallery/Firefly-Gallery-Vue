<template>
    <div class="title">
        <div class="title-poem">

            <template v-for="(item, index) in lines_en" :key="index">
                <h1 :style="{'color': gradientColors[index*2]}"><i>{{ isEnUS? item:lines_cn[index] }}</i></h1>
                <p :style="{'color': gradientColors[index*2+1]}">{{ item }}</p>
            </template>
            <slot />
        </div>
    </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
import chroma from 'chroma-js';
const props = defineProps({
    "lines_cn": {}, "lines_en": {}, "isEnUS": {type: Boolean},
    "startColor": {
        type: String,
        default: '#ebe1a3'
    },
    "endColor": {
        type: String,
        default: '#94e1c8'
    }
});
const gradientColors = chroma
    .scale([props.startColor, props.endColor])
    .mode('lab')  // lab 颜色插值
    .colors(props.lines_en.length * 2);
</script>

<style scoped>

.title {
    @apply grow flex flex-col
    justify-center items-center;
}
.title-poem {
    @apply pt-0 md:pt-[4rem] text-white
    flex flex-col justify-center;
}
.title-poem h1 {
    @apply z-[10]
    text-[6vw] md:text-2xl lg:text-4xl xl:text-5xl
    font-bold;
    /* font-family: sans-serif; */
    text-shadow: 0px 3px 15px #ffffff3a;
    color: #ffffffc0;
}
.title-poem p {
    @apply mb-0 lg:mb-4 md:mb-2
    relative top-[-12px]
    xl:text-3xl lg:text-xl md:text-[1.2rem] text-[4vw]
    font-bold;
    opacity: 0.4;
    font-family: Star Rail Neue;
}
</style>
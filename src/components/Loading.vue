
<template>
    <div id="loading">
        <div class="shutter" v-for="index in shutterCount" :key="index">
            <div class="shutter-inner" :style="offsetTransition(index)"></div>
        </div>
    </div>
    <!-- <div id="loading-icon">
        <KKLoad></KKLoad>
    </div> -->
</template>

<script setup>
import { onMounted } from 'vue';

// in ms
const transitionTime = 400;
const transitionOffset = 60;
// number of shutters
const shutterCount = 8;
const delay = shutterCount * transitionOffset + transitionTime;

const emit = defineEmits(['check-loading'])

onMounted(() => {
    // Define CSS rules
    const css = `
        .loading_out {
            transition: 0s ease ${delay}ms;
            transform: translateY(100%);
        }
    `;

    // Create a style element
    const style = document.createElement('style')
    style.appendChild(document.createTextNode(css));
    
    // Append the style element to the document's head
    document.head.appendChild(style);
})

// 加入
const inTransition = (next) => {
    // 最后一片淡入时长
    let conainer = document.getElementById("loading");
    conainer.classList.remove("loading_out");
    // 更新加载状态
    setTimeout(() => {
        next();
        emit("check-loading")
    }, delay);
}
// 退出
const outTransition = () => {
    let conainer = document.getElementById("loading");
    conainer.classList.add("loading_out");
}
// 设置过渡时间、偏移
const offsetTransition = (index) => {
    let offsetTime = (index * transitionOffset);
    return {
        transition: `${transitionTime}ms cubic-bezier(0, 0, 0.3, 1) ${offsetTime}ms`,
    };
}
defineExpose({inTransition, outTransition})
</script>

<style scoped>
#loading {
    @apply
    fixed top-[-10rem] left-[-10rem] z-[114514]
    flex flex-row;

    min-width: 1920px;
    width: calc(100vw + 20rem);
    height: calc(100vh + 20rem);
}
.shutter {
    @apply grow flex items-center justify-center;
    transform: rotate(-15deg);
}
.shutter-inner {
    @apply bg-[#141414]
    w-full h-full;
}
.loading_out .shutter-inner {
    @apply w-[0%] z-[114514];
}
#loading-icon {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 114515;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
#loading-icon svg {
    width: 6rem;
    filter: drop-shadow(0px 0px 5px white);
}
</style>

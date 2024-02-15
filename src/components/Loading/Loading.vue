
<template>
    <div id="loading">
        <div class="shutter" v-for="index in shutterCount" :key="index">
            <div class="shutter-inner" :style="offsetTransition(index)"></div>
        </div>
    </div>
    <div id="loading_content">
        <LoadingIcon :isLoading="true" />
        <p>加载中...</p>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import LoadingIcon from './LoadingIcon.vue';

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
    let container = document.getElementById("loading");
    container.classList.remove("loading_out");
    // 更新加载状态
    setTimeout(() => {
        next();
        emit("check-loading")
        loading_content.classList.remove("loading_out");
    }, delay);
}
// 退出
const outTransition = () => {
    let container = document.getElementById("loading");
    container.classList.add("loading_out");
    loading_content.classList.add("loading_out");
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

#loading_content {
    @apply fixed bottom-0 left-0 
    flex flex-col items-center z-[114515] p-[20px] gap-3;
    opacity: 1;
    transition: opacity 250ms ease;
}
#loading_content p {
    @apply text-xl font-bold;
    animation: loading-text-animate 1.5s ease infinite;
}
.loading_out#loading_content {
    opacity: 0;
}
@keyframes loading-text-animate {
    from {
        opacity:1
    }
    50% {
        opacity:0.3
    }
    to {
        opacity:1
    }
}
</style>

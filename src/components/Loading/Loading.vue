
<template>
    <div id="loading" ref="loading_anim">
      <div class="shutter shutter-sub"></div>
      <div class="shutter"></div>
      <div id="loading_content" ref="loading_icon">
        <LoadingIcon :isLoading="true" />
        <p>加载中...</p>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import LoadingIcon from './LoadingIcon.vue';

// in ms
const transitionTime = 400;
const transitionOffset = 50;
const delay = transitionOffset + transitionTime;

const emit = defineEmits(['check-loading'])
const loading_anim = ref<HTMLDivElement>()
const loading_icon = ref<HTMLDivElement>()

onMounted(() => {
})

// 加入
const inTransition = (next: Function) => {
  // 最后一片淡入时长
  loading_anim.value?.classList.remove("loading_out");
  // 更新加载状态
  setTimeout(() => {
    next();
    emit("check-loading")
    loading_icon.value?.classList.remove("loading_out");
  }, delay);
}
// 退出
const outTransition = () => {
  loading_anim.value?.classList.add("loading_out");
  loading_icon.value?.classList.add("loading_out");
}
defineExpose({inTransition, outTransition})
</script>
<style scoped>
* {
  --anim-time: 500ms;
  --sub-delay: 100ms;
  --main-color: #141414;
  --inner-color: #498667;
  --easing-main: cubic-bezier(0, 0, 0, 1);
  --easing-sub: cubic-bezier(0, 0, 0, 1);
}

#loading.loading_out {
  transition: pointer-events 0s linear calc(var(--anim-time) + var(--sub-delay));
  pointer-events: none;
}

#loading {
  --p: 3px;
  @apply
  fixed top-0 z-[114514] w-[100svw] h-[100svh]
  flex flex-row;
}

.shutter {
  @apply fixed grow flex items-center justify-between;
  top: -20vw;
  right: -20vw;
  z-index: 2;
  width: calc(100svw + 40vw);
  height: calc(100svh + 40vw);
  background-color: var(--main-color);
  transform: rotate(-15deg);
  transition: width var(--anim-time) var(--easing-sub) var(--sub-delay);
}
.shutter-sub {
  z-index: 1;
  background-color: var(--inner-color);
  transition: width var(--anim-time) var(--easing-main);
}
.loading_out .shutter {
  left: -20vw;
  right: unset;
  width: 0;
  transition: width var(--anim-time) var(--easing-main);
}
.loading_out .shutter-sub {
  left: -20vw;
  right: unset;
  transition: width var(--anim-time) var(--easing-sub) var(--sub-delay);
}



#loading_content {
    @apply absolute bottom-0 left-0
    flex flex-col items-center z-[114515] p-[20px] gap-3;
    opacity: 1;
    transition: all 250ms ease;
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

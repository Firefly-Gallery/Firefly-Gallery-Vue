
<template>
    <div id="loading" ref="loading_anim">
      <iframe ref="iframeRef" :src="loadingAnim"></iframe>
      <div id="loading_indicator" ref="loading_icon">
        <LoadingIcon :isLoading="true" />
        <p>加载中...</p>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import LoadingIcon from './LoadingIcon.vue';
import loadingAnim from "../../assets/extra/firefly_icon_anim.html"

// in ms

let timer: ReturnType<typeof setInterval> | null = null;

const iframeRef = ref<HTMLIFrameElement | null>(null);

const emit = defineEmits(['check-loading'])
const loading_anim = ref<HTMLDivElement>()
const loading_icon = ref<HTMLDivElement>()

onMounted(() => {
})

// 加入
const inTransition = (next: Function) => {
  if(iframeRef.value) {iframeRef.value.contentWindow?.postMessage("reload");}
  // 最后一片淡入时长
  loading_anim.value?.classList.remove("loading_out");
  // 更新加载状态
  setTimeout(() => {
    next();
    emit("check-loading")
    loading_icon.value?.classList.remove("loading_out");
  }, 100);
}
// 退出
const outTransition = () => {
  loading_icon.value?.classList.add("loading_out");
  setTimeout(() => {
    loading_anim.value?.classList.add("loading_out");
  }, 750);
}
defineExpose({inTransition, outTransition})
</script>
<style scoped>
* {
  --delay: 1000ms;
}

#loading.loading_out {
  opacity: 0;
  pointer-events: none;
  transition: pointer-events 0s linear calc(var(--delay)),
  opacity calc(var(--delay)) ease;
}

#loading {
  @apply fixed top-0 right-0 left-0 bottom-0 z-[114514] pb-20 bg-black;
  opacity: 1;
  transition: opacity 200ms ease;
}

#loading iframe {
  @apply w-full h-full;
  color-scheme: none;
}

#loading_indicator {
  @apply absolute bottom-0 left-0
  flex flex-col items-center z-[114515] p-[20px] gap-3;
  opacity: 1;
  transition: all 250ms ease;
}
#loading_indicator.loading_out {
  opacity: 0;
}
#loading_indicator p {
    @apply text-xl font-bold;
    animation: loading-text-animate 1.5s ease infinite;
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

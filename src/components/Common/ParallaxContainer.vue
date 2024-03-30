<template>
  <section class="parallax-container" ref="containerRef">

    <video autoplay loop muted v-if="videoSrc!=''"
           class="parallax-bg"
           @loadeddata="onVideoLoad"
           ref="bgRef" :style="bgStyle" />

    <Image
           :class="{'parallax-bg': true, 'hide': isVideoLoaded}"
           @load="onImageLoad"
           :src="src" ref="imgBgRef" :style="bgStyle" />

    <div :class="`${contentClass}`">
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, toRaw, reactive, type Ref } from 'vue'
import componentsVar from '@/store/componentsVar'
import viewport from '@/store/viewport'
import Image from '../UI/Image.vue'

const isVideoLoaded = ref(false)

interface StyleRef {
  [key: string]: string;
}

let bgValue: HTMLImageElement | HTMLVideoElement | undefined
const containerRef = ref<HTMLDivElement>()

const bgRef = ref<HTMLImageElement>()
const imgBgRef = ref<typeof Image>()

const props = defineProps({
  w: { type: String },
  h: { type: String },
  src: { type: String },
  contentClass: { type: String },
  videoSrc: { type: String, default: "" },
  margin: { type: Number, default: 256 },
  imageZ: { type: Number, default: -1 }
})

const bgStyle = reactive({ zIndex: props.imageZ, height: "0px", width: "0px", transform: "translateY(0px)" })

function GetViewportSize() {
  return {
    w: (window.innerWidth || document.documentElement.clientWidth),
    h: (window.innerHeight || document.documentElement.clientHeight)
  }
}

function GetBGSize() {
  if(!bgValue) return {w: 1, h: 1}
  if(bgValue instanceof HTMLVideoElement) {
    return {
      w: bgValue?.videoWidth ?? 1,
      h: bgValue?.videoWidth ?? 1
    }
  }
  return {
    w: bgValue?.naturalWidth ?? 1,
    h: bgValue?.naturalWidth ?? 1
  }
}

function SetRealHeight() {
  const { w, h } = GetViewportSize()
  if (bgValue && containerRef.value) {
    let realH = (h + props.margin)
    bgStyle.height = realH + 'px'
    let bgSize = GetBGSize()
    let realW = realH / bgSize.h * bgSize.w
    bgStyle.width = Math.max(realW, w) + 'px'
  }
}
const throttle = <T extends (...args: any[]) => void>(
  func: T,
  timeout: number
): ((...args: Parameters<T>) => void) => {
  let isWaiting: boolean;

  return function (this: any, ...args: Parameters<T>) {
    if (!isWaiting) {
      func.apply(this, args);
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false;
      }, timeout);
    }
  };
};

function UpdatePos() {
  const { w, h } = GetViewportSize()
  if (bgValue && containerRef.value) {
    var bounding = containerRef.value.getBoundingClientRect()
    let fac = bounding.bottom / h
    fac = 1 - (fac * 2)
    bgStyle.transform = `translateY(${(fac * props.margin / 2)}px)`
  }
}

function onVideoLoad() {
  bgValue = bgRef.value;
  SetRealHeight()
  // UpdatePos()
  isVideoLoaded.value = true
}
function onImageLoad() {
  SetRealHeight()
}

function fillSrc() {
  if(bgRef.value) {
    bgRef.value.src = props.videoSrc
  }
}

onMounted(() => {
  if(imgBgRef.value) {
    bgValue = imgBgRef.value.imgRef
  }

  if(props.videoSrc != "") {
    if (document.readyState === "complete") {
      fillSrc()
    } else {
      document.addEventListener('readystatechange', () => {
        if (document.readyState === "complete") {
          fillSrc()
        }
      });
    }
  }
  const scroll = componentsVar.scroll
  UpdatePos()
  window.addEventListener('resize', function() {
    SetRealHeight()
  })
  const f = throttle(UpdatePos, 100)
  scroll?.addEventListener('scroll', function() {
    requestAnimationFrame(UpdatePos)
  })
})
</script>

<style>
.parallax-container {
  @apply relative overflow-hidden
  w-screen h-screen;
  width: 100svw;
  height: 100svh;
}

.parallax-container .parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  overflow: hidden;
  transition: opacity 0.4s, transform 0.02s ease;
}

.hide {
  position: absolute;
  opacity: 0;
}
</style>
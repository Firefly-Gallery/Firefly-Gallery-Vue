<template>
  <section class="parallax-container" ref="containerRef">

    <div :class="{'parallax-bg': true, 'hide': !isExtraLoaded}"
      ref="bgRef" :style="bgStyle">
      <slot name="content"></slot>
    </div>

    <Image
           :class="{'parallax-bg': true, 'hide': isExtraLoaded}"
           @load="onImageLoad"
           :src="src? src: ''" ref="imgBgRef" :style="bgStyle" />

    <div ref="parallax_content" :class="`${contentClass}`">
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, toRaw, reactive, type Ref, watch } from 'vue'
import componentsVar from '@/store/componentsVar'
import viewport from '@/store/viewport'
import Image from '../UI/Image.vue'
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

const isExtraLoaded = ref(false)

interface StyleRef {
  [key: string]: string;
}

let bgValue: HTMLElement | undefined
const containerRef = ref<HTMLDivElement>()
const parallax_content = ref<HTMLDivElement>()

const bgRef = ref<HTMLElement>()
const imgBgRef = ref<typeof Image>()

const props = defineProps({
  w: { type: String },
  h: { type: String },
  src: { type: String },
  contentClass: { type: String },
  extraContent: { type: Boolean, default: false },
  static: { type: Boolean, default: false },
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
      h: bgValue?.videoHeight ?? 1
    }
  }
  else if(bgValue instanceof HTMLImageElement) {
    return {
      w: bgValue?.naturalWidth ?? 1,
      h: bgValue?.naturalHeight ?? 1
    }
  } else {
    return {
      w: bgValue?.offsetWidth ?? 1,
      h: bgValue?.offsetHeight ?? 1
    }
  }
}

function getContentRect() {
  if(parallax_content.value) return parallax_content.value.getBoundingClientRect();
  return null
}

defineExpose({getContentRect})

function SetRealHeight() {
  const { w, h } = GetViewportSize()
  if (bgValue && containerRef.value) {
    let realH = (h + props.margin / 8)
    bgStyle.height = realH + 'px'
    let bgSize = GetBGSize()
    let realW = realH / bgSize.h * bgSize.w
    bgStyle.width = Math.max(realW, w) + 'px'
  }
}

watch(() => props.extraContent, (newValue, oldValue) => {
  isExtraLoaded.value = newValue
  if(newValue) {
    bgValue = bgRef.value;
    SetRealHeight()
    // UpdatePos()
    setScrollAnimation();
  } else {
    if(imgBgRef.value) {
      bgValue = imgBgRef.value.imgRef
      setScrollAnimation();
    }
    SetRealHeight()
    // UpdatePos()
  }
})

function onImageLoad() {
  SetRealHeight()
}

onMounted(() => {
  if(imgBgRef.value) {
    bgValue = imgBgRef.value.imgRef
  }

  // UpdatePos()
  window.addEventListener('resize', function() {
    SetRealHeight()
  })
  SetRealHeight()
  setScrollAnimation();
});

const setScrollAnimation = () => {
  if(!bgValue) {return;}
  let start = -props.margin;
  let end = props.margin;
  if(props.static) {return;}
  const scroll = componentsVar.scroll
  gsap.registerPlugin(ScrollTrigger)
  gsap.fromTo(bgValue, {
    translateY: `${start}px`,
  }, {
    translateY: `${end}px`,
    ease: 'none',
    // duration: 10,
    scrollTrigger: {
      scroller: scroll,
      trigger: containerRef.value,
      scrub: true,
    }
  })

}

</script>

<style>
.parallax-container {
  @apply overflow-hidden relative
  w-screen h-screen;
  width: 100svw;
  height: 100svh;
}

.parallax-container .parallax-bg {
  position: absolute;
  transform-origin: center center;
  top: 0;
  left: 0;
  object-fit: cover;
  overflow: hidden;
  transition: opacity 0.4s;
  max-width: unset;
}

div.parallax-bg {
  right: 0;
  bottom: 0;
}

.hide {
  position: absolute;
  opacity: 0;
}
</style>
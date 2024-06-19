<template>
  <div :class="`mouse-parallax-container z-[-1] ${blur? 'blur-xl':''}`" ref="containerRef">
    <Image :src="imageSrc" class="parallax-bg" :style="bgStyle" ref="imageRef"></Image>
  </div>
</template>

<script setup lang="ts">
import Image from '@/components/UI/Image.vue'
import type { Artwork } from '@/assets/data/artworks'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import componentsVar from '@/store/componentsVar'

function randint(min:number, max:number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const props = withDefaults(
  defineProps<{
    artworks: Artwork[];
    margin?: number;
    blur?: boolean
  }>(),
  {
    margin: 100,
    blur: false,
  }
)

const activeArtwork = ref<Artwork>();
const imageRef = ref();
const containerRef = ref();

const bgStyle = reactive({ zIndex: "-1", height: "0px", width: "0px" })

const imageSrc = ref<string>("")
let windowRatio = 1;

watch(() => props.artworks, () => {
  windowRatio = window.innerWidth / (window.innerHeight);
  console.log(windowRatio)

  let randomList: Artwork[] = [...props.artworks]
  // let randomList: Artwork[] = props.artworks
  randomList.sort((a: Artwork, b: Artwork) => {
    const diff1 = Math.abs((a.width / a.height) - windowRatio);
    const diff2 = Math.abs((b.width / b.height) - windowRatio);
    return diff1 - diff2;
  })
  randomList = randomList.slice(0, 23)
  console.log(windowRatio)
  activeArtwork.value = randomList[randint(0, 23)]
  imageSrc.value = activeArtwork.value.img[0];
  setBGSize();
})

function GetViewportSize() {
  return {
    w: (window.innerWidth || document.documentElement.clientWidth),
    h: (window.innerHeight || document.documentElement.clientHeight)
  }
}

defineExpose({activeArtwork})

const setBGSize = () => {
  const { w, h } = GetViewportSize()
  if(!activeArtwork.value) return;
  const bw = activeArtwork.value?.width;
  const bh = activeArtwork.value?.height;
  let realH = (h + props.margin)
  bgStyle.height = realH + 'px'
  let realW = realH / bh * bw
  bgStyle.width = Math.max(realW, w) + 'px'
}
window.onresize = setBGSize;

onMounted(() => {
  window.onmousemove = handleEffects;
})
const handleEffects = (e:any) => {
  const scroll = componentsVar.scroll
  if (!scroll || !containerRef.value) {return}
  const c = containerRef.value;

  setTimeout(function(){
    const x = e.pageX;
    const y = e.pageY;
    const ox = (window.innerWidth / 2 - x) / (window.innerWidth) * props.margin / 2;
    const oy = (window.innerHeight / 2 - y) / (window.innerHeight) * props.margin / 2;
    c.style.setProperty('--ox', -ox + "px")
    c.style.setProperty('--oy', -oy + "px")
  }, 50)

}

</script>

<style lang="postcss">
.mouse-parallax-container {
  @apply absolute
  flex items-center justify-center;
  top: 0;
  left: 0;
  width: 100svw;
  height: 100svh;
  transition: filter 250ms ease, transform 50ms linear;
}

.mouse-parallax-container .parallax-bg {
  transform-origin: center center;
  object-fit: cover;
  overflow: hidden;
  transition: opacity 0.4s;
  max-width: unset;
  scale: 1.05;
  transition: opacity 250ms ease, transform 50ms linear;
  transform: translate(var(--ox), var(--oy))
}

.image {
  @apply w-full;
}
</style>
<template>
  <div :class="`mouse-parallax-container z-[-1] ${blur? 'blur-xl':''}`" ref="containerRef">
    <Image :src="imageSrc" class="parallax-bg" :style="bgStyle" ref="imageRef"></Image>
  </div>
</template>

<script setup lang="ts">
import Image from '@/components/UI/Image.vue'
import { api_endpoint, type Artwork, type ArtworkItem, GetImageURL } from '@/assets/data/artworks'
import { onMounted, reactive, ref, watch } from 'vue'
import componentsVar from '@/store/componentsVar'
import { setting } from '@/store/setting'
import { AJAX } from '@/assets/data/requests'

const emit = defineEmits(['load'])

const props = withDefaults(
  defineProps<{
    margin?: number;
    blur?: boolean;
    enabled: boolean;
  }>(),
  {
    margin: 100,
    blur: false,
    enabled: true
  }
)

const activeArtwork = ref<Artwork>();
const imageRef = ref();
const containerRef = ref();

const bgStyle = reactive({ zIndex: "-1", height: "0px", width: "0px" })

const imageSrc = ref<string>("")
let windowRatio = 1;

watch(() => props.enabled, (val) => {
  if(!setting.mouse_animation) return;
  if(val) {window.addEventListener("mousemove", handleEffects);}
  else window.removeEventListener("mousemove", handleEffects);
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
  const bw = activeArtwork.value?.size[0];
  const bh = activeArtwork.value?.size[1];
  let realH = (h + props.margin)
  bgStyle.height = realH + 'px'
  let realW = realH / bh * bw
  bgStyle.width = Math.max(realW, w) + 'px'
}
window.onresize = setBGSize;

onMounted(() => {
  if(setting.mouse_animation) window.addEventListener("mousemove", handleEffects);
  windowRatio = window.innerWidth / (window.innerHeight);

  AJAX("GET", `${api_endpoint}/random?ratio=${windowRatio}`, function(status, resp) {
    if(status === 200) {
      const image = JSON.parse(resp)
      console.log(image)
      activeArtwork.value = image as Artwork;
      imageSrc.value = GetImageURL(image.img[0]);
      emit('load');
      setBGSize();
    }
  })
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

:root {
  --ox: 0;
  --oy: 0;
}

.mouse-parallax-container .parallax-bg {
  transform-origin: center center;
  object-fit: cover;
  overflow: hidden;
  max-width: unset;
  scale: 1.05;
  transition: opacity 250ms ease, transform 50ms linear;
  transform: translate(var(--ox), var(--oy))
}

.image {
  @apply w-full;
}
</style>
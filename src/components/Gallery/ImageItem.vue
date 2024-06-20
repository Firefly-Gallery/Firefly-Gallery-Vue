<template>
    <div :class="`image-item-container ${setting.animation ? 'skeleton':'bg-base-200'}`"
    ref="containerRef"
    :style="{aspectRatio: useMasonry ? imageData.width / imageData.height : 1}"
    @click="openWindow('imageViewer', {artwork: imageData})">
        <Image ref="imageRef" :src="imgSrc" :class="`image-item ${useMasonry? '':'square'}`"
               :img-alt="imageData.id" @onload="showImage" />
    </div>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { openWindow } from '@/components/Popup';
import Image from '@/components/UI/Image.vue'
import { type Artwork } from '@/assets/data/artworks'
import componentsVar from '@/store/componentsVar'
import { setting } from '@/store/setting'

const props = withDefaults(
  defineProps<{
    imageData: Artwork
    index: number
    useMasonry: boolean
  }>(),
  {
    useMasonry: true
  }
)

const emit = defineEmits(['mounted'])

const imageRef = ref();
const imgSrc = ref("")
const containerRef = ref();

let srcFilled = false;

let container:any;

onMounted(() => {
  const scroll = componentsVar.scroll
  if (!scroll || !containerRef.value) {return}
  container = containerRef.value;

  srcFilled = false;
  emit('mounted', container, fillSrc)
})

const fillSrc = () => {
  srcFilled = true;
  console.log(props.imageData.thumb)
  imgSrc.value = props.imageData.thumb;
}

const handleEffects = (e:any) => {
  const scroll = componentsVar.scroll
  if (!scroll || !container) {return}

  setTimeout(function(){
    const x = e.pageX - container.offsetLeft;
    const y = e.pageY - container.offsetTop - (window.innerHeight - scroll?.scrollTop);
    const ox = (container.offsetWidth / 2 - x);
    const oy = (container.offsetHeight / 2 - y);
    container.style.setProperty('--ox', -ox + "px")
    container.style.setProperty('--oy', -oy + "px")
    container.style.setProperty('--mx', x + "px")
    container.style.setProperty('--my', y + "px")
  }, 100)

}

const showImage = () => {
  if (container) {
    if(setting.animation) {
      container.classList.remove("skeleton");
    }
    if(setting.mouse_animation) {
      container.onmousemove = handleEffects;
    }
  }
}

const getContainer = () => {
  return containerRef.value;
}
const isFading = ref(false);
const setFading = (f:boolean) => {isFading.value = f}

defineExpose({getContainer, srcFilled, fillSrc, isFading, setFading})
</script>


<style lang="stylus" scoped>
.image-item-container
  @apply relative max-w-full overflow-hidden shadow-xl cursor-pointer;
  border-radius 18px
  z-index: 5
  outline 0 solid transparent
  margin-bottom 8px;
  transform translate(0, 0)
  transform-origin center center
  transition scale 250ms ease, outline 250ms ease, aspect-ratio 250ms ease, opacity 250ms ease, transform 100ms linear, box-shadow 250ms ease
  @media screen and (min-width: 700px)
    margin-bottom 20px

  &:hover
    @apply shadow-cyan-500/50;
    scale 1.12
    z-index 20
    outline 5px solid #80ffce
    transform translate(calc(var(--ox) / 40), calc(var(--oy) / 45))
    &:before
      opacity 0.4

  &:active
    scale 1.10
    z-index 20
    opacity 0.7

  &:before
    content ""
    position absolute
    top var(--my)
    left var(--mx)
    transform translate(-50%, -50%)
    background radial-gradient(rgba(255, 255, 255, 0.5), transparent, transparent)
    width 700px
    height 700px
    opacity 0
    transition opacity 250ms ease;
    pointer-events none

</style>
<style lang="stylus">
.image-item
  width: 100%
  border-radius 0 18px
  transition all 250ms ease
  object-fit cover

  &.square
    width 100%
    height 100%

&.skeleton
  @apply bg-base-300;
  .image-item
    opacity 0
</style>
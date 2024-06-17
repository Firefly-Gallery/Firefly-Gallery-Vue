<template>
    <div class="image-item-container preloading"
    ref="containerRef"
    :style="{aspectRatio: useMasonry ? imageData.width / imageData.height : 1}"
    @click="openWindow('imageViewer', {title: imageData.id, src: imageData.img})">
        <Image ref="imageRef" :src="imgSrc" :class="`image-item ${useMasonry? '':'square'}`"
               :img-alt="imageData.id" @onload="showImage" />
    </div>
</template>


<script lang="ts" setup>
import { ref, onMounted, toValue } from 'vue';
import { openWindow } from '@/components/Popup';
import Image from '@/components/UI/Image.vue'
import axios from 'axios';
import { type Artwork } from '@/assets/data/artworks'

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

const imageRef = ref();
const imgSrc = ref("")
const containerRef = ref();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(props.imageData.thumb)
      fillSrc(props.imageData.thumb);
      observer.unobserve(entry.target);
    }
  });
});

onMounted(() => {
  if (document.readyState === "complete") {
      observer.observe(containerRef.value);
  } else {
    document.addEventListener('readystatechange', () => {
      if (document.readyState === "complete") {
        observer.observe(containerRef.value);
      }
    });
  }
})

const fillSrc = (url: string) => {
  imgSrc.value = url;
}


const showImage = () => {
  if (containerRef.value) {
    containerRef.value.classList.remove("preloading");
  }
}

</script>


<style lang="stylus" scoped>
.image-item-container
  max-width: 100%;
  overflow hidden
  outline 4px solid transparent
  border-radius 18px
  margin-bottom 8px
  @apply shadow-xl cursor-pointer;
  transition scale 250ms ease, outline 250ms ease, aspect-ratio 250ms ease
  @media screen and (min-width: 700px)
    margin-bottom 20px

  &:hover
    scale 1.05
    box-shadow 0 0 0 0 white
    outline 4px solid white
    z-index 10
    @apply shadow-cyan-500/50;

  &:active
    scale 1.01
    outline 4px solid white
    z-index 10

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

&.preloading
  @apply bg-base-300;
  .image-item
    opacity 0
</style>
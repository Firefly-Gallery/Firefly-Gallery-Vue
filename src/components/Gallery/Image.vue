<template>
    <div class="image-item-container preloading"
    ref="containerRef"
    :style="{aspectRatio: useMasonry ? imageData.metadata.width / imageData.metadata.height : 1}"
    @click="openWindow('imageViewer', {title: imageData.title, src: imageData.imageUrl[0]})">
        <img :class="`image-item ${useMasonry? '':'square'}`" ref="imageRef" :source="imageData.thumbnailUrl[0]">
    </div>
</template>


<script lang="ts" setup>
import { ref, onMounted, toValue } from 'vue';
import { openWindow } from '@/components/Popup';
const props = defineProps(["imageData", "index", "useMasonry"])

const imageRef = ref();
const containerRef = ref();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            fillSrc();
            observer.unobserve(entry.target); // Stop observing once the image is in the viewport
        }
    });
});

onMounted(() => {
    console.log(1)
  
    if (document.readyState === "complete") {
        observer.observe(imageRef.value);
    } else {
      document.addEventListener('readystatechange', () => {
        if (document.readyState === "complete") {
            observer.observe(imageRef.value);
        }
      });
    }
})

const fillSrc = () => {
    if (imageRef.value) {
        imageRef.value.src = imageRef.value.getAttribute("source");
        imageRef.value.onload = () => {
            showImage()
        }
    }
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
  margin-bottom 15px
  overflow hidden
  outline 2px solid transparent
  border-radius 18px
  @apply shadow-xl cursor-pointer;
  transition scale 250ms ease, outline 250ms ease, aspect-ratio 250ms ease

  &:hover
    scale 1.05
    box-shadow 0px 0px 0px 0px white
    outline 2px solid white
    z-index 10
    @apply shadow-cyan-500/50;

  &:active
    scale 1.01
    outline 2px solid white
    z-index 10

  .image-item
    width: 100%
    border-radius 18px
    transition height 250ms ease
    object-fit cover

    &.square
      width 100%
      height 100%

  &.preloading
    @apply bg-base-300;
    .image-item
      opacity 0

</style>
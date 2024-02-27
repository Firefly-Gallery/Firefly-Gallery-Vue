<template>
  <div class="gallery-container px-2 md:px-16 lg:px-20 pt-20 w-full min-h-[200vh]">
    <div class="flex mx-5 my-10 gap-3"><p>Image ratio:</p><p>Square</p><input type="checkbox" class="toggle toggle-success"
      v-model="useMasonry" checked /><p>Original</p></div>
    <masonry
    :cols="{default: 5, 1440: 4, 1000: 3, 720: 2, 512: 1}"
    :gutter="{default: '15px', 700: '5px'}"
    >
      <Image v-for="(item, index) in page_data" :imageData="item" :index="index" :useMasonry="useMasonry" ref="containersRef" :key="index"></Image>
    </masonry>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Image from "@/components/Gallery/Image.vue";
import galleryData from "@/assets/gallery/metadata.json";
let page_data = galleryData.slice(0, 50)
// Declare a reactive reference to store the input value
const useMasonry = ref('');

</script>

<style lang="stylus" scoped>
</style>
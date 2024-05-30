<template>
  <ParallaxContainer :src="'/Home_VideoPreview.jpg'"
  :contentClass="'home-content'">
      <HelloWorld></HelloWorld>
  </ParallaxContainer>

  <div class="gallery-container">
    <div class="flex mx-5 my-10 gap-3"><p>Image ratio:</p><p>Square</p><input type="checkbox" class="toggle toggle-success"
                                                                              v-model="useMasonry" checked /><p>Original</p></div>
    <masonry
      :cols="{default: 6, 1440: 5, 1200: 4, 720: 3, 512: 2}"
      :gutter="{default: '15px', 700: '8px'}"
    >
      <ImageItem v-for="(item, index) in galleryData" :imageData="item" :index="index" :useMasonry="useMasonry" ref="containersRef" ></ImageItem>
    </masonry>
    <div class="pagination-container">
      <div class="join shadow-lg">
        <button class="join-item btn"><</button>
        <input class="join-item btn btn-square" type="radio" name="options" aria-label="1" checked />
        <input class="join-item btn btn-square" type="radio" name="options" aria-label="2" />
        <input class="join-item btn btn-square" type="radio" name="options" aria-label="3" />
        <input class="join-item btn btn-square" type="radio" name="options" aria-label="4" />
        <button class="join-item btn">></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ParallaxContainer } from "@/components/Common";
import HelloWorld from "@/components/Home/HelloWorld.vue";
import bg_video from "@/assets/videos/home_bg.webm"
import ImageItem from "@/components/Gallery/ImageItem.vue";

const galleryData = ref([])
let page_data = galleryData.value.slice(0, 50)
// Declare a reactive reference to store the input value
const useMasonry = ref(true);

onMounted(() => {
  fetch('/metadata.json')
    .then(response => response.json()) // Parse JSON response
    .then(data => {
      // Assign fetched data to fetchedData
      galleryData.value = data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

})
</script>

<style>
.parallax-container .home-content {
    @apply w-full h-full p-0 flex;
    background-color: #00000080;
    box-shadow: inset 0px 0px 16px 2px #00000033;
}
.parallax-container .two-row {
    @apply flex flex-col
    md:grid md:grid-cols-2;
}
.parallax-container  .col-reverse {
    @apply flex-col-reverse;
}
.title-poem p{
    @apply text-sm opacity-[0.5];
}
.gallery-container {
  @apply px-2 md:px-16 lg:px-20 py-20 w-full min-h-[200vh];
}
.pagination-container {
  @apply w-full flex justify-center mt-10;
}
</style>

<template>
  <MouseParallaxImage :artworks="galleryData" :blur="blurBG"></MouseParallaxImage>
  <div :class="`home-content ${blurBG ? 'bg-black/70' : 'bg-black/50'}`" ref="headerRef">
      <HelloWorld
        @hover="() => {if(setting.enable_blur){blurBG=true;}}"
        @unhover="() => {if(setting.enable_blur){blurBG=false;}}" :active-artwork="activeArtwork"></HelloWorld>
  </div>
  <div :class="`gallery-container ${setting.enable_blur? 'backdrop-blur-lg' : ''}`">
    <ArtworksContainer ref="artworkContainerRef" :artworks="galleryData"/>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import HelloWorld from "@/components/Home/HelloWorld.vue";
import componentsVar from '@/store/componentsVar'
import MouseParallaxImage from '@/components/Home/MouseParallaxImage.vue'
import ArtworksContainer from '@/components/Gallery/ArtworksContainer.vue'
import { Artwork } from '@/assets/data/artworks'
import { setting } from '@/store/setting'
import set = gsap.set

const blurBG = ref(false)

// let page_data = galleryData.value.slice(0, 50)
// Declare a reactive reference to store the input value

const artworkContainerRef = ref();
const headerRef = ref();
const galleryData = ref<Artwork[]>([])

const activeArtwork = ref<Artwork>()

const handleScroll = () => {

  if(headerRef.value && componentsVar.SetNavbarTransparent) {
    const bounding = headerRef.value.getBoundingClientRect();

    if (bounding.bottom > 0 && bounding.bottom <= (window.innerHeight) + 10) {
      componentsVar.SetNavbarTransparent(true);
    } else {
      componentsVar.SetNavbarTransparent(false);
    }
  }
}

onMounted(() => {
  const scroll = componentsVar.scroll
  scroll?.addEventListener("scroll", handleScroll);

  fetch('/metadata.json')
    .then(response => response.json()) // Parse JSON response
    .then(data => {
      // Assign fetched data to galleryData
      const artworks: Artwork[] = [];
      Object.entries(data).forEach(([key, value]) => {
        artworks.push(new Artwork(key, value))
      });

      galleryData.value = artworks.reverse();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  if(artworkContainerRef.value) {
    console.log(artworkContainerRef.value);
    activeArtwork.value = artworkContainerRef.value.activeArtwork
  }
})
</script>

<style lang="postcss">

.home-content {
    @apply w-screen h-[100lvh] p-0 flex;
    box-shadow: inset 0 -3px 10px 0 #00000033;
    transition: all 250ms ease;
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
  @apply px-2 md:px-16 lg:px-20 pb-20 pt-8 w-full min-h-[200vh]
  bg-base-300/30;
}
[data-theme='dark'] .gallery-container {
  @apply bg-base-300/90
}
.pagination-container {
  @apply w-full flex justify-center mt-10;
}
</style>

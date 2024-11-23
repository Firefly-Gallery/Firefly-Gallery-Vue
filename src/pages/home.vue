<template>
  <MouseParallaxImage ref="randomImageRef" @load="setActivaArtwork()" :blur="blurBG" :enabled="!blurBG"></MouseParallaxImage>
  <div :class="`home-content ${blurBG ? 'bg-base-300/70' : 'bg-base-100/50'}`" ref="headerRef">
      <HelloWorld
        @hover="() => {if(setting.enable_blur){blurBG=true;}}"
        @unhover="() => {if(setting.enable_blur){blurBG=false;}}" :active-artwork="activeArtwork"></HelloWorld>
  </div>
  <div :class="`gallery-container`">
    <ArtworksContainer :artworks="galleryData" @need-update="update()" :loaded="allLoaded" :total="total" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import HelloWorld from '@/components/Home/HelloWorld.vue'
import componentsVar from '@/store/componentsVar'
import MouseParallaxImage from '@/components/Home/MouseParallaxImage.vue'
import ArtworksContainer from '@/components/Gallery/ArtworksContainer.vue'
import { api_endpoint, type Artwork, type ArtworkItem } from '@/assets/data/artworks'
import { setting } from '@/store/setting'
import { AJAX } from '@/assets/data/requests'

const blurBG = ref(false)
const allLoaded = ref(false)

const randomImageRef = ref();
const headerRef = ref();
const galleryData = ref<ArtworkItem[]>([])

const activeArtwork = ref<Artwork>()
const total = ref(0)

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

let maxPage = 999;

function update() {
  page++;
  if(page > maxPage) {
    allLoaded.value = true;
    return
  }
  AJAX("GET", `${api_endpoint}/list?page=${page}`, function(status, resp) {
    if(status === 200) {
      const images = JSON.parse(resp).images as ArtworkItem[]
      const original = [...galleryData.value]
      maxPage = JSON.parse(resp).pages;
      galleryData.value = original.concat(images);
      total.value = JSON.parse(resp).total;
    }
  })
}
onMounted(() => {
  const scroll = componentsVar.scroll
  scroll?.addEventListener("scroll", handleScroll);
  if(componentsVar.SetNavbarTransparent !== null) componentsVar.SetNavbarTransparent(true);

})
let page = 0;



function setActivaArtwork(){
  if(randomImageRef.value) {
    activeArtwork.value = randomImageRef.value.activeArtwork
  }
}


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
  bg-base-300/30 relative z-[2];
}
[data-theme='dark'] .gallery-container {
  @apply bg-base-300/90
}
.pagination-container {
  @apply w-full flex justify-center mt-10;
}
</style>

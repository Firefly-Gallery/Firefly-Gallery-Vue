<template>
  <div class="flex items-center mx-5 mt-14 mb-8 gap-3">
    <p>共 {{total}} 张画作</p>
    <div class="grow"></div>
    <div role="tablist" class="tabs tabs-boxed gap-2 p-2 rounded-xl">
      <button role="tab" :class="`tab btn btn-sm ${useMasonry ? 'btn-ghost':'btn-primary'}`"
      @click="toggleMasonry(false)">
        <Squares2X2Icon class="h-6 w-6" />
      </button>
      <button role="tab" :class="`tab btn btn-sm ${useMasonry ? 'btn-primary':'btn-ghost'}`"
      @click="toggleMasonry(true)">
        <AdjustmentsVerticalIcon class="h-6 w-6" />
      </button>
    </div>
  </div>

  <masonry
    :cols="{default: 6, 1440: 5, 1200: 4, 720: 3, 512: 2}" :key="updateKey"
    :gutter="{default: '20px', 700: '8px'}" :class="'masonry-root'"
  >
    <ImageItem
      v-for="(item, index) in artworks.concat(Array(6 * <number>!loaded).fill({id: '-1', size: [100, 100], thumb: ''}))"
      :imageData="item"
      :key="item.id"
      :index="index"
      :art_index="index"
      :art_id="item.id"
      :useMasonry="useMasonry"
      ref="containersRef"
      @mounted="applyObserver"
    ></ImageItem>
  </masonry>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { gsap } from 'gsap'
import ImageItem from '@/components/Gallery/ImageItem.vue'
import { Squares2X2Icon, AdjustmentsVerticalIcon } from "@heroicons/vue/24/outline";
import { setting } from '@/store/setting'
import type { ArtworkItem } from '@/assets/data/artworks'

const updateKey = ref(0)
let updating = false;

const props = withDefaults(
  defineProps<{
    artworks: ArtworkItem[]
    loaded: boolean
    total: number
  }>(),
  {
  }
)

const useMasonry = ref(true);
const containersRef = ref<typeof ImageItem[]>([]);
const artIndexList = ref<number[]>([])

const emit = defineEmits(['needUpdate'])

watch(() => props.artworks, () => {
  nextTick(() => {
    containersRef.value.forEach((element, index) => {
      const imageIndex = getElementArtIndex(element.getContainer())
      if(!imageIndex && imageIndex !== 0) return;
      artIndexList.value[imageIndex] = index;
    });
    setTimeout(() => {updating = false;}, 200);
  })
})

const getElementArtIndex = (element:Element) => {
  let imageIndexAttr = element.getAttribute("art_index")
  let imageId = element.getAttribute("art_id")
  if (
    (imageIndexAttr) &&
    (imageId && imageId !=="-1")
  ) {
    return parseInt(imageIndexAttr);
  } else return undefined;
}

// const fields = ['author', 'img', 'size', 'src', 'thumb', 'time']
const toggleMasonry = (v:boolean) => {
  useMasonry.value = v;
}


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const imageElement = entry.target
    if(imageElement.getAttribute("art_id") === "-1") {
      if(!updating) {emit("needUpdate");console.log("next page")}
      updating = true;
      return;
    }
    const imageIndex = getElementArtIndex(imageElement)
    if(!imageIndex && imageIndex !== 0) {return;}
    const realIndex = artIndexList.value[imageIndex];
    const imageItem = containersRef.value[realIndex];
    if (entry.isIntersecting) {
      if(!imageItem.srcFilled) {imageItem.fillSrc();}

      if(setting.transition && !imageItem.isFading) {
        const rect = imageElement.getBoundingClientRect();
        setFadeInAnim(imageItem, (rect.bottom > window.innerHeight) ? 1 : -1)
      }
    } else if(setting.transition) {
      deleteStyles(imageElement)
    }
  });
});

const applyObserver = (container:HTMLElement, fill:any) => {
  if(setting.lazy_load) {
    observer.observe(container);
  } else {
    fill();
  }
}

const deleteStyles = (container:any) => {
  container.style.transition = "unset"
  container.style.opacity = "0";
}

const resetStyles = (container:HTMLElement) => {
  container.style.transform = "";
  container.style.translate = "";
  container.style.rotate = "";
  container.style.scale = "";
  container.style.opacity = "";
  container.style.transition = "";
};

const setFadeInAnim = (imageItem:(typeof ImageItem), direction:number) => {
  if(!imageItem || !direction) return;
  const imageContainer = imageItem.getContainer();
  imageItem.setFading(true);
  deleteStyles(imageContainer)
  gsap.fromTo(imageContainer, {
    opacity: 0.0,
    scale: 1.1,
    y: direction * 200,
  }, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.25,
    ease: "circ.out",
    // stagger: 0.01,
    onComplete: () => {
      gsap.killTweensOf(imageContainer)
      imageItem.setFading(false);
      resetStyles(imageContainer)
    }
  });

}

</script>

<style lang="postcss">
.masonry-root {
  @apply select-none;
}
</style>
<style scoped lang="stylus">

</style>
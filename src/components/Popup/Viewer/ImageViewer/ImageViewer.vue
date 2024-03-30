<template>
  <Viewer :index="props.index" :show="props.show" @close="close" :hideBars="hideBars" :loaded="loaded">
    <template v-slot:title>
      <PhotoIcon class="logo" />
      <span class="title-text">{{ imageViewerData.title }}</span>
    </template>
    <template v-slot:top_right>
      <a class="download-link" @click="downloadImage">
        <DocumentArrowDownIcon class="w-9 h-9"/>
      </a>
    </template>

    <template v-slot:middle>
      <div class="image-switch-container">
        <div id="switch-left"
             :class="`image-switch ${imageViewerData.currentPage == 0 || imageViewerData.src.length <= 1? 'disable':''}`"
        @click="imageViewerData.currentPage -= 1">
          <svg width="32" height="57" viewBox="0 0 32 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 54L28.622 29.3566C28.8283 29.1619 28.8316 28.8347 28.629 28.636L2.5 3" stroke="white" stroke-width="5" stroke-linecap="round"/>
            <circle cx="5" cy="29" r="5" transform="rotate(-90 5 29)" fill="white"/>
          </svg>
        </div>
        <div id="switch-right"
             :class="`image-switch ${imageViewerData.currentPage >= imageViewerData.src.length-1? 'disable':''}`"
        @click="imageViewerData.currentPage += 1">
          <svg width="32" height="57" viewBox="0 0 32 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 54L28.622 29.3566C28.8283 29.1619 28.8316 28.8347 28.629 28.636L2.5 3" stroke="white" stroke-width="5" stroke-linecap="round"/>
            <circle cx="5" cy="29" r="5" transform="rotate(-90 5 29)" fill="white"/>
          </svg>
        </div>
      </div>
    </template>


    <div class="viewer-container" ref="imageContainerRef">
      <PinchScrollZoom
        ref="zoomer"
        within
        key-actions
        :width="scrWidth"
        :height="scrHeight"
        @scaling="e => onEvent('scaling', e)"
        @startDrag="e => onEvent('startDrag', e)"
        @stopDrag="e => onEvent('stopDrag', e)"
        @dragging="e => onEvent('dragging', e)"
        :min-scale="1"
        :max-scale="6"
        :class="`zoomer ${loaded? '':'disable'}`"
      >
        <img :src="currentImageUrl"
        @load="loaded=true">
      </PinchScrollZoom>
    </div>
  </Viewer>
</template>

<script lang="ts" setup>
import './PinchScrollZoom/psz.css';
import Viewer from '../Common/Viewer.vue';
import { ref, onMounted, reactive, computed, watch } from 'vue'
import { PhotoIcon, DocumentArrowDownIcon } from "@heroicons/vue/24/outline";
import { imageViewerData } from './'
import { saveAs } from 'file-saver'
import PinchScrollZoom, {
  type PinchScrollZoomEmitData,
  type PinchScrollZoomExposed
} from './PinchScrollZoom';

const zoomer = ref<PinchScrollZoomExposed>();

const scrWidth = ref<number>(1920);
const scrHeight = ref<number>(960);

const hideBars = ref<boolean>(false);

const UpdateScreenSize = () => {
  scrWidth.value = window.innerWidth;
  scrHeight.value = window.innerHeight;
}
onMounted(() => {
  imageViewerData.currentPage = 0;
  UpdateScreenSize();
  window.addEventListener('resize', UpdateScreenSize)
})

const state = reactive({
  eventName: "",
  scale: 0,
  originX: 0,
  originY: 0,
  translateX: 0,
  translateY: 0,
})

function onEvent(name: string, e: PinchScrollZoomEmitData): void {
  state.eventName = name;
  state.scale = e.scale;
  state.originX = e.originX;
  state.originY = e.originY;
  state.translateX = e.translateX;
  state.translateY = e.translateY;
  if(state.scale==1 && hideBars.value) {
    hideBars.value = false;
  } else if (state.scale > 1 && !hideBars.value) {
    hideBars.value = true;
  }
}

const loaded = ref(false);
const currentImageUrl = computed(() => {
  // Retrieve the image URL based on the current index value
  return imageViewerData.src[imageViewerData.currentPage];
});

watch(imageViewerData, (newValue, oldValue) => {
  console.log("changed")
  loaded.value = false;
});

function getFileExtension(url: string) {
  const parts = url.split('.');
  if (parts.length > 0) {
      const extension = parts.pop()!.toLowerCase();
      return extension;
  } else {
      console.error("Invalid URL format");
  }
}

const props = withDefaults(
defineProps<{
  show?: boolean
  name: string
  index: number
}>(),
  {
    show: true
  }
)

const imageContainerRef = ref();

const downloadImage = () => {
  saveAs(imageViewerData.src[0], `${imageViewerData.title}.${getFileExtension(imageViewerData.src[0])}`);
}

const emits = defineEmits<{
  (event: 'close', name: string): void
}>()

const close = () => {
  emits('close', props.name)
}
</script>

<style lang="stylus" scoped>
.logo
  @apply w-10 h-10 p-2 rounded-full;
  background-color #f1f1f1
  color black
span.title-text
  color white
  @apply text-xl;

a.download-link
  cursor pointer
  transition: color 250ms ease, scale 250ms ease
  &:hover
    scale 1.1
  &:active
    scale 0.9
    color #5ab5ac

.viewer-container
  transition all 350ms ease
  width 100%
  height 100%
  overflow auto
  display flex
  justify-content center

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 0px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #545454;
  }
.image-switch-container
  width 100%
  height 100%
  display flex
  justify-content space-between
  .image-switch
    transition all 250ms ease
    pointer-events auto
    cursor pointer
    width 75px
    display flex
    justify-content center
    align-items center
    &#switch-left
      transform rotate(180deg)
    svg
      filter: drop-shadow(0px 3px 6px black)
      scale 0.7
    &:hover
      background-color #ffffff20
      svg
        filter: drop-shadow(0px 3px 6px orange)
        scale 0.9
        transform translateX(4px)

      path
        stroke orange
      circle
        //scale 0.7
        fill #ffb739
    &:active
      background-color #ffffff10
      svg
        scale 0.7
        transform translateX(2px)

      path
        stroke #a26b00
      circle
        fill #a26b00
    *
      transition all 350ms cubic-bezier(0, 0, 0, 1)

.disable
  pointer-events none!important
  opacity 0
.zoomer
  transition opacity 150ms ease
</style>
<style lang="stylus">
.pinch-scroll-zoom__content
  display flex
  flex-direction row
  justify-content center
  transition all 100ms ease
  img
    width auto
    height 100%
    object-fit contain
</style>

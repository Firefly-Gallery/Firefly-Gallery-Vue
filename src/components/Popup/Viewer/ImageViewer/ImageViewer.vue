<template>
  <Viewer :index="props.index" :show="props.show" @close="close" :hideBars="hideBars" :loaded="loaded">
    <template v-slot:title>
      <PhotoIcon class="logo" />
      <span class="title-text">{{ imageViewerData.title }}</span>
    </template>
    <template v-slot:top_right>
      <a class="download-link" @click="downloadImage">
      </a>
    </template>

    <template v-slot:middle>
      <div class="image-switch-container">
        <div id="switch-left"
             :class="`image-switch ${imageViewerData.currentPage == 0 || pageCount <= 1? 'disable':''}`"
        @click="imageViewerData.currentPage -= 1">
          <svg width="32" height="57" viewBox="0 0 32 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 54L28.622 29.3566C28.8283 29.1619 28.8316 28.8347 28.629 28.636L2.5 3" stroke="white" stroke-width="5" stroke-linecap="round"/>
            <circle cx="5" cy="29" r="5" transform="rotate(-90 5 29)" fill="white"/>
          </svg>
        </div>
        <div id="switch-right"
             :class="`image-switch ${imageViewerData.currentPage >= pageCount-1? 'disable':''}`"
        @click="imageViewerData.currentPage += 1">
          <svg width="32" height="57" viewBox="0 0 32 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 54L28.622 29.3566C28.8283 29.1619 28.8316 28.8347 28.629 28.636L2.5 3" stroke="white" stroke-width="5" stroke-linecap="round"/>
            <circle cx="5" cy="29" r="5" transform="rotate(-90 5 29)" fill="white"/>
          </svg>
        </div>
      </div>
      <div class="image-info-container">
        <div :class="`image-info ${showDetails? 'detail':''}`" ref="infoContainer">
          <p v-if="showDetails" class="m-3 mt-4">
            画师：@{{ imageAuthor }}
          </p>
          <p v-if="showDetails" class="m-3">
            原链接：<a class="underline text-secondary" target="_blank" :href="imageLink">{{ imageLink }}</a>
          </p>
          <div class="info-bottom">
            <p class="page-indicator">
              {{imageViewerData.currentPage+1}} / {{pageCount}}
            </p>
            <div class="flex flex-nowrap">
              <a class="btn btn-circle btn-sm btn-ghost" @click="downloadImage">
                <ArrowDownTrayIcon class="h-5 w-5" />
              </a>
              <button class="btn btn-circle btn-sm btn-ghost" :disabled="isAnimating"
                      @click="toggleDetails" v-if="imageViewerData.artwork">
                <EllipsisVerticalIcon class="h-6 w-6"/>
              </button>
            </div>

          </div>
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
        <img :src="currentImageUrl" alt="无法加载图片..."
        @load="loaded=true">
      </PinchScrollZoom>
    </div>
  </Viewer>
</template>

<script lang="ts" setup>
import './PinchScrollZoom/psz.css';
import Viewer from '../Common/Viewer.vue';
import { ref, onMounted, reactive, computed, watch, nextTick } from 'vue'
import {
  PhotoIcon,
  ArrowDownTrayIcon,
  EllipsisVerticalIcon
} from "@heroicons/vue/24/outline";
import { imageViewerData } from './'
import PinchScrollZoom, {
  type PinchScrollZoomEmitData,
  type PinchScrollZoomExposed
} from './PinchScrollZoom';
import { gsap } from 'gsap';

const infoContainer = ref()

const toggleDetails = () => {
  if(!infoContainer.value) return;
  const container = infoContainer.value;
  const previousWidth = container.clientWidth;
  const previousHeight = container.clientHeight;
  showDetails.value = !showDetails.value;

  nextTick(() => {
    let newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    let ease = "back.out(1)"
    if(!showDetails.value) {
      ease = "power2.out"
    }
    isAnimating.value = true
    gsap.fromTo(container, {
        width: previousWidth,
        height: previousHeight
      }, {
        width: newWidth,
        height: newHeight,
        duration: 0.4,
        ease: ease,
        onComplete: () => {
          isAnimating.value = false
          gsap.killTweensOf(container)
          resetStyles(container)
        }
      }
    );
  });
}
const resetStyles = (container:HTMLElement) => {
  container.style.transform = "";
  container.style.translate = "";
  container.style.rotate = "";
  container.style.scale = "";
  container.style.opacity = "";
  container.style.transition = "";
  container.style.width = "";
  container.style.height = "";
};

const zoomer = ref<PinchScrollZoomExposed>();

const scrWidth = ref<number>(1920);
const scrHeight = ref<number>(960);
const pageCount = ref<number>(0);

const hideBars = ref<boolean>(false);
const showDetails = ref<boolean>(false);
const isAnimating = ref<boolean>(false);

const imageAuthor = ref<string>("Unset")
const imageLink = ref<string>("Unset")

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
  if(!imageViewerData.src) return "";
  return imageViewerData.src[imageViewerData.currentPage];
});

// viewer每次事件初始化入口
watch(imageViewerData, () => {
  if(imageViewerData.artwork) {
    imageViewerData.src = imageViewerData.artwork.img;
    imageAuthor.value = imageViewerData.artwork.author;
    imageLink.value = imageViewerData.artwork.src;
    imageViewerData.title = imageViewerData.artwork.id
  }
  if(showDetails.value) {toggleDetails()}
  if(!imageViewerData.src) {return}
  pageCount.value = imageViewerData.src.length;
  loaded.value = false;
});

const saveAsBlob = (imageUrl:string, filename:string) => {
  fetch(imageUrl, {
    method: "GET",
  }).then(response => {
      console.log(response)
      return response.blob()
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename; // Set the desired file name
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    })
    .catch(err => console.error('Failed to download image', err));
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
  if(!imageViewerData.src) return "";
  const imageSrc = imageViewerData.src[imageViewerData.currentPage]
  const imageName = imageSrc.substring(imageSrc.lastIndexOf('/')+1)
  saveAsBlob(imageSrc, imageName);
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
    margin: 0 0;
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

.image-info-container
  @apply absolute bottom-0 left-0 right-0 flex justify-center items-center;
  z-index 100
  .image-info
    @apply m-3 bg-base-200/75 rounded-3xl p-2 flex flex-col justify-end items-stretch;
    backdrop-filter blur(16px)
    box-shadow 0 7px 17px 0 #000000c2
    pointer-events all
    overflow hidden
    >p
      overflow hidden
      white-space nowrap
      //text-overflow ellipsis
      transition all 250ms ease;
    .info-bottom
      @apply flex justify-between items-center gap-2
      .page-indicator
        overflow none
        white-space nowrap
        @apply px-4 pb-1;

    &.detail
      .info-bottom
        @apply mt-2;
        .page-indicator
          @apply px-3;



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

<template>
  <Popup :index="props.index">
    <div v-if="show" class="viewer-bg">
      <div class="img" data-v-529b66a4=""><img src="@/assets/UI/背景.png" alt="" data-v-529b66a4=""></div>
      <div class="overlay">
        <div class="title">
          <PhotoIcon class="logo" />
          <span>{{ viewerData.title }}</span>
        </div>
        <div class="right">
          <a class="download-link" @click="downloadImage">
            <DocumentArrowDownIcon class="w-9 h-9"/>
          </a>
          <Close
            class="close"
            @click="close"
          />
        </div>
      </div>
      <div class="viewer-container" ref="imageContainerRef">
        <img :src="viewerData.src" @click="SetZoom">
      </div>
    </div>
  </Popup>
</template>

<script lang="ts" setup>
import Popup from '@/components/UI/Popup.vue'
import Close from '@/components/UI/Close.vue'
import Btn from '@/components/UI/Btn.vue'
import { ref, onMounted } from 'vue';
import Scrollbar from 'smooth-scrollbar';
import { PhotoIcon, DocumentArrowDownIcon } from "@heroicons/vue/24/outline";
import { viewerData } from './'
import { saveAs } from 'file-saver'

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

let scrollBar: any = undefined;

const zoomed = ref(false);

const SetZoom = () => {
  if(!scrollBar) {initScroll();}
  if(imageContainerRef.value) {
    zoomed.value = !zoomed.value
    imageContainerRef.value.classList.toggle("zoomed");
    if(zoomed.value && !imageContainerRef.value.classList.contains("zoomed")) {
      imageContainerRef.value.classList.toggle("zoomed");
    }
  }
}

const imageContainerRef = ref();

const downloadImage = () => {
  saveAs(viewerData.src, `${viewerData.title}.${getFileExtension(viewerData.src)}`);
}


const initScroll = () => {
  if(imageContainerRef.value) {
    console.log(imageContainerRef.value);
    scrollBar = Scrollbar.init(imageContainerRef.value, {"damping": 0.05});
  }
}

const emits = defineEmits<{
  (event: 'close', name: string): void
}>()

const close = () => {
  emits('close', props.name)
}
</script>

<style lang="stylus" scoped>
.viewer-bg
  @apply w-full h-full;
  background: rgba(255,255,255,.1);
  &:before
    content ""
    z-index -1
    position absolute
    top 0px
    right 0px
    bottom 0px
    left 0px
    background url("@/assets/UI/方块背景.webp")
    background-size 8px 8px
    opacity 0.15
  .img 
    z-index -1
    overflow hidden
    position absolute
    top 0px
    left 0px
    width 280px
    height 230px
    opacity .5
    pointer-events none
    -webkit-user-select none
    user-select none
    img
      position absolute
      bottom 0
      right 0
      animation rotate 60s linear infinite
      max-width 430px
      opacity 0.5;
      height initial
  
.overlay
  position absolute
  z-index 4000
  top 0
  left 0
  width 100%
  display flex
  flex-direction row
  justify-content space-between
  align-items center
  padding 15px
  pointer-events none

  .title
    @apply flex flex-row items-center justify-center gap-3;
    .logo
      @apply w-10 h-10 p-2 rounded-full;
      background-color #f1f1f1
      color black
    span
      color white
      @apply text-xl;
  
  .right
    @apply flex flex-row gap-4 items-center;
    pointer-events auto

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

  img
    width auto
    height 100%
    object-fit contain
    cursor zoom-in

  &.zoomed
    display block

    img
      cursor zoom-out
      width 100%
      height auto

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


.fade-enter-active .viewer-container,
.fade-leave-active .viewer-container
  transition all 350ms var(--popup-ease)

.fade-enter-from .viewer-container,
.fade-leave-to .viewer-container
  transform translateY(5%)
  opacity 0

</style>
<style lang="stylus">
.overlay
  .close
    div
      background #a6adbb !important

    &:hover
      div
        background #f19d38 !important

</style>

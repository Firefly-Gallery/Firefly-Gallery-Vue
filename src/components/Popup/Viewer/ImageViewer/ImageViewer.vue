<template>
  <Viewer :index="props.index" :show="props.show" @close="close">
    <template v-slot:title>
      <PhotoIcon class="logo" />
      <span class="title-text">{{ imageViewerData.title }}</span>
    </template>
    <template v-slot:top_right>
      <a class="download-link" @click="downloadImage">
        <DocumentArrowDownIcon class="w-9 h-9"/>
      </a>
    </template>
    <div class="viewer-container" ref="imageContainerRef">
      <img :src="imageViewerData.src" @click="SetZoom">
    </div>
  </Viewer>
</template>

<script lang="ts" setup>
import Viewer from '../Common/Viewer.vue';
import { ref, onMounted } from 'vue';
import Scrollbar from 'smooth-scrollbar';
import { PhotoIcon, DocumentArrowDownIcon } from "@heroicons/vue/24/outline";
import { imageViewerData } from './'
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
  saveAs(imageViewerData.src, `${imageViewerData.title}.${getFileExtension(imageViewerData.src)}`);
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

</style>

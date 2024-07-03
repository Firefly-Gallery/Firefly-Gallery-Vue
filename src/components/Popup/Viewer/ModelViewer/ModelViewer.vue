<template>
  <Viewer :index="props.index" :show="props.show" @close="close" :loaded="loaded">
    <template v-slot:title>
      <CubeIcon class="logo" />
      <span class="title-text">模型</span>
    </template>
    <template v-slot:top_right>
      
    </template>
    <div class="viewer-container" ref="imageContainerRef">
      <iframe src="https://model-preview.hsr-firefly.com.cn/"
      ref="iframeRef" @load="loaded=true" v-show="loaded" allowtransparency="true"></iframe>
    </div>
  </Viewer>
</template>

<script lang="ts" setup>
import Viewer from '../Common/Viewer.vue';
import { ref, onMounted } from 'vue';
import { CubeIcon } from "@heroicons/vue/24/outline";
import LoadingIcon from '@/components/Loading/LoadingIcon.vue';

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

const loaded = ref(false);

const iframeRef = ref();

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

.viewer-container
  transition all 350ms ease
  width 100%
  height 100%
  overflow hidden
  display flex
  justify-content center
  background linear-gradient(to top, #7f6e4cd9, rgba(0,0,0,0))

  iframe
    flex-grow 1
    color-scheme none


</style>

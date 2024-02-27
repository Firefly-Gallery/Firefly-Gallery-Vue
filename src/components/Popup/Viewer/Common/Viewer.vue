<template>
  <Popup :index="props.index">
    <div v-if="props.show" class="viewer-bg">
      <div class="img" data-v-529b66a4=""><img src="@/assets/UI/背景.png" alt="" data-v-529b66a4=""></div>
      <div class="overlay">
        <div class="title">
          <slot name="title"></slot>
        </div>
        <div class="right">
          <slot name="top_right"></slot>
          <Close
            class="close"
            @click="close"
          />
        </div>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </Popup>
</template>

<script lang="ts" setup>
import Popup from '@/components/UI/Popup.vue'
import Close from '@/components/UI/Close.vue'
import { closeWindow } from '@/components/Popup';

const props =defineProps<{
  show?: boolean
  index: number
}>()

const emits = defineEmits<{
  (event: 'close'): void
}>()

const close = () => {
  emits('close')
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
  
  .right
    @apply flex flex-row gap-4 items-center;
    pointer-events auto

.content
  @apply w-full h-full;

.fade-enter-active,
.fade-leave-active
  .overlay, .content
    transition all 350ms var(--popup-ease)

.fade-enter-from,
.fade-leave-to
  .overlay
    transform translateY(55%)
    opacity 0
  .content
    transform translateY(15%)
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

<template>
  <Popup :index="index">
    <div v-if="show" :class="`viewer-bg ${hideBars? 'bg-black':''}`">
      <div class="img"><img :src="bg" alt="" data-v-529b66a4=""></div>
      <transition name="fade">
        <div class="overlay" v-if="!hideBars">
          <div class="overlay-top">
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
          <div class="overlay-middle">
            <slot name="middle"></slot>
          </div>
        </div>
      </transition>
      <div class="content">
        <slot></slot>
        <div class="loading-overlay" v-show="!loaded">
          <LoadingIcon :isLoading="true"></LoadingIcon>
        </div>
      </div>
    </div>
  </Popup>
</template>

<script lang="ts" setup>
import Popup from '@/components/UI/Popup.vue'
import Close from '@/components/UI/Close.vue'
import bg from '@/assets/UI/Interface_BackgroundTrail.png'
import { closeWindow } from '@/components/Popup';
import LoadingIcon from '../../../Loading/LoadingIcon.vue'

const props =defineProps<{
  show?: boolean
  hideBars?: boolean
  index: number
  loaded: boolean
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
  transition background 150ms ease;
  &.bg-black
    background-color #000000e0;
  &:before
    content ""
    z-index -1
    position absolute
    top 0px
    right 0px
    bottom 0px
    left 0px
    background url("@/assets/UI/Interface_SquareBackground.webp")
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
  height 100%
  display flex
  flex-direction column
  pointer-events none

  .overlay-top
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    padding 15px
    transition all 150ms ease;

    .title
      @apply flex flex-row items-center justify-center gap-3;

    .right
      @apply flex flex-row gap-4 items-center;
      pointer-events auto

  .overlay-middle
    flex-grow 1

.content
  @apply w-full h-full;

.fade-enter-active,
.fade-leave-active
  .overlay, .content
    transition all 350ms var(--popup-ease)

.fade-enter-from,
.fade-leave-to
  .overlay
    transform translateY(5%)
    opacity 0
  .content
    transform translateY(5%)
    opacity 0

.loading-overlay
  @apply absolute w-full h-full flex justify-center items-center;
  top 0
  background-color #00000070
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

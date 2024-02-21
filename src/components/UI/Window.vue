<template>
  <div
    v-if="show"
    class="window"
  >
    <div class="window-scaler"
      :style="{
        transform: `scale(${scale})`,
      }"
    >
      <div
        class="box"
        :style="{
          width: props.width,
          height: props.height,
          minWidth: props.minWidth,
          minHeight: props.minHeight,
          // transform: `scale(${scale})`,
        }"
        @click.stop
      >
        <div
          class="outside"
          v-if="slot.outside"
        >
          <slot name="outside"></slot>
        </div>
        <div class="wrapper">
          <div
            class="left"
            v-if="slot.left"
          >
            <slot name="left"></slot>
          </div>
          <div class="right">
            <div
              class="title"
              :style="{ justifyContent: confirm ? 'center' : undefined }"
            >
              <span>
                {{ title }}
              </span>

              <Close
                v-if="!!onClose && !confirm"
                class="close"
                @click="close"
              />
            </div>
            <div class="content">
              <slot></slot>
            </div>
            <slot name="bottom"></slot>
          </div>
        </div>
        <div
          class="footer"
          v-if="slot.footer"
        >
          <div class="bg"></div>
          <div class="btn-list">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Close from './Close.vue'

import viewport from '@/store/viewport'
import { toRef } from 'vue';


const props = withDefaults(
  defineProps<{
    show?: boolean
    confirm?: boolean
    title: string
    width?: string
    minWidth?: string
    height?: string
    minHeight?: string
    onClose?: () => void
  }>(),
  {
    show: true
  }
)

// 计算窗口尺寸
const target = 1000
const scale = toRef(viewport, 'scale')

const setSize = () => {
  viewport.scale = Math.min(window.innerWidth, window.innerHeight) / target
}
setSize()

window.onresize = () => {
  setSize()
}

const slot = defineSlots()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const close = () => {
  emit('close')
}
</script>

<style lang="stylus" scoped>
@import './Window.styl'

.window
  color var(--text-color)
  display flex
  flex-direction column
  justify-content center
  align-items center
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background rgba(0, 0, 0, 0.2)
  
  .window-scaler
    width 100%
    height 100%
    display flex
    align-items center
    justify-content center
  .box
    position relative
    display flex
    flex-direction column
    width fit-content
    width -moz-fit-content
    max-width 100%
    height fit-content
    height -moz-fit-content
    max-height 100%
    background var(--box-background-color)
    message()

    .outside
      position absolute
      left -75px
      top 0

    .wrapper
      flex 1
      overflow hidden
      display flex
      align-items center
      width 100%
      border-radius 0 25px 0 0

      .left
        padding 20px

      .right
        flex 1
        height 100%
        display flex
        flex-direction column

        .title
          display flex
          align-items flex-end
          justify-content space-between
          height 75px
          font-size 28px
          font-weight bold
          border-bottom 2.5px solid rgba(150, 150, 150, 0.5)
          margin 0 40px
          padding 7.5px 0 10px 0
          user-select none

          .close
            margin-left 10px

        .content
          flex 1
          overflow auto
          display flex
          flex-direction column
          margin 0 40px
          height 100%
          mask-image linear-gradient(to bottom, transparent, #000 30px, #000, #000 calc(100% - 30px), transparent), linear-gradient(to left, black, transparent 25px)
          mask-size 100% 100%
          mask-position 0 0, 100% 0
          mask-repeat no-repeat, no-repeat
          

          ::-webkit-scrollbar
            width 8px
            height 8px

          ::-webkit-scrollbar-track
            margin 30px 0

    .footer
      position relative
      display flex
      align-content center
      justify-content center
      padding 15px 40px
      background var(--box-background-color)

      .bg
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        background #262626
        background-image url('@/assets/UI/菜单背景.webp')
        background-position center
        background-size auto 100%
        background-repeat no-repeat
        display flex
        align-content center
        justify-content center

      .btn-list
        display flex
        align-content center
        justify-content center

.fade-enter-active .window,
.fade-leave-active .window
  transition all 350ms ease


.fade-enter-active .box, .fade-leave-active .box
  transition all 350ms var(--popup-ease);

.fade-enter-from .box, .fade-leave-to .box
  transform translateY(10%)


.fade-enter-active .bg, .fade-leave-active .bg
  transition all 250ms ease
  transition-delay 50ms
  transform-origin bottom

.fade-enter-from .bg
  transform scaleY(0)

.fade-leave-to .bg
  transform scaleY(0) translateY(30%)

.fade-enter-active .btn-list
  transition all 350ms ease
  transition-delay 150ms

.fade-enter-from .btn-list
  opacity 0

.fade-leave-active .btn-list
  transition all 200ms ease

.fade-leave-to .btn-list
  opacity 0
</style>

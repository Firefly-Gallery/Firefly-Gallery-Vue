<!-- https://github.com/blacktunes/sr-message-maker/blob/master/src/components/Loading.vue -->
<template>
  <Transition name="fade">
    <div
      class="loadingIcon"
      v-if="isLoading"
    >
      <div class="item">
        <div class="circle-group-1">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
        <div class="circle-group-2">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const props = defineProps(["isLoading"]);
</script>

<style lang="stylus" scoped>
.loadingIcon
  z-index 999
  display flex
  justify-content center
  align-items center
  position relative
  aspect-ratio 1

  .item
    position relative
    width 120px
    height 120px
    animation spin 6s infinite cubic-bezier(0.27, 0, 0.15, 1.28)
    animation-delay 0.8s

    .circle-group-1, .circle-group-2
      width 100%
      height 100%
      position absolute
      top 0
      left 0

      .circle
        position absolute
        border 2px solid #aaa
        border-radius 50%

    .circle-group-1
      .circle
        width 20px
        height 20px
        animation circle-1-light 1s linear infinite

        &:nth-child(1)
          top 0
          left 50%
          transform translateX(-50%)

        &:nth-child(2)
          left 0
          top 50%
          transform translateY(-50%)
          animation-delay 0.25s

        &:nth-child(3)
          bottom 0
          left 50%
          transform translateX(-50%)
          animation-delay 0.5s

        &:nth-child(4)
          right 0
          top 50%
          transform translateY(-50%)
          animation-delay 0.75s

    .circle-group-2
      animation spin 6s infinite cubic-bezier(0.48, 0, 0.2, 1)

      .circle
        width 8px
        height 8px
        border-width 2px
        animation circle-2-light 1s linear infinite

        &:nth-child(1)
          top 20%
          left 20%
          animation-delay 0.625s

        &:nth-child(2)
          bottom 20%
          left 20%
          animation-delay 0.125s

        &:nth-child(3)
          bottom 20%
          right 20%
          animation-delay 0.875s

        &:nth-child(4)
          top 20%
          right 20%
          animation-delay 0.375s

@keyframes circle-1-light
  0%
    background transparent

  25%
    background #fff
    box-shadow 0 0 20px #fff

  50%
    background transparent

  100%
    background transparent

@keyframes circle-2-light
  0%
    background transparent

  25%
    background #fff
    box-shadow 0 0 5px #fff

  50%
    background transparent

  100%
    background transparent

@keyframes spin
  0%
    transform rotate(0deg)

  8.3%
    transform rotate(-90deg)

  24.8%
    transform rotate(-90deg)

  32.1%
    transform rotate(-180deg)

  49.8%
    transform rotate(-180deg)

  58.1%
    transform rotate(-270deg)

  74.8%
    transform rotate(-270deg)

  83.1%
    transform rotate(-360deg)

  100%
    transform rotate(-360deg)
</style>

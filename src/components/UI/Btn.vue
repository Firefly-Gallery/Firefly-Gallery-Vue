<template>
  <div
    class="button"
    :class="{ disable }"
  >
    <div
      class="icon"
      v-if="type"
    >
      <Icon
        :name="type"
        width="17"
        height="17"
      />
    </div>
    <span>
      {{ name }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import Icon from './Icon.vue'

defineProps<{
  name: string
  type?: 'check' | 'wrong'
  disable?: boolean
}>()
</script>

<style lang="stylus" scoped>
.disable
  background transparent !important
  border 3px solid #afafaf !important
  color #afafaf !important
  cursor auto !important

  &:before
    display none

.button
  box-sizing border-box
  position relative
  display flex
  justify-content center
  align-items center
  background rgba(255, 255, 255, 0.85)
  height 42.5px
  padding 5px 60px
  margin 0 20px
  border-radius 25px
  font-size 20px
  color #161616
  user-select none
  cursor pointer
  border 2.5px solid #e0e0e0
  transition all 150ms ease

  span
    margin-bottom 4.5px

  &:before
    content ''
    position absolute
    box-sizing border-box
    top 50%
    left 50%
    width 98%
    height 90%
    border-radius 25px
    border 2px solid rgba(180, 180, 180, 0.5)
    transform translate(-50%, -50%)
    pointer-events none

  &:hover
    background #ffffff

  &:active
    background rgba(255, 255, 255, 0.8)
    border 2.5px solid #ffffff
    scale 0.97

  .icon
    display flex
    justify-content center
    align-items center
    width 22.5px
    height 22.5px
    margin-right 10px
    border-radius 50%
    background #0c0b07
    border 2.5px solid #b4a177

    :deep(path)
      fill #d2c2a0
</style>

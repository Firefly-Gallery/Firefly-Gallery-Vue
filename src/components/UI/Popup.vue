<template>
  <Transition name="fade"
    @enter="showInner=true"
    @leave="showInner=false"
  >
    <template v-if="props.useShow">
      <div
        :class="`popup ${setting.enable_blur? 'backfrop-blur-xl':''}`"
        v-show="props.index !== -1"
        :style="{ zIndex: 1000 + index }"
      >
        <slot></slot>
      </div>
    </template>
    <template v-else>
      <div
        :class="`popup ${setting.enable_blur? 'backfrop-blur-xl':''}`"
        v-if="props.index !== -1"
        :style="{ zIndex: 1000 + index }"
      >
        <slot></slot>
      </div>
    </template>
  </Transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { setting } from '@/store/setting'

const showInner = ref(true);


const props = withDefaults(
  defineProps<{
    index: number
    baseIndex?: number
    useShow?: boolean
  }>(),
  {
    useShow: false,
    baseIndex: 10
  }
)
</script>

<style lang="stylus" scoped>
.popup
  @apply select-none;
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  overflow hidden
  
</style>

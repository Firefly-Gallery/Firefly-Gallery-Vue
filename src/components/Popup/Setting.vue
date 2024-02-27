<template>
  <Popup :index="props.index">
    <Window title="设置"
    width="1000px"
    height="40%"
    >
      <!-- <div class="select">
        <div
          class="item"
          v-for="(item, key) in bubbles"
          :key="key"
          :class="{ highlight: index === key }"
          @click="index = key"
        >
          <img
            :src="item.img"
            :alt="item.name"
          />
        </div>
      </div> -->
      <template #outside>
        <div class="other-setting">
          <div
            class="setting-btn"
            title="更新记录"
            @click.stop="openWindow('log')"
          >
            <Icon
              name="log"
              width="25"
              height="25"
            />
          </div>
          <div
            class="setting-btn"
            title="字体设置"
            @click.stop="openWindow('font')"
          >
            <Icon
              name="font"
              width="30"
              height="30"
            />
          </div>
          <div
            class="setting-btn"
            title="数据管理"
            @click.stop="openWindow('data')"
          >
            <Icon name="data" 
              width="25"
              height="25"
            />
          </div>
        </div>
      </template>
      <!-- <template #left>
        <Preview
          :img="bubbles[index].preview"
          :name="name"
        />
      </template> -->
      <template #footer>
        <Btn
          class="win-btn"
          name="取消"
          type="wrong"
          @click="close"
        />
        <Btn
          class="win-btn"
          name="保存"
          type="check"
          :disable="false"
          @click="showWindow=false"
        />
      </template>
    </Window>
  </Popup>
</template>

<script lang="ts" setup>
import Popup from '@/components/UI/Popup.vue'
import Window from '@/components/UI/Window.vue'
import Btn from '@/components/UI/Btn.vue'
import Icon from '@/components/UI/Icon.vue'
import { watch, ref, computed } from 'vue'
import { setting } from '@/store/setting'
import { enterCallback, openWindow } from '@/components/Popup'

let showWindow = ref(true);

const props = defineProps<{
  name: string
  index: number
}>()

const emits = defineEmits<{
  (event: 'close', name: string): void
}>()

const close = () => {
  emits('close', props.name)
}

const index = ref(0)

</script>

<style lang="stylus" scoped>
.other-setting
  .setting-btn
    box-sizing border-box
    width 45px
    height 45px
    display flex
    justify-content center
    align-items center
    background rgba(255, 255, 255, 0.8)
    border-radius 50%
    border 2px solid #767479
    margin-bottom 15px
    cursor pointer

    :deep(path)
      fill #767479

    &:hover
      background #ffffff

.select
  display flex
  flex-wrap wrap
  justify-content flex-start
  overflow-x hidden
  height 450px
  width 1200px
  margin-bottom 30px
  padding-right 10px
  user-select none

  .item
    display flex
    justify-content center
    align-items center
    overflow hidden
    position relative
    box-sizing border-box
    width 385px
    height 200px
    margin 30px 10px 0 0
    background #c5c6ca
    border 4px solid #a7a8aa
    cursor pointer

    &:hover
      background #d7d7d7

    img
      width 100%

.highlight
  border 4px solid #14120d !important
  cursor auto !important

  &:after
    content '使用中'
    position absolute
    left 0
    bottom 0
    display flex
    justify-content center
    align-items center
    background #e7c57e
    height 38px
    width 100%
    font-size 28px

  &:hover
    background #c5c6ca !important
</style>

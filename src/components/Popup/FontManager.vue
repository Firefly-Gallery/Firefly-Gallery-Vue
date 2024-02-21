<template>
  <Popup :index="props.index">
    <Window
      title="字体设置"
      @close="close"
    >
      <div class="font">
        <div class="preview">愿此行，终抵群星</div>
        <div class="font">{{ font }}</div>
        <div class="line"></div>
        <Btn
          class="btn_"
          name="默认字体"
          @click="resetFont"
        />
        <Btn
          class="btn_"
          name="系统字体"
          @click="setFont('')"
        />
        <Btn
          class="btn_"
          name="上传字体"
          @click="setCustomFont"
        />
      </div>
    </Window>
  </Popup>
</template>

<script lang="ts" setup>
import Popup from '@/components/UI/Popup.vue'
import Window from '@/components/UI/Window.vue'
import Btn from '@/components/UI/Btn.vue'
import { ref } from 'vue'

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

const defaultFont = "* { font-family: 'Noto Sans SC'; }"

console.log(getComputedStyle(document.body).fontFamily);

const getFontName = () => getComputedStyle(document.body).fontFamily.split(',')[0]
const font = ref(getFontName())

const fontStyle = document.querySelector('style[title=font]')

const setFont = (text: string) => {
  if (fontStyle) {
    fontStyle.innerHTML = text
    font.value = getFontName()
  } else {
    console.warn('字体设置错误')
  }
}

const resetFont = () => {
  setFont(defaultFont)
}

const setCustomFont = async () => {
  const el = document.createElement('input')
  el.type = 'file'
  el.onchange = () => {
    if (el.files?.[0]) {
      const file = new FileReader()
      file.readAsDataURL(el.files[0])
      file.onload = (e) => {
        const fontName = 'CustomFont'
        const css = `@font-face{font-family:'${fontName}'; src: url('${
          e.target?.result as string
        }')}* { font-family: '${fontName}'};`
        setFont(css)
      }
    }
  }
  el.click()
}
</script>

<style lang="stylus" scoped>
.font
  margin 20px 0

  .preview
    font-size 50px
    text-align center
    padding 25px
    border 1px solid rgba(0, 0, 0, 0.2)
    border-radius 5px
    user-select none

  .font
    font-size 20px
    text-align center
    margin-top 20px
    user-select none

  .btn_
    margin 5px 0 0 0
    height 50px
    font-size 21px
    &:before
      width:98.8%

  .line
    box-sizing border-box
    width 100%
    padding 0 5px
    margin 15px 0 10px 0
    border-bottom 1.5px solid rgba(150, 150, 150, 0.5)
</style>

import { reactive } from 'vue'

export const setting = reactive<{
  /** 是否显示Loading页 */
  loading: boolean
  /** 界面过渡动画 */
  transition: boolean
  /** 视差背景 */
  parallax_bg: boolean
}>({
  loading: true,
  transition: true,
  parallax_bg: true
})

import { reactive } from 'vue'

export const setting = reactive<{
  /** 是否显示Loading页 */
  loading: boolean
  /** 界面过渡动画 */
  transition: boolean
  /** 界面动画 */
  animation: boolean
  /** 模糊 */
  mouse_animation: boolean
  /** 视差背景 */
  parallax_bg: boolean
  /** 模糊 */
  enable_blur: boolean
  /** 懒加载 */
  lazy_load: boolean
}>({
  loading: false,
  transition: false,
  animation: false,
  mouse_animation: false,
  parallax_bg: false,
  enable_blur: false,
  lazy_load: false
})

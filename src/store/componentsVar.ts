import type SmoothScrollbar from 'smooth-scrollbar'
import { reactive } from 'vue'

export const componentsVar = reactive<{
  scroll: SmoothScrollbar | null
  SetNavbarTransparent: Function | null
}>({
  scroll: null,
  SetNavbarTransparent: null
})

export default componentsVar

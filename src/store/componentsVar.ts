import { reactive } from 'vue'

export const componentsVar = reactive<{
  scroll: HTMLDivElement | null
  SetNavbarTransparent: Function | null
}>({
  scroll: null,
  SetNavbarTransparent: null
})

export default componentsVar

import { reactive } from 'vue'

export const viewerData = reactive<{
  title: string
  src: string
  tip?: string
}>({
  title: '',
  src: '',
  tip: undefined,
})

export const viewerOpen = (config: {
  title: string
  src: string
  tip?: string
}) => {
  viewerData.title = config.title
  viewerData.src = config.src
  viewerData.tip = config.tip
}

export const viewerClose = () => {
  viewerData.title = ''
  viewerData.src = ''
  viewerData.tip = undefined
}

import { reactive } from 'vue'

export const imageViewerData = reactive<{
  title: string
  src: string
  tip?: string
}>({
  title: '',
  src: '',
  tip: undefined,
})

export const imageViewerOpen = (config: {
  title: string
  src: string
  tip?: string
}) => {
  imageViewerData.title = config.title
  imageViewerData.src = config.src
  imageViewerData.tip = config.tip
}

export const imageViewerClose = () => {
  imageViewerData.title = ''
  imageViewerData.src = ''
  imageViewerData.tip = undefined
}

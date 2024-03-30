import { reactive } from 'vue'

export const imageViewerData = reactive<{
  title: string
  src: string[]
  tip?: string
  currentPage: number
}>({
  title: '',
  src: [''],
  tip: undefined,
  currentPage: 0,
})

export const imageViewerOpen = (config: {
  title: string
  src: string[]
  tip?: string
}) => {
  imageViewerData.title = config.title
  imageViewerData.src = config.src
  imageViewerData.tip = config.tip
  imageViewerData.currentPage = 0
}

export const imageViewerClose = () => {
  imageViewerData.title = ''
  imageViewerData.src = ['']
  imageViewerData.tip = undefined
  imageViewerData.currentPage = 0
}

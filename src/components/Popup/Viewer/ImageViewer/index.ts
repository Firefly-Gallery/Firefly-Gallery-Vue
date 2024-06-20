import { reactive } from 'vue'
import type { Artwork } from '@/assets/data/artworks'

export const imageViewerData = reactive<{
  title: string
  src?: string[]
  tip?: string
  artwork?: Artwork
  currentPage: number
}>({
  title: '',
  src: [''],
  tip: undefined,
  currentPage: 0,
})

export const imageViewerOpen = (config: {
  title?: string
  src?: string[]
  tip?: string
  artwork?: Artwork
}) => {
  if(!config.src && !config.artwork) {return;}
  if(!config.title) imageViewerData.title = "Image Viewer"
  else imageViewerData.title = config.title
  imageViewerData.src = config.src
  imageViewerData.tip = config.tip
  imageViewerData.artwork = config.artwork
  if(imageViewerData.artwork) {imageViewerData.src = imageViewerData.artwork.img;}
  imageViewerData.currentPage = 0
}

export const imageViewerClose = () => {
  imageViewerData.title = ''
  imageViewerData.src = ['']
  imageViewerData.artwork = undefined
  imageViewerData.tip = undefined
  imageViewerData.currentPage = 0
}

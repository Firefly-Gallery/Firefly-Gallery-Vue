import { reactive } from 'vue'
import type { Artwork, ArtworkItem } from '@/assets/data/artworks'

export const imageViewerData = reactive<{
  title: string
  src?: string[]
  tip?: string
  artworkItem?: ArtworkItem
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
  artworkItem?: ArtworkItem
}) => {
  if(!config.src && !config.artworkItem) {return;}
  if(!config.title) imageViewerData.title = "Image Viewer"
  else imageViewerData.title = config.title
  imageViewerData.src = config.src
  imageViewerData.tip = config.tip
  imageViewerData.artworkItem = config.artworkItem
  imageViewerData.currentPage = 0
}

export const imageViewerClose = () => {
  imageViewerData.title = ''
  imageViewerData.src = ['']
  imageViewerData.artworkItem = undefined;
  imageViewerData.artwork = undefined
  imageViewerData.tip = undefined
  imageViewerData.currentPage = 0
}


export interface Artwork {
  id: string;
  author: string;
  img: string[];
  size: number[];
  src: string;
  thumb: string;
  time: number;
}

export interface ArtworkItem {
  id: string;
  thumb: string;
  size: number[];
}

const images_cdn:string = "https://image-cdn.firefly-gallery.cn"

export const api_endpoint:string = "https://api.firefly-gallery.cn/public"

export function GetThumbnailURL(thumb:string):string {
  return images_cdn + "/thumbs/" + thumb + ".jpg"
}
export function GetImageURL(path:string):string {
  return images_cdn + "/" + path
}

export function formatSrcURL(src:string):string {
  return src.replace("pid://", "https://pixiv.net/artworks/")
}

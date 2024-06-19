
export class Artwork {
  id: string;
  author: string;
  img: string[];
  width: number;
  height: number;
  src: string;
  thumb: string;
  time: number;

  constructor(id:string, data: any) {
    this.id = id;
    this.author = data[0];
    this.img = data[1];
    this.img.forEach((image, index) => {
      this.img[index] = GetImageURL(image)
    })
    this.width = data[2][0];
    this.height = data[2][1];
    this.src = data[3];
    this.src = formatSrcURL(this.src);
    this.thumb = GetThumbnailURL(data[4]);
    this.time = data[5];
  }
}

const images_cdn:string = "http://image-cdn.firefly-gallery.cn"

export function GetThumbnailURL(thumb:string):string {
  return images_cdn + "/thumbs/" + thumb + ".jpg"
}
export function GetImageURL(path:string):string {
  return images_cdn + "/" + path
}

export function formatSrcURL(src:string):string {
  return src.replace("pid://", "https://pixiv.net/artworks/")
}

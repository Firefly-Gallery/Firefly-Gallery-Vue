
interface Log {
  time: string
  text: {
    text: string
    info?: string | string[]
    author?: string
    url?: string
  }[]
}
declare module 'aplayer';
declare module 'vue-next-masonry';
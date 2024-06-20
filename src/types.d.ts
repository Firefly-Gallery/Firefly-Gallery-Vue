
interface Log {
  time: string
  text: {
    text: string
    info?: string | string[]
    author?: string
    url?: string
  }[]
}
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
declare module 'aplayer';
declare module 'chroma-js'
declare module 'vue-next-masonry';
declare module "@tsparticles/vue3";
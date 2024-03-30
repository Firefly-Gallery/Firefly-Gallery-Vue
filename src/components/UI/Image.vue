<template>
  <picture>
    <source v-for="(img_url, index) in image_urls" :key="index"
            :type="`image/${otherFormats[index]}`" :srcset="img_url">
    <img :src="realSrc" ref="imgRef" v-bind="$attrs" />
  </picture>
</template>

<script setup lang="ts">
import { computed, defineEmits, onMounted, ref, watch } from 'vue'

const imgRef = ref<HTMLElement>();

function getFileName(url: string) {
  const parts = url.split('.');
  if (parts.length > 0) {
    const extension = parts.pop()!.toLowerCase();
    return [parts.join("."), extension];
  } else {
    console.error(`Invalid URL format: ${url}`);
    return ["", ""]
  }
}

const prop = withDefaults(
  defineProps<{
    src: string;
    otherFormats?: string[];
  }>(),
  {
    otherFormats: () => ['avif', 'webp'],
    imgAlt: "图片加载失败"
  }
)

defineOptions({
  inheritAttrs: false
})

const getLocalImageUrl = (name: string) => {
  const urlObj = new URL(`../../assets/images/${name}`, import.meta.url)
  if(urlObj.href && !urlObj.href.endsWith("undefined")) {
    // console.log(urlObj.href)
    return urlObj.href
  } else {
    console.error(`Could not resolve local image: ${name}`)
    return undefined
  }
}

const image_urls = computed(() => {
  let urls: string[] = []

  if(!fileName.value) {return urls}
  
  if(import.meta.env.MODE == "development") { return urls }

  let name = fileName.value;

  prop.otherFormats.forEach(format => {
    if(isLocal) {
      let url = getLocalImageUrl(`${name}.${format}`)
      if(url) {urls.push(url)}
    } else {
      urls.push(`${name}.${format}`)
    }
  })
  return urls
})

const emit = defineEmits(['onload']);

const isLocal = computed(() => {
  return prop.src.startsWith("/")
})
const fileName = ref("")
const realSrc = ref("")

watch(() => prop.src, (newValue, oldValue) => {
  updateSrc(prop.src)
});

const updateSrc = (src: string) => {
  let data = getFileName(prop.src);
  let name = data[0];
  let ext = data[1];
  if(isLocal.value) {
    name = name.substring(1);
    fileName.value = name;
    let url = getLocalImageUrl(`${name}.${ext}`)
    if(url) {realSrc.value = url}
  } else {
    realSrc.value = `${name}.${ext}`
  }

  if(imgRef.value) {
    imgRef.value.onload = () => {
      emit('onload')
    }
  }

}

onMounted(() => {
  if(prop.src) {updateSrc(prop.src);}
})

defineExpose({imgRef})
</script>

<style scoped lang="stylus">

</style>
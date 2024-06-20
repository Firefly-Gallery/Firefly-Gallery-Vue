<template>
  <header class="header-container" ref="headerRef">
    <div class="cover" ref="coverRef">
      <Image src="/Common_PageHead.jpg" ref="headerImg" class="img-head"></Image>
      <div class="title-container darken" ref="titleRef">
        <h1 class="title">{{ title }}</h1>
        <p class="subtitle">{{ subTitle }}</p>
      </div>
    </div>
  </header>
</template>
  
<style scoped lang="postcss">
header.header-container {
  position: relative;
  height: calc(10vw + 300px);
  width: 100%;
  overflow: hidden;
  box-shadow: inset black 0 0 0 0;
}

.title-container {
  @apply bg-black/50 w-full h-full flex flex-col items-center justify-center;
}

.cover {
  height: calc(10vw + 300px);
  width: 100%;
  position: absolute;
  transform: translate(0px, 0px);
  box-shadow: inset #00000040 0 -3px 10px 0;
}

.cover h1.title {
  @apply text-white text-[17vw] md:text-7xl;
  font-weight: 800;
  line-height: 1.4;
  filter: drop-shadow(0px 4px 6px #00000050);
}
.cover p.subtitle {
  @apply mb-0
  relative top-[-24px]
  xl:text-3xl md:text-xl sm:text-[0.8rem] text-lg
  font-bold;
  opacity: 0.6;
  font-family: Star Rail Neue, serif;
}


</style>
<style>
.img-head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  z-index: -1;
}
</style>

<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue';
import Image from '@/components/UI/Image.vue'
import componentsVar from '@/store/componentsVar'
import { setting } from '@/store/setting'

const titleRef = ref();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  image: {
    type: [String]
  },
  title: {
    type: [String]
  },
  subTitle: {
    type: [String]
  }
})

let headerHeight = -1

const coverRef = ref()
const headerRef = ref()

let scroll: HTMLElement | null = null

const Init = (scr: HTMLElement) => {
  scroll = scr;
  scroll.addEventListener("scroll", handleScroll);
}
const handleScroll = () => {
  if(!setting.parallax_bg) return;
  if(headerHeight < 0 && coverRef) {
    headerHeight = coverRef.value.clientHeight;
  }
  if(scroll) {

    var wScroll = scroll.scrollTop;

    if (wScroll <= headerHeight) {
      coverRef.value.style.transform = 'translate(0px, ' + wScroll/2  + 'px)';
      titleRef.value.style.transform = `translate(0px, ${-wScroll/10}px)`;
    }
  }

  if(headerRef.value && componentsVar.SetNavbarTransparent) {
    var bounding = headerRef.value.getBoundingClientRect();

    if (bounding.bottom > 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
      componentsVar.SetNavbarTransparent(true);
    } else {
      componentsVar.SetNavbarTransparent(false);
    }
  }
}
onBeforeUnmount( function() {
  scroll?.removeEventListener("scroll", handleScroll);
});

defineExpose({Init})
</script>
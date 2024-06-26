<template>
    <div class="title-container relative">
        <div class="title" ref="titleRef">

            <h2><i>崩坏:星穹铁道——</i></h2>
            <h1 @mouseenter="hoverChanged('hover')"
                @mouseleave="hoverChanged('unhover')">
              流萤の专属相册
            </h1>
            <p class="subtitle">Firefly's Album</p>
            <span v-if="activeArtwork" class="text-xs font-medium ml-2">背景：
              <a :href="activeArtwork.src" target="_blank">
                @{{ activeArtwork.author }}
              </a>
            </span>
        </div>
    </div>
  <div class="absolute bottom-0 left-0 right-0 flex p-2 justify-between items-center z-[-1]">
    <div class="badge badge-primary ml-2 opacity-0">v 1.0</div>
    <ChevronDoubleDownIcon class="h-6 w-6 text-white ud_animatiom" />
    <div class="badge badge-primary ml-2">v 1.0</div>
  </div>
</template>
<script lang='ts' setup>

import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import componentsVar from '@/store/componentsVar'
import { ChevronDoubleDownIcon } from "@heroicons/vue/24/outline";
import type { Artwork } from '@/assets/data/artworks'
import { setting } from '@/store/setting'

const emit = defineEmits(['hover', 'unhover'])
const titleRef = ref();

const props = withDefaults(
  defineProps<{
    activeArtwork?: Artwork;
  }>(),
  {
  }
)

let hoverControl = true
let animationPlayed = false;

const hoverChanged = (s:string) => {
  if (!hoverControl) return;
  if(s === "hover") {
    emit("hover")
  } else {
    emit("unhover")
  }
}
const initAnimation = () => {
  const title: HTMLDivElement | null  = document.querySelector(".title")
  if(!title) return;
  title.style.opacity = "0";

}
const playAnimations = () => {
  if(animationPlayed) return;
  animationPlayed = true;
  const title: HTMLDivElement | null  = document.querySelector(".title")
  if(!title) return;
  const titleH1: HTMLHeadingElement | null = document.querySelector(".title h1")
  if(!titleH1) return;
  const subtitle: HTMLParagraphElement | null = document.querySelector(".subtitle")
  if(!subtitle) return;
  gsap.from(titleH1, {
    fontSize: "50px",
    letterSpacing: "7vw",
    duration: 1,
    ease: "circ.inOut",
    onComplete: () => {
      gsap.killTweensOf(titleH1)
      titleH1.style.fontSize = ""
      titleH1.style.letterSpacing = ""
    }
  });
  gsap.from(subtitle, {
    fontSize: "50px",
    letterSpacing: "3vw",
    duration: 1,
    ease: "circ.inOut",
    onComplete: () => {
      gsap.killTweensOf(subtitle)
      subtitle.style.fontSize = ""
      subtitle.style.letterSpacing = ""
    }
  });
  gsap.fromTo(title, {
    fontSize: "10px",
    opacity: "0.01"
  }, {
    duration: 2,
    opacity: "1.0",
    ease: "circ.out",
    onComplete: () => {
      gsap.killTweensOf(titleH1)
    }
  });
}
const handleScroll = () => {
  if(!titleRef.value) return;
  const scroll = componentsVar.scroll
  if(!scroll) return
  let headerHeight = window.innerHeight;

  var wScroll = scroll.scrollTop;

  if(setting.enable_blur) {
    if(wScroll > headerHeight / 3) {
      emit('hover')
      hoverControl = false
    } else if (!hoverControl) {
      emit('unhover')
      hoverControl = true
    }
  }

  if(setting.parallax_bg) {
    if (wScroll <= headerHeight) {
      titleRef.value.style.transform = `translate(0px, ${wScroll/2}px)`;
    }
  }
}
window.onLoadingEnd = () => {
  if(setting.animation) {
    initAnimation();
    setTimeout(() => {
      playAnimations()
    }, 250);
  }
}
onMounted(() => {
  const scroll = componentsVar.scroll
  scroll?.addEventListener("scroll", handleScroll);
})
</script>
<style>

.btn_>span {
    margin: 0 !important;
}
</style>
<style scoped lang="postcss">

.title-container {
  @apply grow flex flex-col gap-5
  justify-center items-center;
}
.title {
  @apply text-white gap-5
  flex flex-col justify-center;
}
.title h1 {
  @apply z-[10] pb-1 md:pb-[15px]
  text-[10vw] sm:text-7xl md:text-8xl lg:text-9xl
  font-bold tracking-normal md:tracking-wider;
  background: linear-gradient(to right, #ff8b4d, #5affcc);
  text-shadow: 0 3px 15px #ffffff3a;
  color: rgb(255, 255, 255);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-wrap: nowrap;
}
.title h2 {
  @apply z-[10]
  text-[4vw] sm:text-[1.5rem] md:text-2xl lg:text-3xl
  font-bold;
  text-shadow: 0 3px 15px #ffffff3a;
  color: #ffffffc0;
}
.title p{
  @apply text-[1.5vw] sm:text-[1rem] lg:text-lg
  w-full text-center tracking-normal md:tracking-[10px] lg:tracking-[16px];
}
p.subtitle {
  @apply mb-0
  relative top-[-24px]
  xl:text-3xl md:text-xl sm:text-[0.8rem] text-lg
  font-bold;
  opacity: 0.6;
  font-family: Star Rail Neue, serif;
}
.btn-group {
  @apply mt-0 md:mt-2 flex flex-col lg:flex-row gap-5 justify-center md:justify-start;
}
.btn_ {
  @apply max-w-full md:max-w-[300px] m-0 px-[5px] py-0 w-full;
}
.firefly-card-container {
  @apply h-auto md:h-full grow w-full md:w-auto
  hidden md:flex justify-center items-center;
  perspective: 1200px;
}
.ud_animatiom {
  animation: ud 2s cubic-bezier(0.15, 0.00, 0.85, 1.00) infinite;
}
@keyframes ud {
  0% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10px);
  }
}
</style>
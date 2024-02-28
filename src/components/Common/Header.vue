<template>
  <header class="header-container" ref="headerRef">
    <div class="cover" ref="coverRef">
      <div class="title-container darken">
        <h1 class="title">{{ title }}</h1>
        <p class="subtitle">{{ subTitle }}</p>
      </div>
    </div>
  </header>
</template>
  
<style scoped>

header.header-container {
  position: relative;
  height: calc(10vw + 300px);
  width: 100%;
  overflow: hidden;
  box-shadow: inset black 0 0 0 0;
}

.cover {
  height: calc(10vw + 300px);
  width: 100%;
  background: url(@/assets/gallery/head.jpg) no-repeat;
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;
  position: absolute;
  transform: translate(0px, 0px);
  box-shadow: inset #00000040 0px -3px 10px 0px;
}

.cover h1 {
  font-size: 4rem;
  font-weight: 800;
}

.title-container {
  @apply bg-black/50 w-full h-full flex flex-col items-center justify-center;
}

.title {
  @apply text-white;
}

.subtitle {
  @apply mb-0
  relative top-[-24px]
  xl:text-3xl md:text-xl sm:text-[0.8rem] text-lg
  font-bold;
  opacity: 0.6;
  font-family: Star Rail Neue;
}
</style>
  
<script lang="ts" setup>
import { onMounted, onBeforeUnmount, toRaw, ref } from 'vue';
import componentsVar from '@/store/componentsVar'
import type SmoothScrollbar from 'smooth-scrollbar';

// import { useStore } from 'vuex';
// const store = useStore();

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

let scroll: SmoothScrollbar | null = null

const Init = (scroll: SmoothScrollbar) => {

  scroll.addListener(handleScroll);
}
const handleScroll = () => {
  if(headerHeight < 0) {
    headerHeight = coverRef.value.clientHeight;
  }
  if(scroll) {

    var wScroll = scroll.scrollTop;
    
    if (wScroll <= headerHeight) {
      coverRef.value.style.transform = 'translate(0px, ' + wScroll/2  + 'px)';
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
  scroll?.removeListener(handleScroll);
});

defineExpose({Init})
</script>
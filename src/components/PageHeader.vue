<template>
  <header class="header-container">
    <div class="cover">
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
  background: url(/gallery/head.jpg) no-repeat;
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
  @apply mb-2 md:mb-6 sm:mb-4
  relative top-[-24px]
  xl:text-3xl md:text-xl sm:text-[0.8rem] text-lg
  font-bold;
  opacity: 0.6;
  font-family: Star Rail Neue;
}


</style>
  
<script setup>
import { onMounted, onBeforeUnmount, toRaw } from 'vue';
import { useStore } from 'vuex';
const store = useStore();


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

let headerHeight = 0
let cover = null
let header = null
let scroll, SetNavbarTransparency;


onMounted(function() {
    console.log(toRaw(store.getters.getScroll))
    scroll = toRaw(store.getters.getScroll);
    SetNavbarTransparency = toRaw(store.getters.getNavbar);
    console.log(SetNavbarTransparency);
    header = document.querySelector('.header-container')
    headerHeight = header.clientHeight;
    cover = document.querySelector('.cover');

    scroll.addListener(handleScroll);
})
const handleScroll = () => {
  var wScroll = scroll.scrollTop;
  
  if (wScroll <= headerHeight) {
    cover.style.transform = 'translate(0px, ' + wScroll/2  + 'px)';
  }
  
  var bounding = header.getBoundingClientRect();

  if (bounding.bottom > 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
    SetNavbarTransparency(true);
  } else {
    SetNavbarTransparency(false);
  }
}
onBeforeUnmount( function() {
    scroll.removeListener(handleScroll);
});
</script>
<template>
  <header class="header-container">
    <div class="cover">
      <div class="darken bg-black/50 w-full h-full flex items-center justify-center">
        <h1 class="text-white">图库</h1>
      </div>
    </div>
  </header>
  <div class="gallery-container min-h-[200vh]"></div>
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

</style>

<script setup>
import { onMounted, onBeforeUnmount, toRaw } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

let headerHeight = 0
let cover = null
let header = null
let scroll;


const emit = defineEmits(['changeTransparent'])

onMounted(function() {
    console.log(toRaw(store.getters.getScroll))
    scroll = toRaw(store.getters.getScroll);
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
    emit("changeTransparent", true);
  } else {
    emit("changeTransparent", false);
  }
}
onBeforeUnmount( function() {
    scroll.removeListener(handleScroll);
});
</script>
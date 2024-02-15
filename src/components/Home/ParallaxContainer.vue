<template>
    <div class="parallax-container" ref="containerRef">

        <video autoplay loop muted v-if="isVideoBackground"
        class="parallax-bg" 
        :w="w" :h="h" 
        :src="src" ref="bgRef" />

        <img v-else
        class="parallax-bg" 
        :w="w" :h="h"
        :src="src" ref="bgRef" />

        <div :class="`content ${contentClass}`"><slot /></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, toRaw, defineProps } from 'vue';
import { useStore } from 'vuex';

const bgRef = ref(null);
const containerRef = ref(null)

const store = useStore();

const props = defineProps({
    w: {type:String},
    h: {type:String},
    src: {type:String},
    contentClass: {type:String},
    isVideoBackground: {type:Boolean, default:false},
    margin: {type: Number, default: 256}
});

function GetViewportSize() {
    return {
        w: (window.innerWidth || document.documentElement.clientWidth),
        h: (window.innerHeight || document.documentElement.clientHeight),
    }
}

function GetBGSize(element) {
    return {
        w: element.getAttribute("w"),
        h: element.getAttribute("h"),
    }
}

function SetRealHeight() {
    const { w, h } = GetViewportSize();
    if (bgRef.value && containerRef.value) {
        let realH = (h + props.margin)
        bgRef.value.style.height = realH + "px";
        let bgSize = GetBGSize(bgRef.value)
        let realW = realH / bgSize.h * bgSize.w
        bgRef.value.style.width = Math.max(realW, w) + "px";
    }
}

function UpdatePos() {
    const { w, h } = GetViewportSize();
    if (bgRef.value && containerRef.value){
        var bounding = containerRef.value.getBoundingClientRect();
        let fac = bounding.bottom / h;
        fac = 1 - (fac * 2)
        bgRef.value.style.transform = `translateY(${(fac * props.margin/2)}px)`;
    }
}

onMounted(() => {
    const scroll = toRaw(store.getters.getScroll);
    SetRealHeight();
    UpdatePos();
    window.addEventListener('resize', function() {
        SetRealHeight();
    })
    scroll.addListener(function() {
        UpdatePos();
    });
})
</script>

<style scoped>
.parallax-container {
    @apply w-screen h-screen
    relative overflow-hidden;
}
.parallax-container .parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: -1; /* Ensure video stays behind other content */
}
</style>
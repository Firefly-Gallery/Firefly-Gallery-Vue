<template>
    <div class="parallax-container">
        <video autoplay loop muted class="parallax-bg parallax-video" w="2560" h="1440" anchorL="0" anchorR="1200" src="/home/image_loop.mp4" />
        <div class="content">
            <div class="title">
                <div class="title-poem">
                    <h1><i>我梦见一片焦土，</i></h1>
                    <p>In my dream I saw a scorched earth</p>
                    <h1>一株破土而生的新蕊；</h1>
                    <p>And a new sapling emerged from it</p>
                    <h1>它迎着朝阳绽放，</h1>
                    <p>It bloomed against the morning sun</p>
                    <h1>向我低语呢喃。</h1>
                    <p>And whispered to me</p>
                </div>
            </div>
            <div class="firefly-card-container">
                <div class="firefly-card"><img src="/home/card.jpg"/></div>
            </div>
        </div>
    </div>
    <div class="parallax-container">
        <img src="/home/bg-2.jpg" class="parallax-bg parallax-video" w="2400" h="1350" />
        <div class="content"></div>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, toRaw } from 'vue';
import { useStore } from 'vuex';
const store = useStore();


const margin = 200;

function SetRealHeight(elements, h) {
    elements.forEach(element => {
        let realH = (h + margin)
        element.style.height = realH + "px";
        let realW = realH / element.getAttribute("h") * element.getAttribute("w")
        element.style.width = realW + "px";
    })
}

function SetAnchoredXPos(elements, w, h) {
    elements.forEach(element => {
        let originalW = element.getAttribute("w");
        let originalH = element.getAttribute("h");
        let realH = (h + margin)
        let realW = realH / element.getAttribute("h") * element.getAttribute("w")

        var anchorLeft = element.getAttribute('anchorL') / originalW * realW;
        var anchorRight = element.getAttribute('anchorR') / originalW * realW;

        var anchorWidth = anchorRight - anchorLeft;

        var anchorCenter = anchorLeft + (anchorRight - anchorLeft) / 2;
        var imageCenter =  realW / 2

        var distLeft = anchorLeft
        var distRight = realW - anchorRight;

        let left = 0;

        if (distLeft < distRight) {
            // keep left
            if(w >= anchorWidth + 2 * anchorLeft) {
                left = 0;
            } else {
                left = anchorLeft + (anchorWidth - w) / 2
            }
        }
        if (distRight < distLeft) {
            // keep left
            if(w >= anchorWidth + 2 * anchorRight) {
                left = realW - w;
            } else {
                left = realW - w + anchorRight + (anchorWidth - w) / 2
            }
        }
        
        element.style.left = left+"px";
    })
}

function UpdateParallax(containers, h) {
    containers.forEach(element => {
        let parallexElement = element.querySelector('.parallax-bg')
        if (parallexElement){
            var bounding = element.getBoundingClientRect();
            let fac = bounding.bottom / h;
            fac = 1 - (fac * 2)
            parallexElement.style.transform = `translateY(${(fac * margin/2)}px)`;
        }
    });
}


onMounted(() => {
    
    console.log(toRaw(store.getters.getScroll))
    const scroll = toRaw(store.getters.getScroll);
    const parallaxElements = document.querySelectorAll('.parallax-video');
    const parallaxContainers = document.querySelectorAll('.parallax-container');
    var h = (window.innerHeight || document.documentElement.clientHeight);
    var w = (window.innerWidth || document.documentElement.clientWidth);
    SetRealHeight(parallaxElements, h);
    // SetAnchoredXPos(parallaxElements,w, h);
    UpdateParallax(parallaxContainers, h);
    window.addEventListener('resize', function() {
        h = (window.innerHeight || document.documentElement.clientHeight)
        w = (window.innerWidth || document.documentElement.clientWidth)
        SetRealHeight(parallaxElements, h);
        // SetAnchoredXPos(parallaxElements,w, h);
    })
    scroll.addListener(function() {
        // Adjust the position of each parallax element based on scroll position
        UpdateParallax(parallaxContainers, h);
    });
})

</script>
<style scoped>
.parallax-container {
    @apply w-screen h-screen
    relative overflow-hidden;
}
.parallax-container .parallax-video {
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: -1; /* Ensure video stays behind other content */
}
.parallax-container .content {
    @apply w-full h-full
    flex flex-col
    sm:grid sm:grid-cols-2;
    background-color: #0000009c;
    box-shadow: inset 0px 0px 16px 2px #00000064;
}
.title {
    @apply grow flex flex-col
    justify-center items-center;
}
.title-poem {
    @apply pt-[4rem] text-white
    flex flex-col justify-center;
}
.title-poem h1 {
    @apply z-[10]
    text-2xl sm:text-2xl md:text-4xl xl:text-6xl
    font-bold italic;
    /* font-family: sans-serif; */
    text-shadow: 0px 3px 15px #ffffff3a;
    color: #ffffffc0;
}
.title-poem p {
    @apply mb-2 md:mb-6 sm:mb-4
    relative top-[-12px]
    xl:text-3xl md:text-xl sm:text-[0.8rem] text-lg
    font-bold;
    opacity: 0.4;
    font-family: Star Rail Neue;
}
.firefly-card-container {
    @apply h-auto sm:h-full grow w-full sm:w-auto
    flex justify-center items-center;
}

.firefly-card {
    max-width: 400px;
    min-width: 200px;
    width: 50%
}

.firefly-card {
    border: 6px solid white;
    border-bottom: 40px solid white;
    transform: rotate3d(1, 0, 0.5, 20deg);
    box-shadow: 0px 0px 20px 0px #243b3981;
}

.firefly-card img {
    @apply object-contain;
}
</style>
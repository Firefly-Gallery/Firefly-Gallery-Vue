<template>
    <div class="parallax-container">
        <video autoplay loop muted class="parallax-bg parallax-video" w="2560" h="1440" anchorL="0" anchorR="1200" src="/home/image_loop.mp4" />
        <div class="content t-row">
            <div class="title">
                <div class="title-poem">
                    <h1><i>我梦见一片焦土，</i></h1>
                    <p>In my dream I saw a scorched earth</p>
                    <h1><i>一株破土而生的新蕊；</i></h1>
                    <p>And a new sapling emerged from it</p>
                    <h1><i>它迎着朝阳绽放，</i></h1>
                    <p>It bloomed against the morning sun</p>
                    <h1><i>向我低语呢喃。</i></h1>
                    <p>And whispered to me</p>
                </div>
            </div>
            <a class="firefly-card-container" target="_blank" href="/home/card_large.jpg">
                <div class="firefly-card"><img src="/home/card.jpg"/></div>
            </a>
        </div>
    </div>
    <div class="parallax-container">
        <img src="/home/bg-2.jpg" class="parallax-bg parallax-video" w="2400" h="1350" />
        <div class="content t-row">
            <div class="disc-wrapper">
                <a class="disc-container" target="_blank" href="https://music.163.com/#/program?id=2536599717">
                    <div class="disc"></div>
                    <div class="disc-cover"></div>
                    <div class="disc-top"></div>
                </a>
            </div>
            <div class="title">
                <div class="title-poem">
                    <h1><i>让我的心勇敢地展翅，</i></h1>
                    <p>Let my heart brave to spread the wings</p>
                    <h1><i>翱翔过夜空，</i></h1>
                    <p>Soaring past the night</p>
                    <h1><i>追寻皎洁的月光，</i></h1>
                    <p>To trace the bright moonlight,</p>
                    <h1><i>让云彩抚平我的伤痛，</i></h1>
                    <p>Let the clouds heal me of the stains</p>
                    <h1><i>轻轻抹去我生命中的悲伤...</i></h1>
                    <p>Gently wipe the sorrows off my life,</p>
                </div>
            </div>
        </div>
    </div>
    <div class="parallax-container">
        <img src="/home/bg-3.jpg" class="parallax-bg parallax-video" w="3048" h="2360" />
        <div class="content">
            
            <div class="title">
                <div class="title-poem">
                    <h1>写不出来了，到时候放块dashboard吧</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, toRaw } from 'vue';
import { useStore } from 'vuex';
const store = useStore();


const margin = 256;

function SetRealHeight(elements, w, h) {
    elements.forEach(element => {
        let realH = (h + margin)
        element.style.height = realH + "px";
        let realW = realH / element.getAttribute("h") * element.getAttribute("w")
        element.style.width = Math.max(realW, w) + "px";
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
    SetRealHeight(parallaxElements, w, h);
    // SetAnchoredXPos(parallaxElements,w, h);
    UpdateParallax(parallaxContainers, h);
    window.addEventListener('resize', function() {
        h = (window.innerHeight || document.documentElement.clientHeight)
        w = (window.innerWidth || document.documentElement.clientWidth)
        SetRealHeight(parallaxElements, w, h);
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
    flex flex-col;
    background-color: #00000080;
    box-shadow: inset 0px 0px 16px 2px #00000033;
}

.parallax-container .content.t-row {
    @apply w-full h-full
    flex flex-col
    sm:grid sm:grid-cols-2;
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
    text-2xl sm:text-2xl md:text-4xl xl:text-5xl
    font-bold;
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
    perspective: 1200px;
}

.firefly-card {
    max-width: 350px;
    min-width: 200px;
    width: 40%
}

.firefly-card {
    border: 6px solid white;
    border-bottom: 40px solid white;
    transform: rotate3d(1.2, 0, 0.8, 20deg);
    box-shadow: 0px 0px 10px 0px #243b3981;
    opacity: 0.8;
    transition: all 250ms ease;
}
.firefly-card:hover {
    transform: rotate3d(0, 0, 0, 20deg);
    scale: 1.1;
    box-shadow: 0px 0px 20px 0px #c0fff9;
    opacity: 1.0;
    transition: all 250ms ease;
}

.firefly-card:active {
    scale: 0.97;
    opacity: 0.9;
    box-shadow: 0px 0px 10px 0px #c0fff9;
}

.firefly-card img {
    @apply object-contain;
}

.disc-wrapper {
    @apply h-auto sm:h-full grow w-full sm:w-auto
    flex justify-center items-center;
}

.disc-container {
    position: relative;
    width: 40%;
    aspect-ratio: 1;
    margin-right: 16%;
    transition: all 250ms ease;
}

.disc-cover {
    background: url("/home/cover-2x.jpg") no-repeat;
    background-size: contain;
    aspect-ratio: 1;
    width: 100%;
    box-shadow: 0px 0px 10px 0px #243b3981;
    position: relative;
    z-index: 1;
    outline: transparent solid 3px;
    transition: outline 250ms ease;
}

.disc-cover::before {
    content: "";
    position: absolute;
    top:0;left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at -100%-100%, #ffffff38 37%, #ffffff54 80%, #fff0 81%) no-repeat;
    border: 2px solid #ffffff99;
    box-shadow: inset 0px 0px 3px 0px #ffffff;
    z-index: 2;
}
.disc {
    position: absolute;
    top: 7%;
    right: -40%;
    width: 86%;
    height: 86%;
    background: url(/home/disc.png) no-repeat;
    background-size: contain;

    border-radius: 999px;;
    box-shadow: 0px 0px 10px 0px #243b3981;
    outline: transparent solid 3px;

    z-index: 0;
    animation: rotate 20s linear infinite;
    transition: outline 250ms ease;
}

.disc-container:hover {
    scale: 1.1;
}

.disc-container:hover .disc-cover, .disc-container:hover .disc {
    outline: white solid 3px;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
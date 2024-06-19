<template>
    <div class="album-wrapper">
        <a class="album-container" target="_blank" href="https://music.163.com/#/program?id=2536599717">
            <div class="disc">
              <Image src="/Introduction_Disc.png" />
            </div>
            <div class="album-cover">
              <Image src="/Introduction_AlbumCover.jpg" />
            </div>
            <div class="album-glass"></div>
        </a>
    </div>
</template>

<script setup lang="ts">
import Image from '@/components/UI/Image.vue'
</script>

<style scoped>
.album-wrapper {
    @apply h-auto md:h-full grow w-full md:w-auto
    flex justify-center items-center;
}

.album-container {
    position: relative;
    width: 40%;
    min-width: 200px;
    aspect-ratio: 1;
    margin-right: 10%;
    transition: all 250ms ease;
}

.album-cover {
    aspect-ratio: 1;
    width: 100%;
    box-shadow: 0 0 10px 0 #243b3981;
    position: relative;
    z-index: 1;
    outline: transparent solid 3px;
    transition: outline 250ms ease;
}

.album-cover::before {
    content: "";
    position: absolute;
    top:0;left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at -100%-100%, #ffffff38 37%, #ffffff54 80%, #fff0 81%) no-repeat;
    border: 2px solid #ffffff99;
    box-shadow: inset 0 0 3px 0 #ffffff;
    z-index: 2;
}
.disc {
    position: absolute;
    top: 7%;
    right: -24%;
    width: 86%;
    height: 86%;

    border-radius: 999px;;
    box-shadow: 0 0 10px 0 #243b3981;
    outline: transparent solid 3px;

    z-index: 0;
    animation: rotate 20s linear infinite;
    transition: all 250ms ease;
}

.album-container:hover {
    scale: 1.1;
    margin-right: 16%;
}

.album-container:hover .disc {
    right: -40%;
}

.album-container:hover .album-cover, .album-container:hover .disc {
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
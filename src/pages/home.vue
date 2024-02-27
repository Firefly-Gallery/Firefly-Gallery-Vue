<template>
    <ParallaxContainer :src="bg_video"
    :isVideoBackground="true" :contentClass="'content two-row'"
    w="1920" h="1080">
        <HelloWorld></HelloWorld>
    </ParallaxContainer>
</template>

<script lang="ts" setup>
import { ParallaxContainer, Album, CharacterDescription, PoemBlock } from "@/components/Home";
import HelloWorld from "@/components/Home/HelloWorld.vue";
import bg_video from "@/assets/home/bg_loop.mp4"
</script>

<style>
.parallax-container .content {
    @apply w-full h-full pt-16 md:pt-10;
    background-color: #00000080;
    box-shadow: inset 0px 0px 16px 2px #00000033;
}
.parallax-container .two-row {
    @apply flex flex-col
    md:grid md:grid-cols-2;
}
.parallax-container  .col-reverse {
    @apply flex-col-reverse;
}
.title-poem p{
    @apply text-sm opacity-[0.5];
}
</style>

<style scoped>
.firefly-card-container {
    @apply h-auto md:h-full grow w-full md:w-auto
    flex justify-center items-center;
    perspective: 1200px;
}
.firefly-card {
    max-width: 350px;
    min-width: 200px;
    width: 40%;
    border: 6px solid white;
    border-bottom: 40px solid white;
    transform: rotate3d(1.2, 0, 0.8, 20deg);
    box-shadow: 0px 0px 10px 0px #243b3981;
    opacity: 0.8;
    outline: transparent solid 3px;
    transition: all 250ms ease;
}
.firefly-card:hover {
    transform: rotate3d(0, 0, 0, 20deg);
    scale: 1.1;
    box-shadow: 0px 0px 20px 0px #c0fff9;
    opacity: 1.0;
    outline: rgb(0, 242, 255) solid 3px;
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
</style>
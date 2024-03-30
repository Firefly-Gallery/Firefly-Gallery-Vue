<template>
    <ParallaxContainer :src="'/Home_VideoPreview.jpg'"
    :videoSrc="bg_video" :contentClass="'home-content two-row'">
        <HelloWorld></HelloWorld>
    </ParallaxContainer>
</template>

<script lang="ts" setup>
import { ParallaxContainer } from "@/components/Common";
import HelloWorld from "@/components/Home/HelloWorld.vue";
import bg_video from "@/assets/videos/home_bg.webm"
</script>

<style>
.parallax-container .home-content {
    @apply w-full h-full p-0;
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

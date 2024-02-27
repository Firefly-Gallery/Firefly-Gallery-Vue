<template>
    <ParallaxContainer :src="bg_c"
    :contentClass="'darken_only'"
    w="3048" h="2360" :margin="512">
        <CharacterDescription />
    </ParallaxContainer>
    <ParallaxContainer :src="bg_a"
    :contentClass="'content two-row col-reverse'"
    w="2400" h="1350">
        <Album />
        <PoemBlock
        :lines_cn = "['让我的心勇敢地展翅，', '翱翔过夜空，', '追寻皎洁的月光，', '让云彩抚平我的伤痛，', '轻轻抹去我生命中的悲伤...']"
        :lines_en = "[
            'Let my heart brave to spread the wings', 
            'Soaring past the night',
            'To trace the bright moonlight,',
            'Let the clouds heal me of the stains',
            'Gently wipe the sorrows off my life,',
        ]" >
        <p>背景来源：<a target="_blank" href="https://www.bilibili.com/video/BV1me411n7eu">未知</a></p>
        </PoemBlock>
    </ParallaxContainer>
</template>

<script lang="ts" setup>
import { ParallaxContainer, Album, CharacterDescription, PoemBlock } from "@/components/Home";
import bg_a from "@/assets/home/bg-1.jpg"
import bg_b from "@/assets/home/bg-2.jpg"
import bg_c from "@/assets/home/bg-3.jpg"
</script>

<style>
.parallax-container .content {
    @apply w-full h-full pt-20;
    background-color: #00000080;
    box-shadow: inset 0px 0px 16px 2px #00000033;
}
.parallax-container .darken_only {
    @apply w-full h-full;
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
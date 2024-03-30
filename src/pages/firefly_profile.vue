<template>
    <ParallaxContainer :src="'/Introduction_Background_00.jpg'"
    :contentClass="'darken_only'" :margin="512">
        <CharacterDescription />
    </ParallaxContainer>
    <ParallaxContainer :src="'/Introduction_Background_01.jpg'"
    :contentClass="'content two-row col-reverse'">
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
        <p class="text-xs font-medium">背景：<a target="_blank" href="https://www.pixiv.net/artworks/115986080">貓夕</a></p>
        </PoemBlock>
    </ParallaxContainer>
</template>

<script lang="ts" setup>
import { ParallaxContainer } from "@/components/Common";
import { Album, CharacterDescription, PoemBlock } from "@/components/Profile"
</script>

<style lang="postcss">
.parallax-container .content {
    @apply w-full h-full pt-16;
    background-color: #00000080;
    box-shadow: inset 0 0 16px 2px #00000033;
}
.parallax-container .darken_only {
    @apply w-full h-full;
    background-color: #00000080;
    box-shadow: inset 0 0 16px 2px #00000033;
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

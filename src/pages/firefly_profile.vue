<template>
    <ParallaxContainer :src="'/Introduction_Background_00.png'"
    :contentClass="'no-dark'" :margin="512">
        <CharacterDescription />
    </ParallaxContainer>
</template>

<script lang="ts" setup>
import { ParallaxContainer } from "@/components/Common";
import { CharacterDescription } from "@/components/Profile"
import { onMounted } from 'vue'
import componentsVar from '@/store/componentsVar'

onMounted(() => {
  if(componentsVar.SetNavbarTransparent !== null) componentsVar.SetNavbarTransparent(true);
})
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

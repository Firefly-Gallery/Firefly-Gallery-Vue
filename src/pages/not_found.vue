<template>
  <div class="error_root">
    <Image src="/Error_Emoji.gif" class="w-40 h-40"></Image>
    <h2 class="title">404</h2>
    <p class="desc">寻求的页面践行了『虚无』命途。</p>
    <Btn name="返回上一级 / 首页" class="btn_" @click="goBack"></Btn>
  </div>
</template>

<script setup lang="ts">
import Image from '@/components/UI/Image.vue'
import Btn from '@/components/UI/Btn.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.state.back === null) {
    router.push({path: "/"}); //or whichever path you required
  } else {
    router.back();
  }
}
</script>
<style scoped lang="postcss">

.error_root {
  @apply w-screen h-screen flex flex-col gap-5 items-center justify-center;
  z-index: 1;
}

.error_root > *:not(h2.title) {
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.75));
}

.btn_ {
  margin: 0;
  padding: 5px 0;
  max-width: 300px;
  width: 100%;

}

.title {
  @apply absolute text-[50vw] md:text-[40vw] font-bold mb-3 md:mb-[5vw] z-[-1];
  opacity: 0.4;
  transform: translate(-5px, -2px);
  color: #29ffff;
}
.title::before {
  @apply text-[50vw] md:text-[40vw] font-bold mb-3 md:mb-[5vw];
  content: "404";
  position: absolute;
  color: #ffea80;
  transform: translate(5px, 2px);
  mix-blend-mode: multiply;
}

.desc {
  @apply text-lg font-medium;
  color: #80fff2;
}

</style>
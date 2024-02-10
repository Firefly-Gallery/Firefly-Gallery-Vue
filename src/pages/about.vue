<template>
  <PageHeader :title="'关于'" :sub-title="'about'" />
  <div class="flex flex-col items-center min-h-[100vh] p-10">
    <div class="flex-grow text-xl">
      <p>欢迎来到萤门的专属图库！这是专属于流萤的迷人世界，我们汇聚了大量精选的图片，展现她的美貌与温柔；</p>
      <p>这也是属于所有萤门信徒的世界，你可以浏览、保存和上传你喜爱的流萤美图，与大家一起沉浸在流萤小姐的美貌之中。</p>
      <p>愿萤火照亮开拓之旅，愿流萤永远有着幸福的明天！</p>
      <p class="text-end font-bold text-2xl">萤门！</p>
    </div>
    <p>本站由Vite和Vue构建</p>
    <div class="flex flex-row items-center justify-center">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
  </div>
</template>

<script setup>
import PageHeader from '../components/PageHeader.vue';
</script>

<style scoped>

.logo {
  position: relative;
  height: 5em;
  padding: 20px;
  will-change: filter;
  transition: filter 300ms;
  z-index: 1;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

</style>

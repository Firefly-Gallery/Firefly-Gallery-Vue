<template>
  <footer>
    <div class="footer-item title-container">
      <Image src="/Common_FooterIcon.png" class="site-icon"></Image>
    </div>
    <div class="footer-item info-container">
      <h2 class="title">流萤图站</h2>
      <p class>sblzdddd版权所有，基于Apache 2.0协议</p>
      <p>健康游戏忠告:</p>
      <div class="grid grid-cols-auto sm:grid-cols-2">
        <p>抵制不良游戏,拒绝盗版游戏。</p>
        <p>注意自我保护,谨防受骗上当。</p>
        <p>适度游戏益脑,沉迷游戏伤身。</p>
        <p>合理安排时间,享受健康生活。</p>
      </div>

      <div class="join py-1 gap-2">
        <a target="new" href="https://beian.miit.gov.cn/">粤ICP备2024204182号-1</a><span>|</span>
        <a target="new" href="https://github.com/Firefly-Gallery/Firefly-Gallery-Vue">Github</a>
      </div>
    </div>
  </footer>
</template>
  
<style scoped>
footer {
  @apply w-full h-auto flex flex-row justify-center items-center py-3;
  background-color: #00000099;
  box-shadow: #00000040 0 -2px 10px 1px;
}
.footer-item {
  @apply flex flex-col justify-center items-center
  mx-5 sm:mx-10 md:mx-20;
}
.title-container {
  @apply flex;
}

.info-container {
  @apply items-start gap-1
  text-xs font-medium;
}

.title {
  @apply text-2xl font-bold;
  background: linear-gradient(to right, #ebe1a3, #94e1c8);
  text-shadow: 0px 3px 15px #ffffff3a;
  color: #ffffffc0;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
<style>
.title-container .site-icon {
  @apply w-32 h-32;
  max-width: none;
}
</style>

<script lang="ts" setup>
import Image from '@/components/UI/Image.vue'
</script>
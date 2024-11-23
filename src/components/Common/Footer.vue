<template>
  <footer>
    <div class="footer-graphic">
      <Image src="/Common_FooterIcon.png" class="site-icon"></Image>
    </div>
    <div class="footer-item info-container">
      <h2 class="title">流萤图站</h2>
      <p class>@khglid 版权所有 ©2023-2024，基于Apache 2.0协议</p>
      <p>本图站所有出现角色均来自米哈游旗下作品《崩坏：星穹铁道》，</p>
      <p>图像版权归属于原画师和米哈游公司。</p>
      <p>如果您认为您的作品由于被转载而侵犯了您的版权，请前往“关于”页联系我们删除。</p>

      <div class="join py-1 gap-2">
        <a target="new" href="https://beian.miit.gov.cn/">粤ICP备2024204182号-1</a><span>|</span>
        <a target="new" href="https://github.com/Firefly-Gallery/Firefly-Gallery-Vue">Github</a>
      </div>
    </div>
  </footer>
</template>
  
<style scoped lang="postcss">
footer {
  @apply w-full h-auto flex flex-row justify-center items-center py-3;
  box-shadow: #00000040 0 -2px 10px 1px;
}
html[data-theme="light"] footer {
  @apply bg-white;
}
html[data-theme="dark"] footer {
  @apply bg-black;
}
.footer-item {
  @apply flex flex-col justify-center items-center
  mx-5 sm:mx-10 md:mx-20;
}
.footer-graphic {
  @apply hidden md:flex flex-col justify-center items-center
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
  text-shadow: 0 3px 15px #ffffff3a;
  color: #ffffffc0;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
<style lang="postcss">
.footer-graphic .site-icon {
  @apply h-36;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.4));
  max-width: none;
}
</style>

<script lang="ts" setup>
import Image from '@/components/UI/Image.vue'
</script>
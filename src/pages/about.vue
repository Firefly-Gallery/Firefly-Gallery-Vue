<template>
  <div class="general-container flex flex-col">
    <div class="title-container">
      <div class="title">
        <h2><i>崩坏:星穹铁道——</i></h2>
        <h1>流萤图站</h1>
      </div>
    </div>
    <div class="flex flex-rol justify-center items-center flex-wrap mb-16 gap-2">
      <img alt="Static Badge" src="https://img.shields.io/badge/5.2.2-21af90?style=flat&logo=vite&logoColor=8976fe&label=Vite&color=8976fe">
      <img alt="Static Badge" src="https://img.shields.io/badge/3.4.21-21af90?style=flat&logo=Vue.js&logoColor=42d392&label=Vue&color=42d392">
      <img alt="Static Badge" src="https://img.shields.io/badge/20.11.1-21af90?style=flat&logo=Node.js&logoColor=68ca5a&label=Node.js&color=68ca5a">
      <img alt="Static Badge" src="https://img.shields.io/badge/10.2.5-21af90?style=flat&logo=npm&logoColor=c90000&label=npm&color=c90000">

    </div>
    <div class="content flex flex-col xl:flex-row items-center justify-around gap-10">
      <div class="grow max-w-[820px] flex flex-col min-h-[100vh]">
        <div class="quote">
          <i><p>欢迎来到萤门的专属相册（流萤图站）！这是专属于流萤的迷人世界，我们汇聚了大量精选的图片，展现她的美貌与温柔；<br>
            这也是属于所有萤门信徒的世界，你可以浏览和保存和你喜爱的流萤美图，与大家一起沉浸在流萤小姐的美貌之中。<br>
            愿萤火照亮开拓之旅，愿流萤永远有着幸福的明天！</p>
            <p>萤门！</p></i>
          <p class="text-end">By
            <a target="_blank"
            href="https://www.miyoushe.com/sr/accountCenter/postList?id=332560835">
              @一位旅行者啊
            </a>（有改动）
          </p>
        </div>
        <div class="text-lg mt-5">
          流萤图站(库)，立项于2023-12-23，是一个精选集合了崩坏:星穹铁道的角色流萤的同人画作的网站。<br>
          虽然说是立项，但是几个月过去了都没有正式上线呢（笑）<br>
          本网站设立的初衷本来是一个同人网站，后为满足同人社区的需要转型为一个同人图站<br>
          当然网站主体还是以厨为主（连角色介绍都有了），重点看个人理解罢。<br>
          总而言之，希望大家玩的开心！<br>
        </div>
        <Image class="mt-16 rounded-box shadow-lg" src="http://image-cdn.firefly-gallery.cn/pixiv/115952605_p0.jpg"></Image>

      </div>
      <div class="sidebar">
        <div class="sidebar-card">
          <h2>制作名单</h2>
          <h3>万恶之源 | bug缔造者</h3>
          <div class="sidebar-link m">
            <span>@khglid</span>
            <div class="links">
              <a class="btn btn-sm btn-ghost btn-circle"
              target="_blank" href="https://github.com/sblzdddd">
                <i class="fa-brands fa-github"></i>
              </a>
              <a class="btn btn-sm btn-ghost btn-circle"
              target="_blank" href="https://space.bilibili.com/100132925">
                <i class="fa-brands fa-bilibili"></i>
              </a>
              <a class="btn btn-sm btn-ghost btn-circle"
              target="_blank" href="https://www.miyoushe.com/sr/accountCenter/postList?id=352206872">
                <i class="fa-solid fa-address-book"></i>
              </a>
            </div>
          </div>
          <h3>管饭的 | 部分文案</h3>
          <div class="sidebar-link">
            <span>@一位旅行者啊（一位行者旅啊）</span>
            <div class="links">
              <a class="btn btn-sm btn-ghost btn-circle"
                 target="_blank" href="https://www.miyoushe.com/sr/accountCenter/postList?id=332560835">
                <i class="fa-solid fa-address-book"></i>
              </a>
              <a class="btn btn-sm btn-ghost btn-circle"
                 target="_blank" href="https://space.bilibili.com/1369867958">
                <i class="fa-brands fa-bilibili"></i>
              </a>
            </div>
          </div>
          <h3>其他支持者，感谢你们！</h3>
          <div class="sidebar-link">
            <span>@iBobbyTS</span>
            <div class="links">
              <a class="btn btn-sm btn-ghost btn-circle"
                 target="_blank" href="https://github.com/iBobbyTS">
                <i class="fa-brands fa-github"></i>
              </a>
              <a class="btn btn-sm btn-ghost btn-circle"
                 target="_blank" href="https://www.miyoushe.com/sr/accountCenter/postList?id=295035465">
                <i class="fa-solid fa-address-book"></i>
              </a>
            </div>
          </div>
          <div class="sidebar-link">
            <span>@Dr王主任</span>
            <div class="links">
              <a class="btn btn-sm btn-ghost btn-circle"
                 target="_blank" href="https://www.miyoushe.com/sr/accountCenter/postList?id=33444584">
                <i class="fa-solid fa-address-book"></i>
              </a>
            </div>
          </div>
          <div class="sidebar-link">
            <span>@我的2W信用点＞_＜</span>
            <div class="links">
              <a class="btn btn-sm btn-ghost btn-circle"
                 target="_blank" href="https://github.com/Lingling-LynnChan">
                <i class="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="sidebar-card">
          <h2>反馈社区</h2>
          <a class="sidebar-link-share"
             target="_blank" href="https://github.com/Firefly-Gallery/Firefly-Gallery-Vue/issues">
            <i class="fa-brands fa-github"></i>
            Github Issues
          </a>
          <a class="sidebar-link-share"
             target="_blank" href="https://pd.qq.com/s/ftb23afp3">
            <i class="fa-solid fa-link"></i>
            QQ频道【流萤小姐后援会🌟(萤门)】
          </a>
          <a class="sidebar-link-share"
             target="_blank" href="https://discord.gg/EDTq3eu7">
            <i class="fa-solid fa-link"></i>
            <span class="line-through text-gray-600">Discord频道【Firefly Gallery】（墙）（已弃用）</span>
          </a>
          <a class="sidebar-link-share"
             target="_blank" href="https://dby.miyoushe.com/chat/18581/221407">
            <i class="fa-solid fa-link"></i>
            <span class="line-through text-gray-600">旧米游社别野（已成为时代的眼泪）</span>
          </a>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Image from '@/components/UI/Image.vue'
</script>
<style lang="postcss" scoped>
.chat-bubble::before {
  width: 0;
}

.title-container {
  @apply grow flex flex-col gap-5
  justify-center items-center mb-8;
}
.title {
  @apply text-white gap-5
  flex flex-col justify-center;
}
.title h1 {
  @apply z-[10] pb-1 md:pb-[15px]
  text-8xl md:text-7xl lg:text-8xl
  font-bold;
  background: linear-gradient(to right, #ebe1a3, #94e1c8);
  text-shadow: 0 3px 15px #ffffff3a;
  color: #ffffffc0;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.title h2 {
  @apply z-[10]
  text-2xl md:text-lg lg:text-3xl
  font-bold;
  text-shadow: 0 3px 15px #ffffff3a;
  color: #ffffffc0;
}

.quote {
  @apply text-gray-600;
}

.sidebar {
  @apply grow flex flex-col items-center gap-5
  w-full xl:max-w-[500px] xl:w-[unset] xl:h-screen;
}

.sidebar-card {
  @apply bg-base-200 w-full flex flex-col items-center p-5 gap-3
  rounded-box shadow-md;
}
.sidebar-card h2 {
  @apply text-white text-3xl;
}
.sidebar-card h3 {
  @apply mt-3
}
.sidebar-link {
  @apply btn btn-ghost rounded-full w-full justify-between no-animation;
  color: white;
}
.sidebar-link-share {
  @apply btn rounded-full w-full justify-start;
  color: white;
}
.sidebar-link .p-link {
  @apply btn btn-sm btn-ghost btn-circle;
}
.m {
  color: #80fff2;
}
.general-container {
  @apply px-10 xl:px-20
}
</style>
<style>

</style>

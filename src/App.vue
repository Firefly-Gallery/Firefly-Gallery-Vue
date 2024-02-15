<template>
  <!-- 加载动画 -->
  <!-- 导航栏 -->
  <Navbar ref="navbarRef" />
  <!-- 页面视图 -->
  <div id="SmoothScrollContainer" ref="SmoothScrollContainer">
    <PageHeader v-if="$route.name != 'home'" ref="Header"
    :title="GetDisplayName($route.name)" :subTitle="$route.name" />
    <router-view />
  </div>
  <!-- 其他 -->
  <SiteNotification ref="notifiRef" />
  <Loading ref="loadingRef" @check-loading="CheckLoadingState()" />
  <BackgroundPlayer :src="'/musics/bgm_instrumental.ogg'" />
</template>

<script setup>
import { Navbar, PageHeader, SiteNotification, BackgroundPlayer } from "@/components/Common"
import { Loading } from "@/components/Loading"
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import Scrollbar from 'smooth-scrollbar';
import { useStore } from 'vuex';
import { GetDisplayName } from "@/navigations"

const router = useRouter();

const store = useStore();

const loadingRef = ref();
const navbarRef = ref();
const notifiRef = ref();
const SmoothScrollContainer = ref();
const Header = ref();

let scrollBar;

const CheckLoadingState = () => {
  // 每300毫秒检查页面是否加载完成
  let timer = setInterval(() => {
    if (document.readyState === "complete") {
      // 加载完成
      console.log("page loading completed");
      clearInterval(timer);

      SetNavbarTransparent(true);
      // 淡出
      loadingRef.value.outTransition();

      // 回顶
      scrollBar.scrollTo(0, 0)

      // 由于App.vue的onMounted再子组件之后，头部（依赖于smooth-scroll实例）初始化需要后置
      if(Header.value) {
        Header.value.Init();
      }

      // 加载完之后显示通知
      notifiRef.value.Init();
    }
  }, 500);
}
const SetNavbarTransparent = (tr) => {
  navbarRef.value.setTransparency(tr);
}
onMounted(() => {
  scrollBar = Scrollbar.init(SmoothScrollContainer.value, {"damping": 0.1});
  console.log(scrollBar)
  
  store.commit('setScroll', scrollBar);
  // Header.value.Init();

  CheckLoadingState();
  // 切换页面时接入加载动画
  router.beforeEach((to, from, next) => {
    loadingRef.value.inTransition(next);
  });
});
defineExpose({SetNavbarTransparent, CheckLoadingState});
</script>
<style scoped>
#SmoothScrollContainer {
  @apply w-screen h-screen overflow-x-hidden overflow-y-auto;
}
</style>

<template>
  <!-- 加载动画 -->
  <!-- 导航栏 -->
  <Navbar ref="navbarRef" />
  <!-- 页面视图 -->
  <div id="SmoothScrollContainer">
    <router-view @changeTransparent="SetNavbarTransparent" />
  </div>
  <!-- 其他 -->
  <SiteNotification ref="notifiRef" />
  <Loading ref="loadingRef" @check-loading="CheckLoadingState()" />
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Loading from "./components/Loading.vue";
import SiteNotification from './components/SiteNotification.vue';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import Scrollbar from 'smooth-scrollbar';
import { useStore } from 'vuex';

const store = useStore();

const loadingRef = ref();
const navbarRef = ref();
const notifiRef = ref();

let isFirstAccess = true;

const router = useRouter();

const CheckLoadingState = () => {
  // 每300毫秒检查页面是否加载完成
  let timer = setInterval(() => {
    if (document.readyState === "complete") {
      // 加载完成
      console.log("page loading completed");
      clearInterval(timer);
      // 淡出
      loadingRef.value.outTransition();

      if (isFirstAccess) {
        notifiRef.value.ShowNotification();
        isFirstAccess = false;
      }
    }
  }, 300);
}
const SetNavbarTransparent = (tr) => {
  navbarRef.value.setTransparency(tr);
}
onMounted(() => {
  const scr = Scrollbar.init(document.querySelector('#SmoothScrollContainer'), {"damping": 0.1});
  console.log(scr)
  
  store.commit('setScroll', scr);
  console.log()

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

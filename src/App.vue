<template>
  <!-- 加载动画 -->
  <!-- 导航栏 -->
  <Navbar ref="navbarRef" />
  <!-- 页面视图 -->
  <custom-scrollbar :class="'scrollContainer'" ref="scroll"
                    :autoHideDelay="1000" :thumbWidth="10">
    <router-view />
    <Footer ref="footerRef" />
  </custom-scrollbar>
  <!-- 加载 -->
  <Loading v-if="setting.loading" ref="loadingRef" @check-loading="CheckLoadingState()" />
  <!-- 弹窗组件 -->
  <Component
    v-for="(item, key) in popupComponents"
    :index="item.index"
    :name="key"
    :is="item.component"
    :key="key"
    @close="closeWindow"
  />
  <!-- aplayer -->
   <Player />
  <ErrorLogModal />
</template>

<script lang="ts" setup>
import { Navbar, Footer } from "@/components/Common";
import { Player } from "./components/Common";
import { Loading } from "@/components/Loading";
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router';
import componentsVar from '@/store/componentsVar';
import { GetPage } from '@/navigations';
import { closeWindow, popupComponents } from '@/components/Popup';
import { setting } from '@/store/setting'
import ErrorLogModal from '@/components/Popup/ErrorLogModal.vue'

const router = useRouter();

const loadingRef = ref();
const navbarRef = ref();
const scroll = ref<{ scrollEl: HTMLDivElement; }>();
// const scroll = ref<HTMLDivElement>();
const footerRef = ref();

const CheckLoadingState = () => {
  // 每300毫秒检查页面是否加载完成
  let timer = setInterval(() => {
    if (document.readyState === "complete") {
      // 加载完成
      console.log("page loading completed");
      clearInterval(timer);

      // 回顶
      if(scroll.value) {
        scroll.value.scrollEl.scrollTop = 0;
        // scroll.value.scrollTop = 0;
        // 由于App.vue的onMounted再子组件之后，头部（依赖于页面滚动）初始化需要后置
      }

      if(!setting.loading) return;
      // 淡出
      loadingRef.value.outTransition();
    }
  }, 500);
}
const isMobile = () => {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}
onMounted(() => {
  if(isMobile()) {
  }
  if(scroll.value) {
    // componentsVar.scroll = scroll.value;
    componentsVar.scroll = scroll.value.scrollEl;
  }

  CheckLoadingState();
  // 切换页面时接入加载动画
  router.beforeEach((to, from, next) => {
    if(!setting.loading) {
      next();
      return
    }
    console.log("loading overlay in")
    loadingRef.value.inTransition(next);
  });
  const DEFAULT_TITLE = '首页 | 流萤图站';
  router.afterEach((to, from) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    nextTick(() => {
      document.title = <string>to.meta.title || DEFAULT_TITLE;
    });
  });
});

defineExpose({CheckLoadingState});

</script>
<style lang="stylus" scoped>

#popup-container
  position fixed
  top 0
  left 0
  transform-origin left top

</style>
<style lang="stylus">
.scrollContainer
  @apply w-screen h-screen overflow-x-hidden overflow-y-scroll;
  height 100svh
.scrollbar__thumbPlaceholder
  z-index 20
  .scrollbar__thumb
    background-color inherit!important
    background linear-gradient(to bottom, #68ffba50, #71efff50)
  &:not(.scrollbar__thumbPlaceholder--scrolling, :hover)
    pointer-events none
    opacity 0!important
.page-main
  @apply overflow-x-hidden overflow-y-auto h-screen;
  transform-style: preserve-3d;
  perspective: 1px;

  /* width */
  &::-webkit-scrollbar
    width: 0;

</style>

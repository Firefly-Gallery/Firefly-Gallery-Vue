<template>
  <!-- 加载动画 -->
  <!-- 导航栏 -->
  <Navbar ref="navbarRef" />
  <!-- 页面视图 -->
  <div class="page-main" ref="scroll">
    <Header v-if="!(GetPage($route.name)?.noHeader)" ref="headerRef"
    :title="GetPage($route.name)?.displayName" :subTitle="$route.name" />
    <router-view />
    <Footer ref="footerRef" />
  </div>
  <!-- 加载 -->
  <Loading ref="loadingRef" @check-loading="CheckLoadingState()" />
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
</template>

<script lang="ts" setup>
import { Navbar, Header, Footer } from "@/components/Common";
import { Player } from "./components/Common";
import { Loading } from "@/components/Loading";
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router';
import componentsVar from '@/store/componentsVar';
import { GetPage } from '@/navigations';
import { closeWindow, popupComponents } from '@/components/Popup';
import { setting } from '@/store/setting'

const router = useRouter();

const loadingRef = ref();
const navbarRef = ref();
const scroll = ref<HTMLDivElement>();

const headerRef = ref();
const footerRef = ref();

const CheckLoadingState = () => {
  // 每300毫秒检查页面是否加载完成
  let timer = setInterval(() => {
    if (document.readyState === "complete") {
      // 加载完成
      console.log("page loading completed");
      clearInterval(timer);

      
      navbarRef.value.setTransparency(true);

      // 淡出
      loadingRef.value.outTransition();

      // 回顶
      if(scroll.value) {
        scroll.value.scrollTop = 0;
        // 由于App.vue的onMounted再子组件之后，头部（依赖于页面滚动）初始化需要后置
        if(headerRef.value) {
          headerRef.value.Init(scroll.value);
        }
      }


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
  console.log(scroll.value)
  if(isMobile()) {
    setting.scrollbar_damping = 0.006;
  }
  if(scroll.value) {
    componentsVar.scroll = scroll.value;
    headerRef.value.Init(scroll.value);
  }

  CheckLoadingState();
  // 切换页面时接入加载动画
  router.beforeEach((to, from, next) => {
    loadingRef.value.inTransition(next);
  });
  const DEFAULT_TITLE = '首页 | 流萤图站';
  router.afterEach((to, from) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    nextTick(() => {
      document.title = to.meta.title || DEFAULT_TITLE;
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
.page-main
  @apply overflow-x-hidden overflow-y-auto h-screen;
  transform-style: preserve-3d;
  perspective: 1px;

  /* width */
  &::-webkit-scrollbar
    width: 0px;

</style>

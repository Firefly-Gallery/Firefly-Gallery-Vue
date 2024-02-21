<template>
  <!-- 加载动画 -->
  <!-- 导航栏 -->
  <Navbar ref="navbarRef" />
  <!-- 页面视图 -->
  <div id="SmoothScrollContainer" ref="SmoothScrollContainer">
    <Header v-if="$route.name != 'home'" ref="headerRef"
    :title="GetDisplayName($route.name)" :subTitle="$route.name" />
    <router-view />
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
import { Navbar, Header, Player } from "@/components/Common";
import { Loading } from "@/components/Loading";
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Scrollbar from 'smooth-scrollbar';
import componentsVar from '@/store/componentsVar';
import { GetDisplayName } from "@/navigations/index";
import { closeWindow, popupComponents } from '@/assets/scripts/popup';

const router = useRouter();

const loadingRef = ref();
const navbarRef = ref();
const SmoothScrollContainer = ref();
const headerRef = ref();

let scrollBar: Scrollbar;

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
      scrollBar.scrollTo(0, 0)

      // 由于App.vue的onMounted再子组件之后，头部（依赖于smooth-scroll实例）初始化需要后置
      if(headerRef.value) {
        headerRef.value.Init();
      }

    }
  }, 500);
}

onMounted(() => {
  scrollBar = Scrollbar.init(SmoothScrollContainer.value, {"damping": 0.05});
  
  componentsVar.scroll = scrollBar;
  headerRef.value.Init();

  CheckLoadingState();
  // 切换页面时接入加载动画
  router.beforeEach((to, from, next) => {
    loadingRef.value.inTransition(next);
  });
});

defineExpose({CheckLoadingState});

</script>
<style lang="stylus" scoped>
#SmoothScrollContainer
  @apply w-screen h-screen overflow-x-hidden overflow-y-auto;

#popup-container
  position fixed
  top 0
  left 0
  transform-origin left top

</style>

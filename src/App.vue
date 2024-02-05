<script setup>
import Navbar from './components/Navbar.vue';
import Loading from "./components/Loading.vue"
</script>

<template>
  <!-- 加载动画 -->
  <Loading ref="loading" @check-loading="CheckLoadingState()" />
  <!-- 导航栏 -->
  <Navbar></Navbar>
  <!-- 页面视图 -->
  <router-view></router-view>
</template>

<script>

export default {
  name: "App",
  components: {
    Loading,
  },
  methods: {
    CheckLoadingState() {
      // 每300毫秒检查页面是否加载完成
      let timer = setInterval(() => {
        if (document.readyState === "complete") {
          // 加载完成
          console.log("page loading completed");
          clearInterval(timer);
          // 淡出
          this.$refs.loading.out();
        }
      }, 300);
    },
  },
  mounted() {
    this.CheckLoadingState();
    // 切换页面时接入加载动画
    this.$router.beforeEach((to, from, next) => {
      this.$refs.loading.in(next);
    });
  },
};
</script>

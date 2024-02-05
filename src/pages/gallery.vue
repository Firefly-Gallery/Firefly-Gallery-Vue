<template>
  <header class="header-container">
    <div class="cover">
      <div class="darken bg-black/50 w-full h-full flex items-center justify-center">
        <h1 class="text-white">图库</h1>
      </div>
    </div>
  </header>
  <div class="gallery-container min-h-[200vh]"></div>
</template>

<style scoped>

header.header-container {
  position: relative;
  height: calc(10vw + 300px);
  width: 100%;
  overflow: hidden;
  box-shadow: inset black 0 0 0 0;
}

.cover {
  height: calc(10vw + 300px);
  width: 100%;
  background: url(/gallery/head.jpg) no-repeat;
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;
  position: absolute;
  transform: translate(0px, 0px);
  box-shadow: inset #00000040 0px -3px 10px 0px;
}

.cover h1 {
  font-size: 4rem;
  font-weight: 800;
}

</style>

<script>
export default {
  mounted() {
    let header = document.querySelector('.header-container')
    this.headerHeight = header.clientHeight;
    console.log(this.headerHeight)
    this.cover = document.querySelector('.cover');

    window.addEventListener('scroll', this.handleScroll);
  },
  data() {
    return {
      headerHeight: 0,
      cover: null,
    };
  },
  methods: {
    handleScroll() {
      var wScroll = window.scrollY || window.pageYOffset;

      if (wScroll <= this.headerHeight) {
        this.cover.style.transform = 'translate(0px, ' + wScroll/2  + 'px)';
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};

</script>
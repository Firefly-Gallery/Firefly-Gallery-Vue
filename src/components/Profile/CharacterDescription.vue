<template>
  <ParallaxContainer :src="'/Introduction_AvatarPortrait.png'" :extraContent="spineLoaded"
  :contentClass="'content-nodark'" :margin="300" :imageZ="0" ref="portraitLayer">
    <template v-slot:content>
      <iframe ref="spineAnim" class="w-full h-screen"></iframe>
    </template>

    <div class="chardesc-container">
        <div class="Up">
            <div class="char-name-block">
              <Image src="/Introduction_FireflyIconWhite.svg" class="h-[200px] drop-shadow-md" />
                <div class="icons">
                    <Image src="/Introduction_FiveStarsIcon.svg" class="h-7 drop-shadow-md" :otherFormats="[]" />
                    <Image src="/Introduction_FireIcon.png" class="w-10 h-10 drop-shadow-md" />
                    <Image src="/Introduction_DestinyIcon.png" class="w-10 h-10 drop-shadow-md" />
                </div>
            </div>
            <div class="top-right">
                <p class="quote quote-start"><span> 「</span>我梦见一片焦土，一株破土而生的新蕊；</p>
                <p class="quote quote-end">它迎着朝阳绽放，向我低语呢喃。<span>」</span></p>
            </div>
        </div>
        <div class="Down">
            <table class="table">
            <tbody>
                <tr style="display:none">
                    <th>全名/本名</th>
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <th style="width:100px">稀有度</th>
                    <td colspan="3">★ ★ ★ ★ ★</td>
                </tr>
                <tr>
                    <th>命途</th>
                    <td colspan="3">毁灭</td>
                </tr>
                <tr>
                    <th>战斗属性</th>
                    <td colspan="3">火</td>
                </tr>
                <tr>
                    <th>阵营</th>
                    <td colspan="3">
                        星核猎手
                    </td>
                </tr>
                <tr>
                    <th>常驻/限定</th>
                    <td colspan="3">限定</td>
                </tr>
                <tr>
                    <th>实装日期</th>
                    <td colspan="3">未实装</td>
                </tr>
            </tbody>
            </table>
            <div class="bottom-right">
                <div class="join">
                    <button class="btn2">wiki</button>
                    <button class="btn2" 
                    @click="openWindow('imageViewer', {
                      title: '立绘',
                      'src': [
                        largeAvatarPortrait,
                        avatarPosterA,
                        avatarPosterB
                      ]
                    })"
                    >立绘</button>
                  <button :disabled="changePortraitBtnDisabled" class="btn2" @click="changePortrait()">切换模式</button>
                  <button class="btn2" @click="openWindow('modelViewer')">模型</button>
                </div>
                <p class="char-description">
                  星核猎手成员，身着机械装甲「萨姆」的少女。<br>
                  以兵器的身份诞生，因基因改造罹患「失熵」的痛苦。<br>
                  为寻求生命的意义加入星核猎手，不断追逐违抗命运的方式。
                </p>
            </div>
        </div>
    </div>
  </ParallaxContainer>
</template>

<script lang="ts" setup>

import { ref, type Ref, onMounted } from 'vue';
import ParallaxContainer from '../Common/ParallaxContainer.vue';
import largeAvatarPortrait from '@/assets/extra/Introduction_AvatarPortrait.png'
import avatarPosterA from '@/assets/extra/Introduction_AvatarPoster2.jpg'
import avatarPosterB from '@/assets/extra/Introduction_AvatarPoster1.jpg'
import { openWindow } from '@/components/Popup';
import Image from '@/components/UI/Image.vue'
import spine_anim_src from '@/assets/extra/firefly_spine_anim.html'

const showOverlay: Ref<boolean> = ref(true);
const portraitLayer = ref()
const spineLoaded: Ref<boolean> = ref(false);
const changePortraitBtnDisabled: Ref<boolean> = ref(true);
let srcFilled = false

const ModelPreviewer = ref();
const spineAnim = ref()
function LoadModelPreview() {
    ModelPreviewer.value.src = "https://firefly-render-three.pages.dev/index.html"
    showOverlay.value = false
}

const fillSrc = () => {
  spineAnim.value.src = spine_anim_src;
  srcFilled = true;
  changePortraitBtnDisabled.value = true;
}


const receiveMessage = (ev: any) => {
  console.log(ev.data)
  if(ev.data.message === 'spineCompleteLoad' && srcFilled) {
    setTimeout(() => {
      spineLoaded.value = true;
      changePortraitBtnDisabled.value = false;
    }, 100)
  }
}

const changePortrait = () => {
  if(srcFilled) {
    changePortraitBtnDisabled.value = true;
    srcFilled = false;
    spineLoaded.value = false;
    setTimeout(() => {
      spineAnim.value.src = "";
      changePortraitBtnDisabled.value = false;
    }, 400)
  } else {
    fillSrc()
  }

}

onMounted(() => {
  if (document.readyState === "complete") {
    fillSrc()
  } else {
    document.addEventListener('readystatechange', () => {
      if (document.readyState === "complete") {
        fillSrc()
      }
    });
  };
  window.addEventListener('message', receiveMessage)
})

</script>

<style>
.parallax-container .content-nodark {
    @apply w-full h-full pt-20;
    background: none;
}
</style>

<style scoped>
iframe {
  color-scheme: none;
  @apply w-full h-full;
}
.chardesc-container {
    @apply relative w-full h-full z-[10]
    pb-4 px-4 lg:px-10 pb-10
    flex-grow flex flex-col gap-2 lg:gap-5 items-stretch text-white;
}
.Up {
    @apply flex-grow flex flex-col md:flex-row gap-2 md:gap-5 items-start justify-center h-auto md:h-[100%];
}
.top-right {
    @apply w-full md:w-auto p-2 ;
    /* border-2 border-black ;
    background: #0000004c; */
}
.icons {
    @apply flex flex-row items-center h-8 ml-2 my-5 gap-3;
}
.quote {
    @apply relative z-[10] pb-1 md:pb-[15px]
    text-lg md:text-lg lg:text-xl;
    text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.51);
    color: #ffffff;
    font-weight: 700;
    /* text-decoration: underline rgba(255, 255, 255, 0.404); */
    font-family: Hanyiwenhei;
}
.quote span {
    @apply text-2xl;
    text-decoration: none;
}
.quote-start {
    @apply mr-0 md:mr-20;
}
.quote-end {
    @apply text-right pb-0;
}
.Down {
    @apply flex flex-col lg:flex-row gap-2 lg:gap-5 items-end justify-between h-auto lg:h-[100%];
}
.char-name-block {
    @apply flex-grow flex flex-col items-start;
}
h2.char-name {
    @apply text-8xl;
    text-shadow: 0px 3px 15px #ffffff5a;
    font-family: Hanyiwenhei;
}
p.char-name-sub {
    @apply text-xl pt-2 pl-3;
    text-shadow: 0px 3px 15px #ffffff5a;
    font-family: Star Rail Neue;
}
.char-description {
    @apply p-5 bg-[#00000050] border-2 border-black w-full lg:w-auto;
}
.btn2 {
    @apply btn btn-ghost grow btn-sm lg:btn-md lg:w-auto lg:px-8 join-item;
}
.bottom-right {
    @apply flex flex-col-reverse lg:flex-col w-full lg:w-auto items-stretch lg:items-end gap-3;
}
table {
    @apply w-full lg:w-auto;
    background-color: #00000050;
    border: 2px solid #000000;
    color: #fff;
    min-width: 300px;
    border-radius: 0px;
}
table>tr>th, table>*>tr>th {
    background-color: rgb(40 35 30 / 84%);
    text-align: center;
    color: #e5e5e5;
    @apply px-4 py-2;
}
table>tr>td, table>*>tr>td {
    @apply px-4 py-2;

}
.back {
    @apply absolute right-[0] top-[0] w-screen h-screen 
    flex flex-row justify-center items-center;
    z-index: 0;
}
</style>
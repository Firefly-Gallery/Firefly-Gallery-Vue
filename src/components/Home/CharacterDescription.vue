<template>
    <ParallaxContainer :src="test_lihui"
    :contentClass="'content-nodark'"
    w="1609" h="1440" :margin="256" :imageZ="0">
    <div class="chardesc-container">
        <div class="Up">
            <div class="char-name-block">
                <h2 class="char-name">流萤</h2>
                <p class="char-name-sub">Firefly</p>
                <div class="icons">
                    <img :src="stars" class="h-7">
                    <img :src="fire_icon" class="w-10 h-10">
                    <img :src="xuwu_icon" class="w-10 h-10">
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
                <tr>
                    <th style="width:100px">性别</th>
                    <td colspan="3">女</td>
                </tr>
                <tr style="display:none">
                    <th>全名/本名</th>
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <th>稀有度</th>
                    <td colspan="3">未知</td>
                </tr>
                <tr>
                    <th>命途</th>
                    <td colspan="3">未知</td>
                </tr>
                <tr>
                    <th>战斗属性</th>
                    <td colspan="3">未知</td>
                </tr>
                <tr>
                    <th>阵营</th>
                    <td colspan="3">
                        <a href="https://wiki.biligame.com/sr/%E5%8C%B9%E8%AF%BA%E5%BA%B7%E5%B0%BC"
                        target="_blank" title="匹诺康尼">匹诺康尼</a>
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
                    @click="openWindow('imageViewer', {title: '立绘', 'src': test_lihui})"
                    >立绘</button>
                    <button class="btn2" @click="openWindow('modelViewer')">模型</button>
                </div>
                <p class="char-description">
                    自称是鸢尾花家系的新人艺者，现实中患有「失熵症」的神秘少女。<br>
                    被猎犬家系成员当作偷渡犯，后为报答开拓者出手解围主动担任导游一职。
                </p>
            </div>
        </div>
    </div>
    </ParallaxContainer>
</template>

<script lang="ts" setup>

import { ref, type Ref, onMounted } from 'vue';
import ParallaxContainer from './ParallaxContainer.vue';
import stars from '@/assets/about/5_star.svg'
import fire_icon from '@/assets/about/75px-火.png'
import xuwu_icon from '@/assets/about/75px-虚无-白.png'
import test_lihui from '@/assets/about/test-lihui.png'
import { openWindow } from '@/components/Popup';

const showOverlay: Ref<boolean> = ref(true);

let ModelPreviewer = ref();
function LoadModelPreview() {
    ModelPreviewer.value.src = "https://firefly-render-three.pages.dev/index.html"
    showOverlay.value = false
}

</script>

<style>
.parallax-container .content-nodark {
    @apply w-full h-full pt-20;
    background: none;
}
</style>

<style scoped>
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
    background: linear-gradient(to right, #94e1c8, #ebe1a3);
    text-shadow: 0px 2px 5px #9f9f9f5a;
    color: #ffffff;
    font-weight: 700;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
.back .lihui {
    @apply mx-0 lg:mx-[6vw] text-white text-xl h-full
    flex items-center justify-center aspect-[1609/1440]
    border-2 border-white border-dotted;
    background: url("@/assets/about/test-lihui.png") no-repeat;
    background-size: contain;
    scale: 1.2;
}
</style>
<template>
    <div class="chardesc-container">
        <div class="char-name-block">
            <h2 class="char-name">流萤</h2>
            <p class="char-name-sub">Firefly</p>
        </div>
            <div class="Infos">
            <table class="table">
            <tbody>
                <tr>
                    <th style="width:30%">性别</th>
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
                <tr>
                    <th>TAG</th>
                    <td style="font-size:12px;" colspan="3">[]</td>
                </tr>
            </tbody>
            </table>
            <table class="table">
            <tbody>
                <tr>
                    <th style="width:96px">汉语CV</th>
                    <td colspan="3">宋媛媛</td>
                </tr>
                <tr>
                    <th>英语CV</th>
                    <td colspan="3">Analesa Fisher</td>
                </tr>
                <tr>
                    <th>日语CV</th>
                    <td colspan="3">楠木ともり</td>
                </tr>
                <tr>
                    <th>韩语CV</th>
                    <td colspan="3">유혜지</td>
                </tr>
            </tbody>
            </table>
        </div>
        <p class="char-description">
            自称是鸢尾花家系的新人艺者，现实中患有「失熵症」的神秘少女。<br>
            被猎犬家系成员当作偷渡犯，后为报答开拓者出手解围主动担任导游一职。
        </p>
    </div>
    <div class="back">
        <a class="lihui">暂无立绘</a>
        <div class="model-preview-container">
            <div class="overlay" v-if="showOverlay" >
                <button class="btn-ghost btn-lg" @click="LoadModelPreview()">点击加载模型</button>
            </div>
            <iframe ref="ModelPreviewer" src="" style="color-scheme: none;" allowtransparency="true"></iframe>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';

const showOverlay = ref(true);

let ModelPreviewer = ref();
function LoadModelPreview() {
    ModelPreviewer.value.src = "https://firefly-render-three.pages.dev/index.html"
    showOverlay.value = false
}

</script>

<style scoped>
.chardesc-container {
    @apply relative w-full h-full z-[10]
    pt-20 px-4 lg:p-20
    flex-grow flex flex-row gap-5 items-end text-white;
    pointer-events: none;
}
.char-name-block {
    @apply flex flex-col items-center;
}
h2.char-name {
    @apply text-8xl;
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-family: Hanyiwenhei;
}
p.char-name-sub {
    @apply text-xl pt-2;
    font-family: Star Rail Neue;
}
.Infos {
    @apply flex-grow flex flex-row gap-6 items-end;
}
.char-description {
    @apply p-5 bg-[#00000050] border-2 border-black;
}
table {
    pointer-events: auto;
    background-color: #00000050;
    border: 2px solid #000000;
    color: #fff;
    /* min-width: 10px; */
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
    @apply absolute right-[0] top-[0] w-screen h-screen p-20
    flex flex-row;
    z-index: 0;
}
.back .lihui {
    @apply flex-grow mx-28 text-white text-xl 
    flex items-center justify-center
    border-2 border-white border-dotted bg-[#ffffff20];
    scale: 1.3;
}
.model-preview-container {
    @apply relative h-full;
    aspect-ratio: 9/16;
}
.model-preview-container iframe {
    @apply w-full h-full
}
.model-preview-container .overlay {
    @apply absolute w-full h-full flex items-center justify-center;
}
</style>
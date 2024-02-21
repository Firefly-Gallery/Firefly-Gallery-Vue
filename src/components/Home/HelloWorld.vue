<template>
    <div class="title-container">
        <div class="title">
            <h2><i>崩坏:星穹铁道——</i></h2>
            <h1>流萤图库</h1>
            <p>
                一个简单的同人图站。
            </p>
            <div class="btn-group">
                <Btn name="浏览图库" class="btn_" @click=""></Btn>
                <Btn name="角色介绍" class="btn_"></Btn>
            </div>
        </div>
    </div>
    <div class="firefly-card-container">
        <button class="firefly-card" @click="openWindow('viewer', {title: 'firefly-card', 'src': card})"><img src="@/assets/home/card.jpg"/></button>
    </div>
</template>
<script lang='ts' setup>
import card from '@/assets/home/card.jpg'
import { openWindow } from '@/assets/scripts/popup';
import Btn from '../UI/Btn.vue';
</script>
<style>

.btn_>span {
    margin: 0px!important;
}
</style>
<style scoped>

.title-container {
    @apply grow flex flex-col gap-5
    justify-center items-center;
}
.title {
    @apply text-white gap-5
    flex flex-col justify-center;
    opacity: 0.8;
}
.title h1 {
    @apply z-[10] pb-1 md:pb-[15px]
    text-8xl md:text-6xl lg:text-8xl
    font-bold;
    background: linear-gradient(to right, #ebe1a3, #94e1c8);
    text-shadow: 0px 3px 15px #ffffff3a;
    color: #ffffffc0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.title h2 {
    @apply z-[10] hidden md:block
    text-2xl md:text-lg lg:text-3xl
    font-bold;
    text-shadow: 0px 3px 15px #ffffff3a;
    color: #ffffffc0;
}
.title p{
    @apply text-sm lg:text-lg ml-2;
    font-weight: 400;
}
.two-row {
    @apply flex flex-col
    md:grid md:grid-cols-2;
}
.btn-group {
    @apply mt-0 md:mt-2 flex flex-col lg:flex-row gap-5 justify-center md:justify-start;
}
.btn_ {
    margin:0px;
    padding: 5px auto;
}
.firefly-card-container {
    @apply h-auto md:h-full grow w-full md:w-auto
    flex justify-center items-center;
    perspective: 1200px;
}
.firefly-card {
    max-width: 350px;
    min-width: 200px;
    width: 40%;
    border: 6px solid white;
    border-bottom: 40px solid white;
    transform: rotate3d(1.2, 0, 0.8, 20deg);
    box-shadow: 0px 0px 10px 0px #243b3981;
    opacity: 0.8;
    outline: transparent solid 3px;
    transition: all 250ms ease;
}
.firefly-card:hover {
    transform: rotate3d(0, 0, 0, 20deg);
    scale: 1.1;
    box-shadow: 0px 0px 20px 0px #c0fff9;
    opacity: 1.0;
    outline: rgb(0, 242, 255) solid 3px;
    transition: all 250ms ease;
}
.firefly-card:active {
    scale: 0.97;
    opacity: 0.9;
    box-shadow: 0px 0px 10px 0px #c0fff9;
}
.firefly-card img {
    @apply object-contain;
}
</style>
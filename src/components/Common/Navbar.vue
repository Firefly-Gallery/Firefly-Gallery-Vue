<template>
  <div :class="{'nav-root': true, 'navbar-transparent': isTransparent, 'backdrop-blur-sm': setting.enable_blur,
  'bg-[#181818f0]': !setting.enable_blur, 'bg-base-100/80': setting.enable_blur }">
    <div class="navbar-start">
      <!-- 手机版下拉式导航列表 -->
      <div class="dropdown hidden">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <img :src="siteIcon" class="rounded-full w-10 h-10" />
        </div>
        <ul tabindex="0" class="dropdown-content mt-3 z-[999] p-2 shadow bg-base-200 rounded-box w-32">
          <!-- 渲染手机导航列表 -->
          <li>
            <button class="btn w-full" @click="$router.push('/')">
              <component :is="home.icon" class="h-5 w-5" />
              {{ home.displayName }}
            </button>
          </li>
          <template v-for="(navItem, index) in navigations" :key="index">
            <li v-if="!navItem.hidden">
              <button class="btn w-full" @click="$router.push(navItem.pageName)">
                <component :is="navItem.icon" class="icon h-5 w-5" />
                {{ navItem.displayName }}
              </button>
            </li>
          </template>
        </ul>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="首页">
        <button class="inline-flex btn btn-ghost btn-circle" @click="$router.push('home')">
          <img :src="siteIcon" class="rounded-full w-10 h-10" />
        </button>
      </div>
      <!-- 渲染电脑版导航列表 -->
      <div class="ml-2 flex gap-2">
        <template v-for="(navItem, index) in navigations" :key="index">
          <div class="tooltip tooltip-bottom" v-if="!navItem.hidden" :data-tip="navItem.displayName">
            <button class="btn btn-circle btn-ghost" @click="$router.push(navItem.pageName)">
              <component :is="navItem.icon" class="icon h-5 w-5" />
            </button>
          </div>
        </template>
      </div>
    </div>
    <div class="navbar-end">

      <!-- 主题切换 -->
      <div class="tooltip tooltip-left" data-tip="亮/暗主题">

          <button data-toggle-theme="dark,light" data-act-class="icon-set-light" @click="updateThemeStatus()"
                  class="theme-toggle btn btn-circle btn-ghost">
              <SunIcon v-if="lightTheme" class="sun h-6 w-6 text-gray-500"/>
              <MoonIcon v-else class="moon h-6 w-6 text-gray-500" />
          </button>

      </div>
<!--      <button class="settings btn btn-circle btn-ghost" @click="openWindow('setting');">-->
<!--        <Cog6ToothIcon class="icon h-6 w-6"></Cog6ToothIcon>-->
<!--      </button>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SunIcon, MoonIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { themeChange } from 'theme-change'
import { navigations, home } from '@/navigations'

import { ref, onMounted } from 'vue'

import componentsVar from '@/store/componentsVar'
import { setting } from '@/store/setting'

onMounted(() => {
  componentsVar.SetNavbarTransparent = setTransparency
  setTransparency(true);
})

const prop = defineProps({
  isLightTheme: {
    type: Boolean
  }
})

const lightTheme = ref(false)

const isTransparent = ref(true)
const siteIcon = '/icon/LiuYingPure.svg'

const updateThemeStatus = () => {
  lightTheme.value = !lightTheme.value
}

const setTransparency = (tr:boolean) => {
  isTransparent.value = tr
}

onMounted(() => {
  let isLightTheme = localStorage.getItem('theme')
  if (isLightTheme === null) {
    lightTheme.value = false
    localStorage.setItem('theme', 'dark')
    console.log('set default dark theme')
  } else {
    console.log('local storage theme = ' + isLightTheme)
    lightTheme.value = isLightTheme === 'light'
  }
})
themeChange()

defineExpose({ updateThemeStatus, setTransparency })
</script>

<style scoped lang="postcss">
.nav-root {
  @apply navbar fixed top-0 shadow-md;
  z-index: 20;
  transition: all 250ms ease;
}

.navbar-transparent {
  background-color: transparent;
  box-shadow: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.icon {
  transition: scale 250ms ease, transform 250ms ease-out;
}

.theme-toggle svg {
  @apply w-5;
  transition: scale 250ms ease, transform 250ms ease-out !important;
}


button.settings:hover .icon {
  scale: 1.1;
  transform: rotate(90deg);
}

.theme-toggle:hover svg, button:hover .icon {
  scale: 1.2;
  color: var(--hover) !important;
}

.theme-toggle svg {
  transition: color 250ms ease;
}
</style>
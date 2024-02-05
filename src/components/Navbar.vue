<script setup>
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";
import { themeChange } from 'theme-change'
import { navigations, home } from "../navigations";
themeChange()
</script>

<script>
export default {
    data() {
        return {
            isLightTheme: false,
            siteIcon: "/site_logo_round.png"
        };
    },
    methods: {
        UpdateThemeStatus() {
            this.isLightTheme = !this.isLightTheme;
        },
    },
    mounted() {
        this.isLightTheme = localStorage.getItem('theme');
        if (this.isLightTheme == null) {
            this.isLightTheme = false;
            localStorage.setItem('theme', 'dark');
            console.log("set default dark theme");
        } else {
            console.log("local storage theme = " + this.isLightTheme);
            this.isLightTheme = this.isLightTheme == "light";
        }
    },
};
</script>

<template>
    <div class="navbar fixed top-0 bg-base-100/70">

        <div class="navbar-start">

            <!-- 手机版下拉式导航列表 -->
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle sm:hidden">
                    <img :src="siteIcon" class="rounded-full border-2 w-10 h-10" />
                </div>

                <ul tabindex="0" class="dropdown-content mt-3 z-[999] p-2 shadow bg-base-200 rounded-box w-32">

                    <!-- 渲染手机导航列表 -->
                    <li>
                        <button class="w-full" @click="$router.push(home.pageName)">
                            <component :is="home.icon" class="h-5 w-5" /> {{ home.displayName }}
                        </button>
                    </li>

                    <li v-for="(navItem, index) in navigations" :key="index">
                        <button class="w-full" @click="$router.push(navItem.pageName)">
                            <component :is="navItem.icon" class="h-5 w-5" /> {{ navItem.displayName }}
                        </button>
                    </li>
                    
                </ul>

            </div>

            <div class="tooltip tooltip-bottom" data-tip="首页">
                <a class="hidden sm:inline-flex btn btn-ghost btn-circle" @click="$router.push('home')">
                    <img :src="siteIcon" class="rounded-full border-2 w-10 h-10" />
                </a>
            </div>

            <!-- 渲染电脑版导航列表 -->
            <div class="ml-4 hidden sm:flex gap-2" v-for="(navItem, index) in navigations" :key="index">
                <div class="tooltip tooltip-bottom" :data-tip="navItem.displayName">
                    <button class="btn btn-sm btn-ghost" @click="$router.push(navItem.pageName)">
                        <component :is="navItem.icon" class="h-5 w-5" />
                    </button>
                </div>
            </div>

        </div>

        <div class="navbar-end">

            <!-- 主题切换 -->
            <div class="tooltip tooltip-left" data-tip="亮/暗主题">
                
                <button data-toggle-theme="dark,light" data-act-class="icon-set-light" @click="UpdateThemeStatus" class="theme-toggle btn-circle btn-ghost">
                    <SunIcon v-if="isLightTheme" class="sun h-6 w-6 text-gray-500"/>
                    <MoonIcon v-else class="moon h-6 w-6 text-gray-500" />
                </button>

            </div>
            
        </div>

    </div>
</template>
<style scoped>
.navbar {
    backdrop-filter: blur(3px);
    z-index:20;
}
.dropdown-content {
    /* backdrop-filter: blur(12px) !important; */
}
.theme-toggle:hover svg, button:hover {
    color: var(--hover);
}

.theme-toggle svg {
    transition: color 250ms ease;
}
</style>
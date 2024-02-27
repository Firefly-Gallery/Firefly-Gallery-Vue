import Home from '@/pages/home.vue';
import AboutFirefly from '@/pages/about-firefly.vue';
import Gallery from '@/pages/gallery.vue';
import Links from '@/pages/links.vue';
import About from '@/pages/about.vue';
import { PhotoIcon, LinkIcon, InformationCircleIcon, HomeIcon } from "@heroicons/vue/24/outline";
import { type RouteRecordName } from 'vue-router';

const home = {
    displayName: "首页",
    icon: HomeIcon,
    pageName: "home",
    path: "/home",
    component: Home
}

const navigations = 
[
    {
        displayName: "图库",
        icon: PhotoIcon,
        pageName: "gallery",
        path: "/gallery",
        component: Gallery
    },
    {
        displayName: "角色介绍",
        icon: undefined,
        pageName: "About Firefly",
        path: "/about-firefly",
        component: AboutFirefly,
        hidden: true,
        noHeader: true
    },
    {
        displayName: "链接",
        icon: LinkIcon,
        pageName: "links",
        path: "/links",
        component: Links
    },
    {
        displayName: "关于",
        icon: InformationCircleIcon,
        pageName: "about",
        path: "/about",
        component: About
    },
]

const GetPage = (page_name: RouteRecordName | null | undefined) => {
    let page = navigations.find(item => item["pageName"] === page_name)
    if(page) {
        return page;
    } else {return {}}
};

export {navigations, home, GetPage}
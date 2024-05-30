const Home = () => import('@/pages/home.vue');
const NotFound = () => import('@/pages/not_found.vue');
const FireflyProfile = () => import('@/pages/firefly_profile.vue');
const About = () => import('@/pages/about.vue');
import {
    PhotoIcon,
    InformationCircleIcon,
    HomeIcon,
    UserCircleIcon,
} from "@heroicons/vue/24/outline";
import { type RouteRecordName } from 'vue-router';

interface RouteRecord {
    displayName: string;
    icon?: any;
    pageName: string;
    path: string;
    component: any;
    hidden?: boolean;
    noHeader?: boolean;
}

const navigations: RouteRecord[] =
[
    {
        displayName: "首页",
        icon: HomeIcon,
        pageName: "Error",
        path: "/home",
        component: Home,
        hidden: true,
        noHeader: true
    },
    {
        displayName: "介绍",
        icon: UserCircleIcon,
        pageName: "profile",
        path: "/profile",
        component: FireflyProfile,
        noHeader: true
    },
    {
        displayName: "关于",
        icon: InformationCircleIcon,
        pageName: "about",
        path: "/about",
        component: About
    },
    {
        displayName: "找不到页面",
        pageName: "Page Not Found",
        path: "/:catchAll(.*)",
        component: NotFound,
        hidden: true,
        noHeader: true,
    }
]

// 第一项是主页
const home: RouteRecord = navigations[0]
// 最后一项是错误页
const ErrorPage: RouteRecord = navigations[navigations.length - 1]

const GetPage = (page_name: RouteRecordName | null | undefined): RouteRecord | undefined => {
    const page = navigations.find(item => item["pageName"] === page_name)
    if(page) {
        return page;
    } else {return undefined}
};

export {navigations, home, ErrorPage, GetPage}
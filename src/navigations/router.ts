import { createRouter, createWebHashHistory, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { navigations, home } from '.';

// 主页路由配置
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: home.path,
    }
]

// 页面路由配置
navigations.forEach(navItem => {
    routes.push({
        path: navItem.path,
        name: navItem.pageName,
        component: navItem.component,
        meta: {
            title: navItem.displayName + " | 流萤图站",
        }
    })
});

// 实例化路由
const router = createRouter({
    routes: routes,
    history: createWebHistory(),    // 拒绝 “#/”，从我做起
});

export default router;
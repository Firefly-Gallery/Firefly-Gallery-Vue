import { createRouter, createWebHistory } from 'vue-router'
import { navigations, home } from '.';

// 主页路由配置
const routes = [
    {
        path: '/',
        redirect: home.path,
    },
    {
        path: home.path,
        name: home.pageName,
        component: home.component,
    },
]

// 页面路由配置
navigations.forEach(navItem => {
    routes.push({
        path: navItem.path,
        name: navItem.pageName,
        component: navItem.component,
    })
});

// 实例化路由
const router = createRouter({
    routes: routes,
    history: createWebHistory(),    // 拒绝 “#/”，从我做起
    mode: 'history',
});

export default router;
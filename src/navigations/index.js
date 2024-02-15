import Home from '../pages/home.vue';
import Gallery from '../pages/gallery.vue';
import Links from '../pages/links.vue';
import About from '../pages/about.vue';
import { PhotoIcon, LinkIcon, InformationCircleIcon, HomeIcon } from "@heroicons/vue/24/outline";

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

const GetDisplayName = (page_name) => {
    let page = navigations.find(item => item["pageName"] === page_name)
    if(page) {
        return page["displayName"];
    } else {return ""}
};

export {navigations, home, GetDisplayName}
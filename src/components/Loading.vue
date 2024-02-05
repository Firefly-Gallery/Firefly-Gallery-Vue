
<template>
    <div id="loading">
        <div class="shutter" v-for="index in this.shutterCount" :key="index">
            <div class="shutter-inner" :style="offsetTransition(index)"></div>
        </div>
    </div>
    <!-- <div id="loading-icon">
        <KKLoad></KKLoad>
    </div> -->
</template>

<script>
import KKLoad from './KKLoad.vue';
export default {
    name: "Loading",
    data() {
        return {
            // in ms
            transitionTime: 400,
            transitionOffset: 60,
            // number of shutters
            shutterCount: 8,
        };
    },
    methods: {
        // 加入
        in(next) {
            // 最后一片淡入时长
            let delay = this.shutterCount * this.transitionOffset + this.transitionTime;
            let conainer = document.getElementById("loading");
            conainer.classList.remove("loading_out");
            // 更新加载状态
            setTimeout(() => {
                next();
                this.$emit('check-loading');
            }, delay);
        },
        // 退出
        out() {
            let conainer = document.getElementById("loading");
            conainer.classList.add("loading_out");
        },
        // 设置过渡时间、偏移
        offsetTransition(index) {
            let offsetTime = (index * this.transitionOffset);
            return {
                transition: `${this.transitionTime}ms cubic-bezier(0, 0, 0.3, 1) ${offsetTime}ms`,
            };
        },
    },
};
</script>


<style>
#loading {
    position: fixed;
    top: -10rem;
    left: -10rem;
    min-width: 1920px;
    width: calc(100vw + 20rem);;
    height: calc(100vh + 20rem);
    z-index: 114514;
    display: flex;
    flex-direction: row;
}
.loading_out {
    transition: 0s ease 880ms;
    transform: translateY(100%);
}
.shutter {
    flex-grow: 1;
    transform: rotate(-15deg);
    display: flex;
    align-items: center;
    justify-content: center;
}
.shutter-inner {
    background-color: #141414;
    width: 100%;
    height: 100%;
}
.loading_out .shutter-inner {
    width: 0%;
}
#loading-icon {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 114515;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
#loading-icon svg {
    width: 6rem;
    filter: drop-shadow(0px 0px 5px white);
}
</style>

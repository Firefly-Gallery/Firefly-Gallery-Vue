<template>
    <svg width="1471" height="1716" viewBox="0 0 1471 1716" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path id="kk-k" d="M403.014 1268.9L491.987 627.094C491.994 627.041 492.042 627.004 492.095 627.008L573.895 633.991C573.952 633.996 573.993 634.048 573.986 634.104L533.539 927.216C533.526 927.31 533.639 927.368 533.707 927.302L817.967 656.031C817.988 656.011 818.016 656.001 818.045 656.004L922.779 664.981C922.865 664.988 922.902 665.094 922.84 665.153L626.063 948.44C626.027 948.474 626.022 948.53 626.051 948.571L897.368 1327.32C897.419 1327.39 897.362 1327.48 897.276 1327.47L781.044 1314.01C781.016 1314 780.991 1313.99 780.974 1313.96L529.646 959.705C529.593 959.632 529.478 959.66 529.465 959.749L485.013 1277.9C485.006 1277.96 484.957 1278 484.903 1277.99L403.102 1269.01C403.046 1269.01 403.006 1268.95 403.014 1268.9Z" stroke="white" stroke-width="25"/>
    <g filter="url(#filter0_d_1_9)">
    <path id="kk-box" d="M1132 1690L1449 1509L1309.5 397L1314 82L197 18L200 318M1132 1690L22 1540L200 318M1132 1690L1309 397L200 318" stroke="white" stroke-width="35" stroke-linejoin="round"/>
    </g>
    </svg>
</template>
<style scoped>

svg path#kk-box {
    stroke-dasharray: 3220px;
    animation: kBoxAnim 1.5s linear infinite;
}
svg path#kk-k {
    stroke-dasharray: 3360px;
    animation: kKAnim 1.5s linear infinite;
}
@keyframes kBoxAnim {
    from {
        stroke-dashoffset: 3220;
    }
    50% {
        stroke-dashoffset: 0px;
    }
    to {
        stroke-dashoffset: -3220;
    }
}
@keyframes kKAnim {
    from {
        stroke-dashoffset: 3360px;
    }
    50% {
        stroke-dashoffset: 0px;
    }
    to {
        stroke-dashoffset: -3360px;
    }
}
</style>
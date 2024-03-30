<template>
  <Popup :index="props.index">
    <Window
      title="数据管理"
      @close="close"
    >
      <div class="data">
        <div class="info">
          <div>图片缓存: {{ cacheSize }}</div>
        </div>
        <div class="box">
          <Btn
            class="btn_"
            name="导出当前短信"
            :disable="false"
            @click=""
          />
          <Btn
            class="btn_"
            name="导出全部短信"
            :disable="false"
            @click=""
          />
          <Btn
            class="btn_"
            name="导入短信数据"
            @click=""
          />
          <Btn
            class="btn_"
            name="删除所有短信"
            :disable="false"
            @click=""
          />
          <div class="line"></div>
          <Btn
            class="btn_"
            name="导出自定义角色"
            :disable="false"
            @click=""
          />
          <Btn
            class="btn_"
            name="导入自定义角色"
            @click=""
          />
          <Btn
            class="btn_"
            name="删除自定义角色"
            :disable="false"
            @click=""
          />
          <div class="line"></div>
          <Btn
            class="btn_"
            name="重置数据库"
            @click=""
          />
        </div>
      </div>
    </Window>
  </Popup>
</template>

<script lang="ts" setup>
import Popup from '@/components/UI/Popup.vue'
import Window from '@/components/UI/Window.vue'
import Btn from '@/components/UI/Btn.vue'
import { computed, onMounted, ref, toRaw, watch } from 'vue'
// import { currentMessage, message } from '@/store/message'
import { setting } from '@/store/setting'
// import { character } from '@/store/character'
import { zhLocale, setLocale, Parameter } from '@ckpack/parameter'
// import { avatar } from '@/store/avatar'
import { openWindow } from '@/components/Popup'
import { compressToUint8Array, decompressFromUint8Array } from 'lz-string'

const props = defineProps<{
  name: string
  index: number
}>()

const emits = defineEmits<{
  (event: 'close', name: string): void
}>()

function getLocalStorageSize() {
    var total = 0;
    for(var key in localStorage) {
        if(localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length;
        }
    }
    // Convert bytes to megabytes
    return total / (1024 * 1024);
}

const cacheSize = ref<number>(0);

const CalculateCacheSize = () => {
  if ('caches' in window) {
  
    // Open the default cache
    caches.open('images').then(cache => {
      console.log(cache)
      let totalSize = 0;

      // Iterate through cache entries
      cache.keys().then(keys => {
        const promises = keys.map(request => {
          return cache.match(request).then(response => {
            if (response) {
              // Check if the response is an image
              const contentType = response.headers.get('Content-Type');
              if (contentType && contentType.startsWith('image')) {
                // Calculate the size of the image
                const size = response.headers.get('Content-Length');
                if (size) {
                  totalSize += parseInt(size, 10);
                }
              }
            }
          });
        });

        // Wait for all promises to resolve
        Promise.all(promises).then(() => {
          // Set the total cache size
          cacheSize.value = totalSize;
        });
      });
    });
  }

}

const close = () => {
  emits('close', props.name)
}
onMounted(() => {
  CalculateCacheSize()
  console.log("LocalStorage size (MB):", getLocalStorageSize());
})
</script>

<style lang="stylus" scoped>
.data
  width 500px
  margin 20px 0

  .info
    font-size 18px
    padding 15px 25px
    margin-bottom 20px
    border 1px solid rgba(0, 0, 0, 0.2)
    border-radius 5px

  .box
    width 100%

    .btn_
      margin 5px 0 0 0
      height 50px
      font-size 21px

      &:before
        width 98.8% !important

    :deep(.disable)
      border none !important

      &:before
        display block !important

  &:before
    display none

    .line
      width 100%
      margin 10px 0
      border-bottom2.5px solid rgba(150, 150, 150, 0.5)

  .tip
    font-size 14px
    font-weight bold
    text-align center
    user-select none
</style>

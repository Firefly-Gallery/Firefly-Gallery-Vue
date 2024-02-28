<template>
  <div class="aplayer"></div>
</template>

<script setup>
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import music_instrumental from '@/assets/sounds/bgm_instrumental.mp3'
import music from '@/assets/sounds/bgm.mp3'
import music_lrc from '@/assets/sounds/lyric.lrc'
import { onMounted } from 'vue';

const cover_url= "https://p2.music.126.net/Pfi059ikYaEkE4c-fe30Xg==/109951169319067153.jpg?param=200y200"

const aplayer_options = {
  fixed: true,
  autoplay: true,
  loop: 'one',
  lrcType: 3,
  audio: [
    {
      name: '使一颗心免于哀伤-完整',
      artist: 'HoYo-Mix(知更鸟)',
      url: music,
      cover: cover_url,
      lrc: music_lrc,
    },
    {
      name: '使一颗心免于哀伤-无人声',
      artist: 'HoYo-Mix(知更鸟)',
      url: music_instrumental,
      cover: cover_url,
    },
  ]
}

onMounted(() => {
  const ap = new APlayer(aplayer_options);
});
</script>

<style lang="stylus">
.aplayer
  opacity 0.5
  transition opacity 250ms ease
  &:hover
    opacity 1
  .aplayer-lrc-contents
    text-align right
    p
      opacity 0.5
      font-weight 499
      color: #fff !important
      text-shadow none !important
      margin-right 10px !important
</style>
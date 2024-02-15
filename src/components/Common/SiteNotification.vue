<template>
<dialog id="site_notification" class="modal">
  <div class="modal-box">
    <h2 class="font-bold text-xl mb-8">公告</h2>
    <p class="mb-8 font-medium" v-for="(announce, index) in announce_cn" :key="index">{{ announce }}</p>
    <div class="divider text-lg font-bold">时间线</div>
    <ul class="timeline timeline-vertical">
    <li v-for="(timestrap, index) in times" :key="index">
        <div class="timeline-start col-span-1 text-sm">{{ timestrap }}</div>
        <hr v-if="index > 0"/>
            <div class="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
            </div>
            <div class="timeline-end timeline-box text-sm">{{ log_cn[index] }}</div>
        <hr v-if="index < times.length - 1"/>
    </li>
  </ul>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">关闭</button>
      </form>
    </div>
  </div>
</dialog>
</template>

<script setup>
import { times, log_cn, announce_cn } from '@/store/log';
const Init = () => {
  
  let notified = localStorage.getItem('notify');
  if (notified === null || notified != times[0]) {
    site_notification.showModal();
    localStorage.setItem('notify', times[0]);
  }
}
defineExpose({Init})
</script>

<style scoped>
.timeline-vertical li {
    grid-template-columns: 6rem auto var(--timeline-col-end, minmax(0, 1fr));
}
</style>

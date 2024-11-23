<script setup lang="ts">

defineProps({
  id: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    required: true
  },
})

</script>

<template>
  <input type="checkbox" :id="id" class="modal-toggle" :checked="enabled" />
  <dialog class="modal" :id="id">
    <div class="dialog-box">
      <div class="dialog-title-container">
        <slot name="title" />
      </div>
      <slot name="body" />
      <div class="dialog-actions-container">
        <slot name="actions" />
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <slot name="backdrop" />
    </form>
  </dialog>

</template>

<style scoped lang="postcss">
.dialog-title-container {
  @apply flex gap-3;
}
.dialog-actions-container {
  @apply w-full flex flex-col mt-2;
}
.template-actions-container button {
  @apply btn-ghost grow overflow-hidden no-animation;
}
.modal p {
  @apply lg:text-lg py-2 lg:py-4;
}
.dialog-box {
  @apply modal-box bg-base-200/95 backdrop-blur-lg text-left overflow-hidden p-4 sm:p-6 w-full sm:w-[];
}
</style>
<style lang="postcss">
.dialog-bg {
  @apply absolute top-0 right-[-24px] w-auto h-full p-1 pt-8 pr-0 opacity-25 z-[-1];
}
</style>
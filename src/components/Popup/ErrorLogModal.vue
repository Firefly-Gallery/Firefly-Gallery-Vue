<template>
  <BaseModal :enabled="showErrorLogs" id="errorModal">
    <template #title>
      <span class="w-full text-3xl font-bold text-warning text-center">光&nbsp;&nbsp;&nbsp;荣&nbsp;&nbsp;&nbsp;榜</span>
    </template>
    <template #body>
      <div class="my-4 h-80 overflow-x-hidden overflow-y-auto">
        <div class="relative bg-error/20 text-white font-mono rounded-lg p-4 mb-2" v-for="err in error">
          <div class="flex gap-2 items-center">
            <XCircleIcon class="h-5 w-5 text-error" />
            <p class="max-w-[90%]">{{ err.message }}</p>
          </div>
          <div class="collapse mt-2 rounded-lg" v-if="err.stack_html !== null">
            <input type="checkbox" class="peer min-h-0" />
            <div class="collapse-title">
              Stack Trace (expand)
            </div>
            <div class="collapse-content">
              <div v-html="err.stack_html" />
              <p class="text-xs text-gray-400 mt-2">Time: {{err.time.replace("T", "&nbsp;").replace("Z", "")}}</p>
            </div>
          </div>
          <div class="tooltip tooltip-left absolute top-4 right-3" data-tip="Copy">
            <div class="copy cursor-pointer text-gray-400 hover:text-white active:scale-90" @click="copyError(err)">
              <ClipboardIcon class="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #actions>
      <button class="btn btn-warning" v-ripple @click="showErrorLogs=false">Close</button>
    </template>
  </BaseModal>
</template>
<style scoped lang="postcss">
.collapse-title {
  @apply bg-white/10 p-3 py-2 text-xs min-h-0 peer-checked:border-b-2 peer-checked:pb-2;
}
.collapse-content {
  @apply peer-checked:p-3 peer-checked:pt-2 peer-checked:bg-white/10 text-xs;
}
</style>
<script setup lang="ts">
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import {onMounted, ref} from "vue";
import { XCircleIcon } from "@heroicons/vue/20/solid";
import { ClipboardIcon } from "@heroicons/vue/24/outline";
import BaseModal from "@/components/Popup/BaseModal.vue";

const copyError = (err:ErrorInfo) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(err.message + "\nStack:\n" + err.stack).catch(err => {
      toast.error(`Failed to copy text: ${err}`);
    });
    toast.success("Error details copied to clipboard!", {position: 'top'});
  }
}

interface ErrorInfo {
  time: string;
  message: string;
  stack: string|null;
  stack_html: string|null;
}

const error = ref<ErrorInfo[]>([]);

const toast = useToast();
const showErrorLogs = ref(false)

const showError = (text:string) => {
  toast.error(text, {
    position: 'top',
    dismissible: true,
    onClick: function() {
      showErrorLogs.value = true;
    },
  });
}

function registerGlobalErrorHandler() {
  window.addEventListener('error', (event) => {
    showError(`${event.error || event.message}`);
    error.value.push({
      time: new Date().toISOString(),
      message: event.error || event.message || 'Unknown error',
      stack: event.error.stack || null,
      stack_html: formatStackTrace(event.error.stack || null),
    })
  });
  window.addEventListener('unhandledrejection', (event) => {
    showError(`Unhandled Promise rejection: ${event.reason}`);
    add_error(event.reason, "Unhandled Promise rejection: ")
  });

  console.log("registerGlobalErrorHandler");
}

function registerConsoleErrorHandler() {
  const originalConsoleError = console.error;

  console.error = function (...args: any[]) {
    originalConsoleError.apply(console, args);
    const err = new Error(args.join(' '));
    const errorMessage = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ');
    showError(`Error: ${errorMessage}`);
    add_error(err)
  };
}

function add_error(err: any, prefix="") {
  error.value.push({
    time: new Date().toISOString(),
    message: `${prefix}${err.message || err || 'Unhandled Error'}`,
    stack: err.stack || null,
    stack_html: formatStackTrace(err.stack || null)
  })
}

function formatStackTrace(stack: string): string {
  const urlRegex = /(https?:\/\/[^\s()]+(?:\([^\s()]*\)[^\s]*)?)/g;
  let formattedStack = stack;
  try {
    formattedStack = stack
        .split('\n')
        .map(line => {
          // Replace any URL with a clickable link
          return line.replace(urlRegex, (url) => {
            return `<a class="text-primary underline" href="${url}" target="_blank" rel="noopener noreferrer">
                    ${url.split('/').pop()?.split('?')[0] || url}
                  </a>`;
          });
        })
        .join('<br>'); // Join lines with <br>

  } catch {}

  return formattedStack;
}

onMounted(() => {
  registerGlobalErrorHandler();
  registerConsoleErrorHandler();
})
</script>

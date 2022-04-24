<script>
import { statusStore } from '@/stores/statusStore';
export default {
  setup() {
    const statusData = statusStore();
    return {
      statusData,
    };
  },
};
</script>

<template>
  <div
    :class="[
      'fixed right-3 top-24 max-w-sm py-4 px-8 flex items-center justify-center bg-black rounded-md overflow-hidden z-popModal shadow-md',
      statusData.popReminderModel ? 'scale-100' : 'scale-0',
      'transition-all duration-300',
    ]"
  >
    <p class="font-bold text-white text-right">
      {{ statusData.popReminderText }}
    </p>
  </div>
</template>

<style lang="scss"></style>

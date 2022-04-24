<script>
import { onMounted } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import emitter from '@/methods/emitter';
import { statusStore } from '@/stores/statusStore';
import { storeToRefs } from 'pinia';

export default {
  components: {
    Loading,
  },
  setup() {
    const statusData = statusStore();
    const { isLoading } = storeToRefs(statusData);
    function openLoadingSetTime() {
      statusData.isLoading = true;
      setTimeout(() => {
        isLoading.value = false;
      }, 2000);
    }
    function openLoading() {
      isLoading.value = true;
    }
    function closeLoading() {
      isLoading.value = false;
    }
    onMounted(() => {
      emitter.on('open-loading-time', openLoadingSetTime);
      emitter.on('open-loading', openLoading);
      emitter.on('close-loading', closeLoading);
    });
    return { isLoading };
  },
};
</script>

<template>
  <loading :active="isLoading" />
</template>

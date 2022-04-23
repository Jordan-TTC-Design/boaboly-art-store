<script>
import { ref, onMounted } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import emitter from '@/methods/emitter';

export default {
  components: {
    Loading,
  },
  setup() {
    const isLoading = ref(false);
    function openLoadingSetTime() {
      isLoading.value = true;
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

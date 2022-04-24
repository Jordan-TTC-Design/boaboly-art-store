<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { statusStore } from '@/stores/statusStore';
import { storeToRefs } from 'pinia';

export default {
  components: {
    Loading,
  },
  setup() {
    const statusData = statusStore();
    const { isLoading } = storeToRefs(statusData);
    return { isLoading };
  },
};
</script>

<template>
  <loading :active="isLoading" />
</template>

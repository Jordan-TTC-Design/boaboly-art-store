<script>
import { RouterView } from 'vue-router';
import { apiMethod } from '@/methods/api.js';
import AdminMainNav from '@/components/admin/AdminMainNav.vue';
export default {
  components: {
    AdminMainNav,
  },
  setup() {
    apiMethod.checkLogin()
    return {
      RouterView,
    };
  },
};
</script>

<template>
  <div class="flex h-screen relative">
    <div class="sticky top-0 left-0 h-screen">
      <AdminMainNav />
    </div>
    <div class="flex-1 max-h-screen overflow-y-scroll">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss"></style>

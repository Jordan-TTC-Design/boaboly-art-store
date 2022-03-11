<script>
import { RouterView } from 'vue-router';
import Cart from '@/components/front/Cart.vue';
import HamMenu from '@/components/helpers/HamMenu.vue';
import Loading from '@/components/helpers/Loading.vue';
export default {
  components: {
    Cart,
    HamMenu,
    Loading,
  },
  setup() {
    return {
      RouterView,
    };
  },
};
</script>

<template>
  <header
    class="flex justify-between items-center border-b border-gray-300 bg-white sticky top-0 z-40"
  >
    <router-link to="/" class="text-2xl font-bold ml-6">Boaboly</router-link>
    <router-link to="/" class="storeLogo">
      <img src="@/assets/images/boabolyLogo.svg" alt="Logo" />
    </router-link>
    <ul class="bg-black py-4 px-6 flex">
      <li class="mr-4">
        <Cart />
      </li>
      <li>
        <HamMenu />
      </li>
    </ul>
  </header>
  <div class="mx-auto">
    <RouterView />
  </div>
  <Loading />
</template>

<style lang="scss"></style>

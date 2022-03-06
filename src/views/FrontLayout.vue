<script>
import { RouterView } from 'vue-router';
import Cart from '@/components/front/Cart.vue';
import Loading from '@/components/helpers/Loading.vue';
export default {
  components: {
    Cart,
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
    <h1 class="text-2xl font-bold ml-6">Boaboly</h1>
    <div class="storeLogo">
      <img src="@/assets/images/boabolyLogo.svg" alt="Logo" />
    </div>
    <ul class="bg-black py-4 px-6 flex">
      <li class="mr-4">
        <Cart />
      </li>
      <li>
        <button
          type="button"
          class="rounded py-2 px-3 hover:border-gray-300 hover:bg-white/50"
        >
          <i class="bi bi-list text-xl text-white"></i>
        </button>
      </li>
    </ul>
  </header>
  <div class="mx-auto">
    <RouterView />
  </div>
  <Loading />
</template>

<style lang="scss"></style>

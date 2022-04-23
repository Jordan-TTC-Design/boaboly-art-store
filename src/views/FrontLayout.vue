<script>
import { ref, watch } from 'vue';
import { RouterView } from 'vue-router';
import Cart from '@/components/front/Cart.vue';
import Collection from '@/components/front/Collection.vue';
import FrontFooter from '@/components/front/FrontFooter.vue';
import HamMenu from '@/components/helpers/HamMenu.vue';
import Loading from '@/components/helpers/Loading.vue';
import PopReminder from '@/components/helpers/PopReminder.vue';
export default {
  components: {
    Collection,
    Cart,
    HamMenu,
    Loading,
    PopReminder,
    FrontFooter,
  },
  setup() {
    let modalOpen = ref(false);
    function fixWindow(status) {
      modalOpen.value = status;
    }
    watch(modalOpen, (newValue) => {
      if (newValue === true) {
        document.getElementsByTagName('body')[0].className = 'no-scroll';
      } else {
        document.body.removeAttribute('class');
      }
    });
    return {
      modalOpen,
      fixWindow,
      RouterView,
    };
  },
};
</script>

<template>
  <div class="wrapper__content">
    <div class="flex flex-col min-h-screen justify-between">
      <header
        class="flex justify-between items-center bg-white sticky top-0 z-40 opacity-95"
      >
        <router-link to="/" class="text-2xl font-bold ml-6"
          >Boaboly</router-link
        >
        <ul class="bg-black sm:py-4 sm:px-6 px-2 py-3 flex gap-x-4">
          <li>
            <Collection @fix-window="fixWindow" />
          </li>
          <li>
            <Cart @fix-window="fixWindow" />
          </li>
          <li>
            <HamMenu @fix-window="fixWindow" />
          </li>
        </ul>
      </header>
      <div class="w-full mx-auto">
        <RouterView />
      </div>
    </div>
    <Loading />
    <PopReminder />
    <FrontFooter />
  </div>
</template>

<style lang="scss" scoped></style>

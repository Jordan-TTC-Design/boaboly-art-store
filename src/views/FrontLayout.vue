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
        document.getElementsByTagName('body')[0].className =
          'overflow-y-hidden';
      } else {
        document.body.removeAttribute('class');
      }
    });
    function scrollToTop() {
      window.scrollTo({
        top: 100,
        left: 100,
        behavior: 'smooth',
      });
    }
    return {
      modalOpen,
      scrollToTop,
      fixWindow,
      RouterView,
    };
  },
};
</script>

<template>
  <div class="flex flex-col min-h-screen justify-between">
    <header
      class="flex justify-between items-center bg-white sticky top-0 z-40 opacity-95"
    >
      <router-link to="/" class="text-2xl font-bold ml-6">Boaboly</router-link>
      <ul class="bg-black py-4 px-6 flex gap-x-4">
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
    <button @click="scrollToTop" class="pageUpBtn z-30">BACK TO TOP</button>
    <div class="w-full mx-auto">
      <RouterView />
    </div>
  </div>
  <Loading />
  <PopReminder />
  <FrontFooter />
</template>

<style lang="scss" scoped>
.pageUpBtn {
  position: fixed;
  top: 50%;
  right: -1rem;
  transform: translateY(0) rotate(90deg);
  padding: 0.5rem 2rem;
  color: black;
  font-weight: 600;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-1.5rem) rotate(90deg);
  }
}
</style>

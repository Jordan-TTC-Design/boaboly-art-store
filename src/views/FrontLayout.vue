<script>
import { ref } from 'vue';
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
    let modalOpen = ref(false);
    function fixWindow(status) {
      console.log(status);
      modalOpen.value = status;
    }
    return {
      modalOpen,
      fixWindow,
      RouterView,
    };
  },
};
</script>

<template>
  <div
    class="flex flex-col min-h-screen justify-between"
    :class="{ 'no-scroll': modalOpen }"
  >
    <header
      class="flex justify-between items-center border-b border-gray-300 bg-white sticky top-0 z-40"
    >
      <router-link to="/" class="text-2xl font-bold ml-6">Boaboly</router-link>
      <router-link to="/" class="storeLogo">
        <img src="@/assets/images/boabolyLogo.svg" alt="Logo" />
      </router-link>
      <ul class="bg-black py-4 px-6 flex">
        <li class="mr-4">
          <Cart @fix-window="fixWindow" />
        </li>
        <li>
          <HamMenu />
        </li>
      </ul>
    </header>
    <div class="w-full mx-auto">
      <RouterView />
    </div>
    <footer
      class="bg-primaryLight py-12 px-6 flex justify-between items-center"
    >
      <div class="flex items-center flex-1">
        <router-link to="/" class="text-2xl font-bold text-black mr-12"
          >Boaboly</router-link
        >
        <ul class="footerNav">
          <li>
            <router-link :to="{ name: 'ArtList' }" class="footerNav__item">
              WORKS
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'ProductList' }" class="footerNav__item">
              PRODUCTS
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'About' }" class="footerNav__item">
              ABOUT
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Contact' }" class="footerNav__item">
              CONTACT
            </router-link>
          </li>
        </ul>
      </div>
      <div class="flex justify-end items-center flex-1">
        <ul class="flex mr-6">
          <li>
            <a
              class="underline text-black text-sm py-1 px-2"
              href="https://www.facebook.com/search/top?q=%E5%AF%B6%E5%85%92%E5%AF%B6%E8%8E%89%E7%9A%84%E7%BE%8E%E5%AD%B8%E5%95%86%E5%BA%97&locale=zh_TW"
              >Facebook</a
            >
          </li>
          <li class="text-black mx-2">/</li>
          <li>
            <a
              class="underline text-black text-sm py-1 px-2"
              href="https://www.instagram.com/boaboly.art/?fbclid=IwAR2cqRxPmRKETWQ-TggaUTnKM-AdblX9sITkego1cHuKNg-0TlUJC9oKHNA"
              >Instagram</a
            >
          </li>
        </ul>
        <p class="text-black text-xs">© 2022 Boaboly Art All Rights Reserved</p>
      </div>
    </footer>
  </div>
  <Loading />
</template>

<style lang="scss" scoped>
.footerNav {
  display: flex;
  &__item {
    display: block;
    padding: 0.5rem 0rem;
    color: var(--black);
    position: relative;
    margin-right: 1rem;
    &::after {
      content: '';
      background-color: var(--black);
      bottom: 0;
      left: 0;
      position: absolute;
      height: 0.25rem;
      width: 0%;
      transition: all 0.3s;
    }
  }
  &__item:hover {
    &::after {
      width: 100%;
    }
  }
}
.no-scroll {
  position: fixed;
  width: 100%;
}
</style>

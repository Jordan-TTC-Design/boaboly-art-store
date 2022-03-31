<script>
import { ref, watch } from 'vue';
import { RouterView } from 'vue-router';
import Cart from '@/components/front/Cart.vue';
import HamMenu from '@/components/helpers/HamMenu.vue';
import Loading from '@/components/helpers/Loading.vue';
import PopReminder from '@/components/helpers/PopReminder.vue';
export default {
  components: {
    Cart,
    HamMenu,
    Loading,
    PopReminder,
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
      <ul class="bg-black py-4 px-6 flex">
        <li class="mr-4">
          <Cart @fix-window="fixWindow" />
        </li>
        <li>
          <HamMenu />
        </li>
      </ul>
    </header>
    <button @click="scrollToTop" class="pageUpBtn z-30">BACK TO TOP</button>
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
  <PopReminder />
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

<script>
export default {
  setup() {
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 100,
        behavior: 'smooth',
      });
    }
    return { scrollToTop };
  },
};
</script>
<template>
  <footer
    class="bg-primaryLight py-12 md:pb-12 pb-24 px-6 flex xl:flex-row flex-col justify-between lg:items-center gap-y-8"
  >
    <div
      class="flex items-center flex-col lg:flex-row gap-x-12 gap-y-4 lg:pb-0 pb-8 lg:border-0 border-b border-black"
    >
      <router-link to="/" class="text-2xl font-bold text-black"
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
    <div
      class="flex flex-1 lg:justify-end justify-between items-center md:flex-row flex-col gap-y-4 gap-x-8"
    >
      <ul class="flex">
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
    <button @click="scrollToTop" class="pageUpBtn z-30">BACK TO TOP</button>
  </footer>
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
  right: -3.5rem;
  transform: translateY(0) rotate(90deg);
  padding: 0.5rem 2rem;
  color: black;
  font-weight: 600;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-1.5rem) rotate(90deg);
  }
  @media (max-width: 767.98px) {
    position: absolute;
    transform: translateY(-100%) rotate(0deg);
    top: 100%;
    right: 0;
    width: 100%;
    height: 3rem;
    background-color: black;
    color: white;
    &:hover {
      transform: translateY(-100%) rotate(0deg);
    }
  }
}
</style>

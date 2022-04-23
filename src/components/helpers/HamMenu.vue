<script>
import { ref, watch, computed, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  emits: ['fix-window'],
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();
    const modalOpen = ref(false);
    const searchKeyword = ref('');
    const nowPath = computed(() => route.path);
    watch(nowPath, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        modalOpen.value = false;
      }
    });
    watch(modalOpen, (newValue) => {
      if (newValue === true) {
        emit('fix-window', true);
      } else {
        emit('fix-window', false);
      }
    });
    function searchItem() {
      const keyword = searchKeyword.value.replace(/\s+/g, '');
      if (keyword.length > 0) {
        router.push(`/search?keyword=${keyword}`);
        searchKeyword.value = '';
        modalOpen.value = false;
      } else {
        return;
      }
    }
    onUnmounted(() => {
      modalOpen.value = false;
    });
    return {
      searchKeyword,
      modalOpen,
      searchItem,
    };
  },
};
</script>
<template>
  <button
    type="button"
    class="rounded py-2 px-3 hover:border-gray-300 hover:bg-white/50 relative"
    @click="modalOpen = !modalOpen"
  >
    <i class="bi bi-list text-xl text-white"></i>
  </button>
  <div
    class="siderBox--y--full z-sider bg-black flex flex-col"
    :class="{ active: modalOpen }"
  >
    <header class="flex justify-between items-center flex-shrink-0">
      <RouterLink to="/" class="text-2xl font-bold ml-6 text-white"
        >Boaboly<span class="text-xs block">寶兒寶莉美學商店</span></RouterLink
      >
      <div class="bg-black py-4 px-6 flex">
        <button
          type="button"
          class="rounded py-2 px-3 hover:border-gray-300 hover:bg-white/50 relative"
          @click="modalOpen = !modalOpen"
        >
          <i class="bi bi-list text-xl text-white"></i>
        </button>
      </div>
    </header>
    <ul
      class="container grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 flex-grow gap-4 mx-auto my-12 md:px-0 px-6"
    >
      <li class="flex items-center">
        <RouterLink :to="{ name: 'ArtList' }" class="hamListLink w-full">
          WORKS <span>寶莉圖文作品</span>
        </RouterLink>
      </li>
      <li class="flex items-center">
        <RouterLink :to="{ name: 'ProductList' }" class="hamListLink w-full">
          PRODUCTS <span>寶莉自製商品</span>
        </RouterLink>
      </li>
      <li class="flex items-center">
        <RouterLink :to="{ name: 'About' }" class="hamListLink w-full">
          ABOUT <span>美學商店理念</span>
        </RouterLink>
      </li>
      <li class="flex items-center">
        <RouterLink :to="{ name: 'Contact' }" class="hamListLink w-full">
          CONTACT <span>合作＆聯絡</span>
        </RouterLink>
      </li>
      <li class="md:col-span-3 sm:col-span-2 hamSearchBox sm:w-1/2">
        <label
          class="hamListLink w-full search"
          for="hamSearchBox__inputBox__input"
          >Search <span>全站搜尋</span></label
        >
        <div class="hamSearchBox__inputBox">
          <input
            id="hamSearchBox__inputBox__input"
            type="text"
            class="appearance-none bg-white text-gray-700 py-2 px-2 leading-tight focus:outline-none"
            v-model="searchKeyword"
          />
          <button type="button" class="searchBtn" @click="searchItem">
            搜尋
          </button>
        </div>
      </li>
    </ul>
    <footer class="grid md:grid-cols-3 grid-cols-2 flex-shrink-0">
      <ul class="flex items-center ml-6">
        <li>
          <a
            class="underline text-white text-sm py-1 px-2"
            href="https://www.facebook.com/search/top?q=%E5%AF%B6%E5%85%92%E5%AF%B6%E8%8E%89%E7%9A%84%E7%BE%8E%E5%AD%B8%E5%95%86%E5%BA%97&locale=zh_TW"
            >Facebook</a
          >
        </li>
        <li class="text-white mx-2">/</li>
        <li>
          <a
            class="underline text-white text-sm py-1 px-2"
            href="https://www.instagram.com/boaboly.art/?fbclid=IwAR2cqRxPmRKETWQ-TggaUTnKM-AdblX9sITkego1cHuKNg-0TlUJC9oKHNA"
            >Instagram</a
          >
        </li>
      </ul>
      <div class="justify-center items-center hidden md:flex">
        <p class="text-white text-xs text-center">
          © 2022 Boaboly Art All Rights Reserved
        </p>
      </div>
      <div class="flex justify-end">
        <div class="storeLogo w-24 h-24">
          <img
            class="h-24 max-h-full"
            src="@/assets/images/boabolyLogo.svg"
            alt="Logo"
          />
        </div>
      </div>
    </footer>
  </div>
</template>
<style lang="scss" scoped>
.hamListLink {
  display: flex;
  flex-direction: column;
  color: var(--white);
  font-size: 2rem;
  transition: all 0.3s;
  font-weight: bold;
  letter-spacing: 0.5rem;
  cursor: pointer;
  @media (max-width: 767.98px) {
    font-size: 1.5rem;
  }
  span {
    margin-top: 0.5rem;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 1px;
  }
  &:hover {
    color: var(--primary-light);
  }
}
.hamSearchBox {
  .hamListLink {
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    cursor: initial;
    span {
      margin-top: 1rem;
      margin-left: 0.5rem;
    }
    &:hover {
      color: var(--white);
    }
  }
  .hamSearchBox__inputBox {
    display: flex;
    input {
      flex-grow: 1;
    }
    .searchBtn {
      background: var(--primary-light);
      padding: 0.5rem 1.5rem;
      word-wrap: nowrap;
      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>

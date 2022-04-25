<script>
import Cart from '@/components/front/Cart.vue';
import Collection from '@/components/front/Collection.vue';
import FrontFooter from '@/components/front/FrontFooter.vue';
import HamMenu from '@/components/helpers/HamMenu.vue';
import Loading from '@/components/helpers/Loading.vue';
import PopReminder from '@/components/helpers/PopReminder.vue';
import PopInfoBox from '@/components/helpers/PopInfoBox.vue';
import { statusStore } from '@/stores/statusStore';
import { ref, onMounted } from 'vue';

export default {
  components: {
    Collection,
    Cart,
    HamMenu,
    Loading,
    PopReminder,
    PopInfoBox,
    FrontFooter,
  },
  setup() {
    const mainContainer = ref(null);
    const statusData = statusStore();
    onMounted(() => {
      setTimeout(() => {
        statusData.mainContainer = mainContainer.value;
      }, 100);
    });
    return {
      statusData,
      mainContainer,
    };
  },
};
</script>

<template>
  <div ref="mainContainer" class="wrapper__content">
    <div class="flex flex-col min-h-screen justify-between">
      <header
        class="flex justify-between items-center bg-white/95 sticky top-0 z-40"
      >
        <RouterLink to="/" class="text-2xl font-bold ml-6">Boaboly</RouterLink>
        <ul class="bg-black sm:py-4 sm:px-6 px-2 py-3 flex gap-x-4">
          <li>
            <Collection />
          </li>
          <li>
            <Cart />
          </li>
          <li>
            <HamMenu />
          </li>
        </ul>
      </header>
      <div class="w-full mx-auto">
        <RouterView />
      </div>
    </div>
    <Loading />
    <PopReminder />
    <PopInfoBox />
    <FrontFooter />
  </div>
</template>

<style lang="scss" scoped></style>

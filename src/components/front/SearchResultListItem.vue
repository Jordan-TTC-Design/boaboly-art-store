<script>
import { useRouter } from 'vue-router';
export default {
  props: ['result-item'],
  emits: ['addCollection', 'addCart'],
  setup() {
    const router = useRouter();
    function goToPage(item) {
      if (item.searchCategory === '商品') {
        router.push(`/products/${item.id}`);
      } else {
        router.push(`/arts/${item.id}`);
      }
    }
    return { goToPage };
  },
};
</script>
<template>
  <div
    class="bg-white group p-4 hover:bg-gray-100/50 cursor-pointer"
    @click="goToPage(resultItem)"
  >
    <div class="relative mb-3 block">
      <p
        v-if="resultItem.promoted.star"
        class="absolute top-0 left-0 bg-primaryLight px-3 py-0.5 rounded-tl rounded-br text-black font-medium text-lg z-10"
      >
        Hot
      </p>
      <img
        class="w-full bg-gray-300 rounded"
        :src="resultItem.imageUrl || resultItem.imagesUrl[0]"
        :alt="`${resultItem.title}產品圖片`"
      />
    </div>
    <div class="flex justify-between items-center mb-2">
      <p class="border border-gray-300 px-2 py-0.5 text-sm">
        {{ resultItem.category }}
      </p>
    </div>
    <p class="cursor-pointer text-xl text-black font-medium block">
      {{ resultItem.title }}
    </p>
  </div>
</template>
<style lang="scss"></style>

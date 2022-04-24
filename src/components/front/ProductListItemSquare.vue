<script>
import { computed } from 'vue';
import emitter from '@/methods/emitter';
import { productStore } from '@/stores/productStore';
import { cartStore } from '@/stores/cartStore';
export default {
  props: ['product', 'collection-list'],
  setup(props) {
    const productsData = productStore();
    const cartData = cartStore();
    let collection = computed(() => productsData.collections);
    let isCollection = computed(() =>
      collection.value.indexOf(props.product.id)
    );
    return { isCollection, emitter, productsData, cartData };
  },
};
</script>

<template>
  <div class="bg-white group p-4 hover:bg-gray-100/50 flex flex-col">
    <div class="flex-grow">
      <RouterLink class="relative mb-3 block" :to="`/products/${product.id}`">
        <p
          v-if="product.promoted.star"
          class="absolute top-0 left-0 bg-primaryLight px-3 py-0.5 rounded-tl rounded-br text-black font-medium text-lg z-10"
        >
          Hot
        </p>
        <img
          class="w-full bg-gray-300 rounded"
          :src="product.imageUrl"
          :alt="`${product.title}產品圖片`"
        />
      </RouterLink>
      <div class="flex justify-between items-center mb-2">
        <p class="border border-gray-300 px-2 py-0.5 text-sm">
          {{ product.category }}
        </p>
      </div>
      <RouterLink
        :to="`/products/${product.id}`"
        class="cursor-pointer text-xl text-black font-medium block mb-2"
      >
        {{ product.title }}
      </RouterLink>
    </div>
    <div class="flex justify-between items-center">
      <p class="text-sm">NT$ {{ product.price }}</p>
      <div class="flex gap-x-2">
        <button
          type="button"
          class="rounded py-2 px-3 bg-white border-gray-300"
          data-id="product.id"
          @click="productsData.addCollection(product)"
        >
          <i
            :class="{
              'bi-heart': isCollection < 0,
              'bi-heart-fill': isCollection >= 0,
            }"
            class="bi text-xl text-black"
          ></i>
        </button>
        <button
          type="button"
          class="rounded py-2 px-3 bg-white border-gray-300"
          data-id="product.id"
          @click="cartData.addCart(product.id, 1)"
        >
          <i class="bi bi-cart text-xl text-black"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script>
export default {
  props: ['product', 'listIndex'],
  emits: ['addCollection', 'addCart'],
  setup(props, { emit }) {
    return { emit };
  },
};
</script>
<template>
  <div class="bg-white group p-4 hover:bg-gray-100/50">
    <router-link class="relative mb-3 block" :to="`/products/${product.id}`">
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
    </router-link>
    <div class="flex justify-between items-center mb-2">
      <p class="border border-gray-300 px-2 py-0.5 text-sm">
        {{ product.category }}
      </p>
    </div>
    <router-link
      :to="`/products/${product.id}`"
      class="cursor-pointer text-xl text-black font-medium block mb-2"
    >
      {{ product.title }}
    </router-link>
    <div class="flex justify-between items-center">
      <p class="text-sm">NT$ {{ product.price }}</p>
      <div class="flex gap-x-2">
        <button
          type="button"
          class="rounded py-2 px-3 bg-white border-gray-300"
          data-id="product.id"
          @click="$emit('addCollection', product)"
        >
          <i class="bi bi-heart text-xl text-black"></i>
        </button>
        <button
          type="button"
          class="rounded py-2 px-3 bg-white border-gray-300"
          data-id="product.id"
          @click="$emit('addCart', product.id)"
        >
          <i class="bi bi-cart text-xl text-black"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>

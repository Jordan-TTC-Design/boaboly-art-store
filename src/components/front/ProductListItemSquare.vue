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
  <div class="group">
    <div class="relative mb-2">
      <img
        class="w-100 bg-gray-300 rounded"
        :src="product.imageUrl"
        :alt="`${product.title}產品圖片`"
      />
      <div
        class="hidden group-hover:flex group-hover:bg-gray-900/50 space-x-3 flex-1 justify-center items-center absolute top-0 left-0 w-full h-full rounded"
      >
        <button
          type="button"
          class="rounded py-2 px-3 bg-white bg-opacity-30 hover:border-gray-300 hover:bg-opacity-50"
          data-id="product.id"
          @click="$emit('addCollection', product)"
        >
          <i class="bi bi-heart text-xl text-white"></i>
        </button>
        <button
          type="button"
          class="rounded py-2 px-3 bg-white bg-opacity-30 hover:border-gray-300 hover:bg-opacity-50"
          data-id="product.id"
          @click="$emit('addCart', product.id)"
        >
          <i class="bi bi-cart text-xl text-white"></i>
        </button>
      </div>
    </div>
    <router-link
      :to="`/products/${product.id}`"
      class="hover:text-yellow-600 block mb-1 cursor-pointer"
    >
      {{ product.title }}
    </router-link>
    <div class="flex justify-between items-center">
      <p class="productTag text-sm">徽章</p>
      <p class="text-sm">NT$ {{ product.price }}</p>
    </div>
  </div>
</template>
<style lang="scss"></style>

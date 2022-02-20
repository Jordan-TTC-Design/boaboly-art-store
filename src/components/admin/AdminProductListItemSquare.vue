<script>
export default {
  props: ['product', 'listIndex'],
  emits: ['changeProductState', 'openProductDetail', 'deleteProduct'],
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
          class="border border-gray-200 rounded py-2 px-3 hover:border-gray-300 bg-white"
          data-action="remove"
          data-id="product.id"
          @click="$emit('openProductDetail', 'edit', product)"
        >
          <i class="bi bi-pencil-square text-xl"></i>
        </button>
        <button
          type="button"
          class="border border-gray-200 rounded py-2 px-3 hover:border-gray-300 bg-white"
          data-action="remove"
          data-id="product.id"
          @click="$emit('deleteProduct', product.id)"
        >
          <i class="bi bi-trash2-fill text-xl"></i>
        </button>
      </div>
    </div>

    <p class="group-hover:text-yellow-600 mb-1">{{ product.title }}</p>
    <div class="flex justify-between">
      <p class="group-hover:text-yellow-600 text-sm">NT$ {{ product.price }}</p>
      <p class="group-hover:text-yellow-600 text-sm">
        尚有 {{ product.reserve }} 件庫存
      </p>
    </div>
  </div>
</template>
<style lang="scss"></style>

<script>
import { computed } from 'vue';
export default {
  props: ['order', 'listIndex'],
  setup(props) {
    const orderList = computed(() => Object.keys(props.order.products));
    const firstOrderProduct = computed(
      () => props.order.products[orderList.value[0]]
    );
    const totalQty = computed(() => {
      let number = 0;
      orderList.value.forEach((productId) => {
        number += props.order.products[productId].qty;
      });
      return number;
    });
    return { firstOrderProduct, totalQty };
  },
};
</script>

<template>
  <div
    class="group border-b border-gray-200 py-4 flex items-center space-x-6 hover:bg-gray-50 hover:bg-opacity-50 relative cursor-pointer"
  >
    <div class="absolute top-4 right-4">
      <p class="bg-gray-100 rounded py-1 px-2 text-xs">
        {{ order.is_paid ? '訂單已付款' : '訂單未付款' }}
      </p>
    </div>
    <div class="w-24 h-24 bg-gray-300 rounded-md">
      <img
        class="w-100 h-100"
        :src="firstOrderProduct.product.imageUrl"
        alt="訂單商品圖片"
      />
    </div>
    <div class="flex-1 space-y-2">
      <p class="group-hover:text-yellow-700 text-lg font-medium">
        #{{ order.id }}
      </p>
      <p class="text-sm text-gray-500">
        <span class="mr-2">訂購人</span> {{ order.user.name }}
      </p>
      <p class="text-sm text-gray-500">
        <span class="mr-2">訂單金額</span>NT${{ order.total }}
      </p>
    </div>
    <!-- <div class="flex-1 space-y-2">
      <p class="text-sm text-gray-600">{{ order.user.name }}</p>
      <p class="text-sm text-gray-600">{{ order.user.tel }}</p>
      <p class="text-sm text-gray-600">{{ order.user.email }}</p>
    </div> -->
    <div class="flex justify-end self-end pr-4">
      <p class="text-sm text-gray-400">2021/12/12 12:30</p>
    </div>
  </div>
</template>

<style lang="scss"></style>

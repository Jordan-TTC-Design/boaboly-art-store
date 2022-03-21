<script>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';

export default {
  props: ['select-order'],
  setup(props) {
    let modalOpen = ref(false);
    let listOpen = ref(false);
    const selectItem = computed(() => props.selectOrder);
    watch(selectItem, () => {
      modalOpen.value = true;
    });
    onMounted(() => {});
    onUnmounted(() => {
      modalOpen.value = false;
    });
    return {
      selectItem,
      modalOpen,
      listOpen,
    };
  },
};
</script>
<template>
  <div
    class="siderBg--x z-sider w-2/3"
    :class="{ active: modalOpen }"
    @click="modalOpen = false"
  ></div>
  <div class="siderBox--x z-sider w-1/3" :class="{ active: modalOpen }">
    <div
      class="relative h-full border border-gray-300 flex flex-col"
      v-if="modalOpen"
    >
      <div
        class="flex justify-between items-center border-b border-gray-300 px-4 py-3"
      >
        <div class="flex items-center">
          <button
            type="button"
            @click="modalOpen = false"
            class="p-1.5 px-3 mr-2 border border-gray-300 rounded"
          >
            返回
          </button>
          <p class="text-lg text-black font-medium">
            編號：{{ `${selectItem.id.slice(1, 12)}... ` }}
          </p>
        </div>
        <p class="text-gray-400">2021/12/12 12:30</p>
      </div>
      <div class="overflow-y-scroll px-4 py-3 flex-shrink">
        <div class="border-b border-gray-300 mb-4">
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂購人名稱</p>
            <p class="orderInfoItem__content">{{ selectItem.user.name }}</p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">聯絡電話</p>
            <p class="orderInfoItem__content">{{ selectItem.user.tel }}</p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">聯絡信箱</p>
            <p class="orderInfoItem__content">{{ selectItem.user.email }}</p>
          </div>
        </div>
        <div class="border-b border-gray-300 mb-4">
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單編號</p>
            <p class="orderInfoItem__content">{{ selectItem.id }}</p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單日期</p>
            <p class="orderInfoItem__content">{{ selectItem.id }}</p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單狀態</p>
            <p class="orderInfoItem__content">訂單處理中</p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">運送方式</p>
            <p class="orderInfoItem__content">宅配</p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">運送地址</p>
            <p class="orderInfoItem__content">
              {{ selectItem.user.address }}
            </p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單原金額</p>
            <p class="orderInfoItem__content">
              {{ selectItem.user.address }}
            </p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單運費</p>
            <p class="orderInfoItem__content">
              {{ selectItem.user.address }}
            </p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單折扣碼</p>
            <p class="orderInfoItem__content">
              {{ selectItem.user.address }}
            </p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單折扣</p>
            <p class="orderInfoItem__content">
              {{ selectItem.user.address }}
            </p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單總金額</p>
            <p class="orderInfoItem__content">
              {{ selectItem.user.address }}
            </p>
          </div>
        </div>
        <div class="border-b border-gray-300 mb-4">
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">付款方式</p>
            <p class="orderInfoItem__content">{{ selectItem.user.name }}</p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">付款狀態</p>
            <p class="orderInfoItem__content">{{ selectItem.user.tel }}</p>
          </div>
        </div>
        <div class="orderInfoItem">
          <p class="orderInfoItem__title">購買商品項目</p>
          <button
            type="button"
            @click="listOpen = !listOpen"
            class="border border-gray-200 rounded py-1.5 px-3 hover:border-gray-300"
            :class="{
              'border-black text-black hover:border-black': listOpen,
            }"
          >
            展開
          </button>
        </div>
        <ul class="orderProductList" v-show="listOpen === true">
          <li
            class="flex justify-between mb-3"
            v-for="product in selectItem.products"
            :key="product.product.id"
          >
            <img
              class="w-12 h-12 mr-2"
              :src="product.product.imageUrl"
              :alt="`${product.product.title}產品圖片`"
            />
            <div class="flex-1 mr-2">
              <p>{{ product.product.title }}</p>
              <p class="text-sm text-gray-400">數量： {{ product.qty }} 個</p>
            </div>
            <p class="text-sm">NT$ {{ product.total }}</p>
          </li>
        </ul>
      </div>
      <div class="bg-gray-100 p-4 flex justify-between">
        <div class="flex">
          <button
            type="button"
            class="rounded py-1.5 px-3 bg-white hover:bg-white/50 mr-2"
          >
            變更訂單狀態
          </button>
          <button
            type="button"
            class="rounded py-1.5 px-3 bg-white hover:bg-white/50"
          >
            編輯訂單資料
          </button>
        </div>
        <button
          type="button"
          class="rounded py-1.5 px-3 text-white bg-black hover:bg-black/80"
        >
          出貨
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.orderInfoItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  &__title {
    font-size: 0.75rem;
    color: #979797;
  }
}
</style>

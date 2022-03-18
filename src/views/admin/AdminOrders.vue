<script>
import { computed, ref } from 'vue';
import { apiMethod } from '@/methods/api.js';
import { defaultProductData, productCategory } from '@/methods/data.js';
import RowNav from '@/components/helpers/RowNav.vue';
import AdminOrderListItem from '@/components/admin/AdminOrderListItem.vue';

export default {
  components: {
    RowNav,
    AdminOrderListItem,
  },
  setup() {
    const orders = ref([]);
    let listState = ref(1);
    let showed = ref(true);
    const orderList = computed(() => {
      let array = [];
      if (listState.value === 2) {
        array = orders.value.filter((product) => product.is_paid);
      } else if (listState.value === 3) {
        array = orders.value.filter((product) => !product.is_paid);
      } else {
        array = orders.value;
      }
      return array;
    });
    let selectItem = ref({});
    let modalState = ref(null);
    let modalOpen = ref(false);
    function getProduct() {
      apiMethod.adminGetOrders().then((res) => {
        if (res) {
          orders.value = Object.values(res);
          console.log(orders.value);
        }
      });
    }
    function selectOrder(orderItem) {
      selectItem.value = JSON.parse(JSON.stringify(orderItem));
      console.log(selectItem.value);
    }
    getProduct();
    return {
      orderList,
      listState,
      modalState,
      modalOpen,
      selectItem,
      showed,
      productCategory,
      defaultProductData,
      getProduct,
      selectOrder,
    };
  },
};
</script>
<template>
  <div class="relative px-6 bg-white">
    <div
      class="sticky top-0 bg-white z-40 px-5 pt-6 border-b border-gray-300 mb-6"
    >
      <div class="grid grid-cols-3 mb-8">
        <div class="col-span-1">
          <h3 class="text-3xl font-medium">訂單列表</h3>
        </div>
        <div class="col-span-2 flex justify-end">
          <button
            type="button"
            class="border border-gray-200 rounded py-2 px-3 hover:border-gray-300"
            @click="openProductDetail('isNew')"
          >
            新增產品
          </button>
        </div>
      </div>
      <RowNav
        :list-state="listState"
        :nav-array="['全部訂單', '未付款', '已付款']"
        @return-state="listState = $event"
      />
    </div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-7">
        <template v-for="order in orderList" :key="order.id">
          <AdminOrderListItem :order="order" @click="selectOrder(order)" />
        </template>
      </div>
      <div class="col-span-5" v-if="selectItem.id">
        <div class="border border-gray-300 px-4 py-3">
          <div
            class="flex justify-between items-end border-b border-gray-300 mb-4 pb-3"
          >
            <p class="text-lg text-black font-medium">{{ selectItem.id }}</p>
            <p class="text-gray-400">2021/12/12 12:30</p>
          </div>
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
            <p class="orderInfoItem__content">{{ selectItem.user.address }}</p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">商品金額</p>
            <p class="orderInfoItem__content">{{ selectItem.user.address }}</p>
          </div>
        </div>
      </div>
      <div class="col-span-5" v-if="!selectItem.id">
        <div class="border border-gray-300 px-4 py-48 bg-gray-100">
          <p class="text-center">請選擇一筆訂單</p>
        </div>
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
  }
}
</style>

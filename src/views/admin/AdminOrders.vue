<script>
import { computed, ref } from 'vue';
import { apiMethod } from '@/methods/api.js';
import { defaultProductData, productCategory } from '@/methods/data.js';
import RowNav from '@/components/helpers/RowNav.vue';
import AdminOrderListItem from '@/components/admin/AdminOrderListItem.vue';
import AdminOrderSlider from '@/components/admin/AdminOrderSlider.vue';

export default {
  components: {
    RowNav,
    AdminOrderListItem,
    AdminOrderSlider,
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
    function getOrders() {
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
    getOrders();
    return {
      orderList,
      listState,
      modalState,
      modalOpen,
      selectItem,
      showed,
      productCategory,
      defaultProductData,
      getOrders,
      selectOrder,
    };
  },
};
</script>
<template>
  <div class="relative bg-white">
    <div
      class="sticky top-0 bg-white z-40 px-5 pt-6 border-b border-gray-300 mb-6"
    >
      <div class="grid grid-cols-3 mb-8">
        <div class="col-span-1">
          <h3 class="text-3xl font-medium">訂單列表</h3>
        </div>
        <div class="col-span-2 flex justify-end"></div>
      </div>
      <RowNav
        :list-state="listState"
        :nav-array="['全部訂單', '未付款', '已付款']"
        @return-state="listState = $event"
      />
    </div>
    <template v-for="order in orderList" :key="order.id">
      <AdminOrderListItem :order="order" @click="selectOrder(order)" />
    </template>
  </div>
  <AdminOrderSlider :select-order="selectItem" @get-orders="getOrders" />
</template>
<style lang="scss" scoped></style>

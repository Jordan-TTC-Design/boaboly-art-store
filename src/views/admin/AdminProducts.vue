<script>
import { ref, computed } from 'vue';
import { defaultProductData, productCategory } from '@/methods/data.js';
import AdminProductEdit from '@/components/admin/AdminProductEdit.vue';
import AdminProductSlider from '@/components/admin/AdminProductSlider.vue';
import RowNav from '@/components/helpers/RowNav.vue';
import AdminProductListItemSquare from '@/components/admin/AdminProductListItemSquare.vue';
import { adminStore } from '@/stores/adminStore';

export default {
  components: {
    AdminProductEdit,
    AdminProductSlider,
    RowNav,
    AdminProductListItemSquare,
  },
  setup() {
    const adminData = adminStore();
    const listState = ref(1);
    const productList = computed(() => {
      let array = [];
      if (listState.value === 2) {
        array = adminData.products.filter((product) => product.is_enabled);
      } else if (listState.value === 3) {
        array = adminData.products.filter((product) => !product.is_enabled);
      } else {
        array = adminData.products;
      }
      return array;
    });
    function openProductDetail(state, item) {
      if (state === 'isNew') {
        adminData.productItem = JSON.parse(JSON.stringify(defaultProductData));
      } else if (state === 'edit') {
        adminData.productItem = JSON.parse(JSON.stringify(item));
      }
      adminData.productModel.open = true;
      adminData.productModel.state = state;
    }
    adminData.getProduct();
    return {
      adminData,
      productList,
      listState,
      productCategory,
      openProductDetail,
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
          <h3 class="text-3xl font-medium">商品列表</h3>
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
        :nav-array="['全部商品', '刊登中', '已下架']"
        @return-state="listState = $event"
      />
    </div>
    <div class="grid grid-cols-5 p-5 gap-4">
      <div class="col-span-1 min-h-screen">
        <ul class="mb-6">
          <li class="text-sm text-gray-400 mb-2">商品等級</li>
          <li class="group py-2 px-5 cursor-pointer hover:text-yellow-600">
            <span
              class="w-3 h-px bg-gray-300 block absolute top-1/2 left-0 group-hover:bg-yellow-400"
            ></span
            >一般商品
          </li>
          <li class="group py-2 px-5 cursor-pointer hover:text-yellow-600">
            <span
              class="w-3 h-px bg-gray-300 block absolute top-1/2 left-0 group-hover:bg-yellow-400"
            ></span
            >首頁商品
          </li>
          <li class="group py-2 px-5 cursor-pointer hover:text-yellow-600">
            <span
              class="w-3 h-px bg-gray-300 block absolute top-1/2 left-0 group-hover:bg-yellow-400"
            ></span
            >活動商品
          </li>
        </ul>
        <ul class="mb-6">
          <li class="text-sm text-gray-400 mb-2">商品類別</li>
          <template v-for="category in productCategory" :key="category">
            <li
              class="group py-2 px-5 cursor-pointer relative hover:text-yellow-600"
            >
              <span
                class="w-3 h-px bg-gray-300 block absolute top-1/2 left-0 group-hover:bg-yellow-400"
              ></span
              >{{ category }}
            </li>
          </template>
        </ul>
      </div>
      <div class="col-start-2 col-span-4">
        <div class="grid grid-cols-3 gap-4">
          <template v-for="(product, index) in productList" :key="product.id">
            <AdminProductListItemSquare
              :product="product"
              :list-index="index"
              @change-product-state="adminData.changeProductState"
              @open-product-detail="openProductDetail"
              @delete-product="adminData.deleteProduct"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
  <div
    class="siderBg z-sider"
    :class="{ active: adminData.productModel.open }"
    @click="adminData.productModel.open = false"
  ></div>
  <div
    class="siderBox z-sider"
    :class="{
      active:
        adminData.productModel.open === true &&
        adminData.productModel.state === 'isNew',
    }"
  >
    <AdminProductEdit />
  </div>
  <div
    class="siderBox z-sider"
    :class="{
      active:
        adminData.productModel.open === true &&
        adminData.productModel.state === 'edit',
    }"
  >
    <AdminProductSlider />
  </div>
</template>

<style lang="scss"></style>

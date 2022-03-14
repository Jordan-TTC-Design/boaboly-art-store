<script>
import { ref, computed } from 'vue';
import { apiMethod } from '@/methods/api.js';
import { productCategory } from '@/methods/data.js';
import AdminProductEdit from '@/components/admin/AdminProductEdit.vue';
import AdminProductSlider from '@/components/admin/AdminProductSlider.vue';
import RowNav from '@/components/helpers/RowNav.vue';
import AdminProductListItemSquare from '@/components/admin/AdminProductListItemSquare.vue';

export default {
  components: {
    AdminProductEdit,
    AdminProductSlider,
    RowNav,
    AdminProductListItemSquare,
  },
  setup() {
    const products = ref([]);
    let listState = ref(1);
    let showed = ref(true);
    const productList = computed(() => {
      let array = [];
      if (listState.value === 2) {
        array = products.value.filter((product) => product.is_enabled);
      } else if (listState.value === 3) {
        array = products.value.filter((product) => !product.is_enabled);
      } else {
        array = products.value;
      }
      return array;
    });
    let selectItem = ref({});
    let modalState = ref(null);
    let modalOpen = ref(false);
    function clearItem() {
      modalOpen.value = false;
      modalState.value = null;
      selectItem.value = {};
    }
    function openProductDetail(state, item) {
      console.log(state, item);
      if (state === 'isNew') {
        selectItem.value = {};
      } else if (state === 'edit') {
        selectItem.value = JSON.parse(JSON.stringify(item));
        console.log(selectItem.value);
      }
      modalOpen.value = true;
      modalState.value = state;
    }
    async function deleteProduct(itemId) {
      await apiMethod.adminDeleteProduct(itemId);
      getProduct();
      selectItem.value = {
        imagesUrl: [],
      };
    }
    function changeProductState(productData) {
      productData.is_enabled = !productData.is_enabled;
      updateProduct(productData.id, productData);
    }
    async function updateProduct(itemId, productData) {
      await apiMethod.adminUpdateProduct(itemId, productData);
      getProduct();
    }
    function getProduct() {
      apiMethod.adminGetProductsAll().then((res) => {
        if (res) {
          products.value = Object.values(res);
          console.log(products.value);
        }
      });
    }
    getProduct();
    return {
      productList,
      listState,
      modalState,
      modalOpen,
      selectItem,
      showed,
      productCategory,
      openProductDetail,
      deleteProduct,
      changeProductState,
      clearItem,
      getProduct,
    };
  },
};
</script>
<template>
  <div class="relative px-4 bg-white">
    <div class="sticky top-0 bg-white z-40 px-5 pt-6 pb-4">
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
          <li class="text-sm text-gray-400 mb-2">商品狀態</li>
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
        <h5 class="mb-4">商品</h5>
        <div class="grid grid-cols-3 gap-4">
          <template v-for="(product, index) in productList" :key="product.id">
            <AdminProductListItemSquare
              :product="product"
              :list-index="index"
              @change-product-state="changeProductState"
              @open-product-detail="openProductDetail"
              @delete-product="deleteProduct"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
  <div
    class="siderBg z-sider"
    :class="{ active: modalOpen }"
    @click="modalOpen = false"
  ></div>
  <div class="siderBox z-sider">
    <AdminProductEdit
      :select-item="selectItem"
      :modal-state="modalState"
      @get-product="getProduct"
      @clear-item="clearItem"
    />
  </div>
  <div class="siderBox z-sider" :class="{ active: modalOpen }">
    <AdminProductSlider
      :select-item="selectItem"
      :modal-state="modalState"
      @get-product="getProduct"
      @clear-item="clearItem"
    />
  </div>
</template>
<style lang="scss"></style>

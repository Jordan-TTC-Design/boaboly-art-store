<script>
import { ref, computed } from 'vue';
import { apiMethod } from '@/methods/api.js';
import { defaultProductData, productCategory } from '@/methods/data.js';
import AdminArtSlider from '@/components/admin/AdminArtSlider.vue';
import RowNav from '@/components/helpers/RowNav.vue';
import AdminProductListItemSquare from '@/components/admin/AdminProductListItemSquare.vue';

export default {
  components: {
    AdminArtSlider,
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
    let selectItem = ref(JSON.parse(JSON.stringify(defaultProductData)));
    let modalState = ref(null);
    let modalOpen = ref(false);
    function clearItem() {
      modalOpen.value = false;
      modalState.value = null;
      selectItem.value = JSON.parse(JSON.stringify(defaultProductData));
    }
    function openProductDetail(state, item) {
      console.log(state, item);
      if (state === 'isNew') {
        console.log(defaultProductData);
        selectItem.value = JSON.parse(JSON.stringify(defaultProductData));
      } else if (state === 'edit') {
        selectItem.value = JSON.parse(JSON.stringify(item));
      }
      modalOpen.value = true;
      modalState.value = state;
    }
    async function deleteProduct(itemId) {
      await apiMethod.adminDeleteProduct(itemId);
      getProduct();
      selectItem.value = JSON.parse(JSON.stringify(defaultProductData));
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
      defaultProductData,
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
  <div class="relative bg-white">
    <div
      class="sticky top-0 bg-white z-40 px-5 pt-6 border-b border-gray-300 mb-6"
    >
      <div class="grid grid-cols-3 mb-8">
        <div class="col-span-1">
          <h3 class="text-3xl font-medium">文章列表</h3>
        </div>
        <div class="col-span-2 flex justify-end">
          <button
            type="button"
            class="border border-gray-200 rounded py-2 px-3 hover:border-gray-300"
            @click="openProductDetail('isNew')"
          >
            新增文章
          </button>
        </div>
      </div>
      <RowNav
        :list-state="listState"
        :nav-array="['全部文章', '刊登中', '已下架']"
        @return-state="listState = $event"
      />
    </div>
    <div class="grid grid-cols-5 p-5 gap-4">
      <div class="col-span-1 min-h-screen">
        <ul class="mb-6">
          <li class="text-sm text-gray-400 mb-2">文章類別</li>
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
  <div class="siderBox z-sider" :class="{ active: modalOpen === true }">
    <AdminArtSlider
      :select-item="selectItem"
      :modal-state="modalState"
      @get-product="getProduct"
      @clear-item="clearItem"
    />
  </div>
</template>
<style lang="scss"></style>

<script>
import { ref, computed, watch, onMounted } from 'vue';
// import { frontApiMethod } from '@/methods/api.js';
import { productCategory, materialCategory } from '@/methods/data.js';
import ProductListItemSquare from '@/components/front/ProductListItemSquare.vue';
import Pagination from '@/components/helpers/Pagination.vue';
import SideNav from '@/components/helpers/SideNav.vue';
import emitter from '@/methods/emitter';
import { productStore } from '@/stores/productStore';
export default {
  components: {
    ProductListItemSquare,
    SideNav,
    Pagination,
  },
  setup() {
    const productsData = productStore();
    const filterKeyword = ref('');
    const filterProductCategory = ref('');
    const filterMaterialCategory = ref('');
    const collecitonList = ref([]);
    const paginationData = ref({ totalPages: 1, nowPage: 1 });
    const productfilterList = computed(() => {
      let array = [];
      array = productsData.products;
      array = filterWord(filterKeyword.value, array);
      array = filterCategory(filterProductCategory.value, array);
      array = filterMaterial(filterMaterialCategory.value, array);
      return array;
    });
    const nowPageProducts = computed(() => {
      let array = [];
      if (productfilterList.value.length <= 12) {
        return productfilterList.value;
      } else {
        const pageFrist = paginationData.value.nowPage * 12 - 12;
        productfilterList.value.forEach((item, index) => {
          if (pageFrist <= index && index < paginationData.value.nowPage * 12) {
            array.push(item);
          }
        });
        return array;
      }
    });
    function filterWord(filterData, dataList) {
      let array = dataList;
      if (filterData !== '' && filterData !== undefined) {
        array = dataList.filter(
          (item) =>
            item.title.includes(filterData) || item.tags.includes(filterData)
        );
      }
      return array;
    }
    function filterCategory(filterData, dataList) {
      let array = dataList;
      if (filterData !== '' && filterData !== undefined) {
        array = dataList.filter((item) => item.category === filterData);
      }
      return array;
    }
    function filterMaterial(filterData, dataList) {
      let array = dataList;
      if (filterData !== '' && filterData !== undefined) {
        array = dataList.filter((item) => item.material === filterData);
      }
      return array;
    }
    // eslint-disable-next-line no-unused-vars
    // function getProducts() {
    //   emitter.emit('open-loading');
    //   frontApiMethod.getProductAll().then((res) => {
    //     if (res) {
    //       productList.value = JSON.parse(JSON.stringify(res));
    //       emitter.emit('send-check-collection');
    //       emitter.emit('close-loading');
    //     }
    //   });
    // }
    watch(productfilterList, (newValue, oldValue) => {
      if (newValue.length !== oldValue.length) {
        paginationData.value.nowPage = 1;
        paginationData.value.totalPages = Math.ceil(newValue.length / 12);
      }
    });
    watch(paginationData.value, () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    onMounted(() => {
      emitter.on('check-collection', (data) => {
        collecitonList.value = data;
      });
    });
    productsData.getProducts();
    productsData.getCollections();
    return {
      filterKeyword,
      filterProductCategory,
      filterMaterialCategory,
      collecitonList,
      nowPageProducts,
      productCategory,
      materialCategory,
      emitter,
      paginationData,
      productsData,
    };
  },
};
</script>

<template>
  <div
    class="relative bg-white grid grid-cols-12 lg:px-24 md:px-16 px-4 md:py-32 py-16 md:gap-x-8 w-full"
  >
    <div class="col-start-2 col-span-10 lg:mb-32 md:mb-24 mb-16">
      <h4 class="text-xl text-black uppercase mb-8">All Products</h4>
      <h3 class="lg:text-8xl text-5xl text-black font-medium md:mb-16 mb-8">
        全部商品
      </h3>
      <div class="flex md:flex-row flex-col md:gap-8 gap-4">
        <div class="pageInputBox flex-1">
          <input
            class="appearance-none bg-transparent border-b border-gray-300 w-full text-gray-700 p-2 leading-tight focus:outline-none"
            type="text"
            id="inputSearch"
            placeholder="搜尋關鍵字"
            v-model="filterKeyword"
          />
          <button type="button" class="py-1.5 px-2 searchBtn group">
            <i class="bi bi-x text-xl group-hover:text-red-600"></i>
          </button>
          <div class="underLine"></div>
        </div>
        <div class="pageSelectBox flex-1 md:hidden">
          <select
            class="cursor-pointer appearance-none bg-transparent border-b border-gray-300 w-full p-2 leading-tight focus:outline-none"
            id="filterCategory"
            value="modelValue"
            v-model="filterProductCategory"
          >
            <option selected value="">全部類別</option>
            <template v-for="option in productCategory" :key="option">
              <option :value="option">{{ option }}</option>
            </template>
          </select>
          <div class="underLine"></div>
        </div>
        <div class="pageSelectBox flex-1 md:hidden">
          <select
            class="cursor-pointer appearance-none bg-transparent border-b border-gray-300 w-full p-2 leading-tight focus:outline-none"
            id="filterCategory"
            value="modelValue"
            v-model="filterMaterialCategory"
          >
            <option selected value="">全部材質</option>
            <template v-for="option in materialCategory" :key="option">
              <option :value="option">{{ option }}</option>
            </template>
          </select>
          <div class="underLine"></div>
        </div>
      </div>
    </div>
    <div class="lg:col-span-2 md:col-span-3 relative md:block hidden">
      <div class="sticky top-32">
        <SideNav
          :nav-list="productCategory"
          @change-side-nav="filterProductCategory = $event"
          >商品類別</SideNav
        >
      </div>
    </div>
    <div
      class="lg:col-span-10 md:col-span-9 col-span-12 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 mb-8"
    >
      <template v-for="(product, index) in nowPageProducts" :key="product.id">
        <ProductListItemSquare
          :product="product"
          :list-index="index"
          :collection-list="productsData.collections"
          @add-cart="
            emitter.emit('add-cart', {
              id: product.id,
              num: 1,
            })
          "
        />
      </template>
    </div>
    <div
      class="lg:col-start-3 md:col-start-4 lg:col-span-10 md:col-span-9 col-span-12 flex justify-center"
      v-if="paginationData.totalPages > 1"
    >
      <Pagination
        :pagination-data="paginationData"
        @change-page-number="paginationData.nowPage = $event"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pageSelectBox {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 25%;
    right: 0.5rem;
    width: 1rem;
    height: 1px;
    background-color: black;
    transition: all 0.3s;
  }
  &::after {
    content: '';
    position: absolute;
    top: 25%;
    right: 0.5rem;
    width: 1rem;
    height: 1px;
    background-color: black;
    transform: rotate(90deg);
    transition: all 0.3s;
  }
  &:hover {
    &::before {
      transform: rotate(90deg);
    }
    &::after {
      transform: rotate(180deg);
    }
    .underLine {
      width: 100%;
    }
  }
}
.underLine {
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 0%;
  height: 1px;
  background-color: black;
  transition: all 0.3s;
}
.pageInputBox {
  position: relative;
  &:hover {
    .underLine {
      width: 100%;
    }
  }
  .searchBtn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    color: #646464;
    &:hover {
      color: black;
    }
  }
}
</style>

<script>
import { ref, computed } from 'vue';
import { frontApiMethod } from '@/methods/api.js';
import { productCategory, materialCategory } from '@/methods/data.js';
import ProductListItemSquare from '@/components/front/ProductListItemSquare.vue';
import emitter from '@/methods/emitter';

export default {
  components: {
    ProductListItemSquare,
  },
  setup() {
    const productList = ref([]);
    let filterKeyword = ref('');
    let filterProductCategory = ref('');
    let filterMaterialCategory = ref('');
    const productfilterList = computed(() => {
      let array = [];
      array = productList.value;
      array = filterWord(filterKeyword.value, array);
      array = filterCategory(filterProductCategory.value, array);
      array = filterMaterial(filterMaterialCategory.value, array);
      return array;
    });
    function filterWord(filterData, dataList) {
      let array = dataList;
      if (filterData !== '') {
        array = dataList.filter((item) => item.title.includes(filterData));
      }
      return array;
    }
    function filterCategory(filterData, dataList) {
      let array = dataList;
      if (filterData !== '') {
        array = dataList.filter((item) => item.category === filterData);
      }
      return array;
    }
    function filterMaterial(filterData, dataList) {
      let array = dataList;
      if (filterData !== '') {
        array = dataList.filter((item) => item.material === filterData);
      }
      return array;
    }
    function getProduct() {
      emitter.emit('open-loading');
      frontApiMethod.getProducts().then((res) => {
        if (res) {
          productList.value = JSON.parse(JSON.stringify(res));
          emitter.emit('close-loading');
        }
      });
    }
    getProduct();
    return {
      filterKeyword,
      filterProductCategory,
      filterMaterialCategory,
      productfilterList,
      productCategory,
      materialCategory,
      getProduct,
      emitter,
    };
  },
};
</script>
<template>
  <div class="relative bg-white grid grid-cols-12 px-16 py-32">
    <div class="col-start-2 col-span-10 pb-32">
      <h4 class="text-xl text-black uppercase mb-8">All Products</h4>
      <h3 class="text-8xl text-black font-medium mb-16">全部商品</h3>
      <div class="flex gap-8">
        <div class="pageInputBox flex-1">
          <input
            class="appearance-none bg-transparent border-b border-gray-300 w-full text-gray-700 p-2 leading-tight focus:outline-none"
            type="text"
            id="inputSearch"
            placeholder="搜尋關鍵字"
            v-model="filterKeyword"
          />
          <button class="py-1.5 px-2 searchBtn">
            <i class="bi bi-search"></i>
          </button>
          <div class="underLine"></div>
        </div>
        <div class="pageSelectBox flex-1">
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
        <div class="pageSelectBox flex-1">
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
    <div class="col-span-12 grid grid-cols-3 gap-4">
      <template v-for="(product, index) in productfilterList" :key="product.id">
        <ProductListItemSquare
          :product="product"
          :list-index="index"
          @add-cart="
            emitter.emit('add-cart', {
              id: product.id,
              num: 1,
            })
          "
        />
      </template>
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
data

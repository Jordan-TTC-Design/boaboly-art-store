<script>
import { ref } from 'vue';
import { frontApiMethod } from '@/methods/api.js';
import ProductListItemSquare from '@/components/front/ProductListItemSquare.vue';
import emitter from '@/methods/emitter';

export default {
  components: {
    ProductListItemSquare,
  },
  setup() {
    const productList = ref([]);
    function getProduct() {
      emitter.emit('open-loading');
      frontApiMethod.getProducts().then((res) => {
        if (res) {
          productList.value = JSON.parse(JSON.stringify(res));
          console.log(productList.value);
          emitter.emit('close-loading');
        }
      });
    }
    getProduct();
    return {
      productList,
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
        <div class="w-full">
          <input
            class="appearance-none bg-transparent border-b border-gray-300 w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none"
            type="text"
            id="inputSearch"
            placeholder="搜尋關鍵字"
          />
        </div>
        <div class="w-full">
          <input
            class="appearance-none bg-transparent border-b border-gray-300 w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none"
            type="text"
            id="inputSearch"
            placeholder="搜尋關鍵字"
          />
        </div>
      </div>
    </div>
    <div class="col-span-12 grid grid-cols-3 gap-4">
      <template v-for="(product, index) in productList" :key="product.id">
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
// * {
//   outline: 1px solid red;
// }
</style>

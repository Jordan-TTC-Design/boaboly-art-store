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
  <div class="relative px-4 bg-white py-24">
    <h4 class="text-xl text-black font-bold uppercase text-center mb-1">
      All Products
    </h4>
    <h3 class="text-2xl text-black font-medium text-center mb-8">全部商品</h3>
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
        <div class="grid grid-cols-3 gap-4">
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
    </div>
  </div>
</template>
<style lang="scss"></style>

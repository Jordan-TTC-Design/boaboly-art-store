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
      frontApiMethod.getProducts().then((res) => {
        if (res) {
          productList.value = JSON.parse(JSON.stringify(res));
          console.log(productList.value);
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
  <div class="relative px-4 bg-white">
    <div class="grid grid-cols-5 p-5 gap-4">
      <div class="col-start-2 col-span-4">
        <h5 class="mb-4">商品</h5>
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

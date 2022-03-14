<script>
import { ref } from 'vue';
import { frontApiMethod } from '@/methods/api.js';
import ProductListItemSquare from '@/components/front/ProductListItemSquare.vue';
import HomeSlider from '@/components/front/HomeSlider.vue';
import emitter from '@/methods/emitter';

export default {
  components: {
    ProductListItemSquare,
    HomeSlider,
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
  <div class="homeMainSection grid grid-cols-3 py-36">
    <div class="col-start-2 col-span-1">
      <div class="bg-primaryLight">
        <img
          class="w-full h-full"
          src="@/assets/images/boabolyLogo.svg"
          alt="face"
        />
      </div>
    </div>
  </div>
  <HomeSlider />
  <div class="relative px-4 bg-white py-24">
    <h4 class="text-xl text-black font-bold uppercase text-center mb-1">
      New Products
    </h4>
    <h3 class="text-2xl text-black font-medium text-center mb-8">最新商品</h3>
    <div class="grid grid-cols-5 p-5 gap-4">
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

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { frontApiMethod } from '@/methods/api.js';
import emitter from '@/methods/emitter';

export default {
  setup() {
    const productId = useRoute().params.id;
    const buyNum = ref(1);
    const productImgArray = ref([]);
    const product = ref({});
    const mainImg = ref(null);
    frontApiMethod.getProduct(productId).then((res) => {
      product.value = res;
      mainImg.value = res.imageUrl;
      productImgArray.value = [res.imageUrl, ...res.imagesUrl];
    });
    function addCart() {
      emitter.emit('add-cart', {
        id: product.value.id,
        num: buyNum.value,
      });
      buyNum.value = 1;
    }
    return {
      product,
      productImgArray,
      buyNum,
      mainImg,
      addCart,
    };
  },
};
</script>
<template>
  <div class="bg-gray-100 relative py-16 min-h-screen">
    <div class="bg-primaryLight w-full h-96 absolute top-0"></div>
    <div class="container mx-auto bg-white shadow-sm p-16">
      <div class="grid grid-cols-10 gap-4">
        <div class="col-span-4">
          <img :src="mainImg" alt="產品主圖" />
        </div>
        <div class="col-span-1">
          <div class="bg-gray-100 p-2 h-full">
            <template
              v-for="(productImg, index) in productImgArray"
              :key="productImg"
            >
              <img
                class="mb-2 cursor-pointer"
                :src="productImg"
                :alt="`產品附圖${index}`"
                @click="mainImg = productImg"
              />
            </template>
          </div>
        </div>
        <div class="col-span-5 flex flex-col justify-between">
          <div>
            <p class="productTag bg-primaryLight mb-4">商品標</p>
            <h2 class="text-3xl font-bold mb-3">{{ product.title }}</h2>
            <h4 class="text-2xl mb-1">NT$ {{ product.price }}</h4>
            <p
              v-show="product.origin_price == product.price"
              class="text-sm text-gray-400 mb-1"
            >
              原價 NT$
              <span class="line-through">{{ product.origin_price }}</span>
            </p>
          </div>
          <div>
            <div class="flex items-center mb-4">
              <p class="text-sm text-gray-400 mr-3">剩餘庫存</p>
              <p class="">10 件</p>
            </div>
            <div class="flex items-center mb-6">
              <p class="text-sm text-gray-400 mr-3">購買數量</p>
              <div class="numberSwitcher">
                <button
                  type="button"
                  class="numberSwitcher__btn"
                  @click="buyNum -= 1"
                >
                  <i class="bi bi-dash text-xl"></i>
                </button>
                <input
                  class="numberSwitcher__numBox focus:outline-none"
                  type="number"
                  :value="buyNum"
                />
                <button
                  type="button"
                  class="numberSwitcher__btn"
                  @click="buyNum += 1"
                >
                  <i class="bi bi-plus text-xl"></i>
                </button>
              </div>
            </div>
            <div class="flex">
              <button
                type="button"
                class="border border-gray-200 rounded py-2 px-3 hover:border-gray-300 bg-white mr-3"
              >
                <i class="bi bi-heart-fill text-xl"></i>
              </button>
              <button
                type="button"
                class="bg-black rounded py-2 px-3 hover:bg-gray-800 text-white flex-1"
                @click="addCart"
              >
                <p>加入購物車</p>
              </button>
            </div>
            <div class="border-t border-gray-300 pt-6 mt-6">
              <p class="text-sm">
                付款後，從備貨到寄出商品為 3 個工作天。（不包含假日）
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>

<script>
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { frontApiMethod } from '@/methods/api.js';
import emitter from '@/methods/emitter';
import ProductSlider from '@/components/front/ProductSlider.vue';

export default {
  components: { ProductSlider },
  setup() {
    const route = useRoute();
    const productId = computed(() => route.params.id);
    const collecitonList = ref([]);
    const productList = ref([]);
    const buyNum = ref(1);
    const productImgArray = ref([]);
    const product = ref({});
    const mainImg = ref(null);
    let fullWidth = ref(window.innerWidth);
    let swiperNum1 = computed(() => {
      if (fullWidth.value >= 1280) {
        return 3;
      } else if (fullWidth.value < 1280 && fullWidth.value > 767) {
        return 2;
      } else {
        return 1;
      }
    });
    function getProduct(itemId) {
      emitter.emit('open-loading');
      frontApiMethod.getProduct(itemId).then((res) => {
        product.value = res;
        mainImg.value = res.imageUrl;
        productImgArray.value = [res.imageUrl, ...res.imagesUrl];
        emitter.emit('close-loading');
        getProducts();
      });
    }
    function getProducts() {
      emitter.emit('open-loading');
      frontApiMethod.getProductAll().then((res) => {
        productList.value = JSON.parse(JSON.stringify(res)).filter(
          (item) => item.id !== product.value.id && item.promoted.star > 0
        );
        emitter.emit('send-check-collection');
        emitter.emit('close-loading');
      });
    }
    function addCart() {
      emitter.emit('add-cart', {
        id: product.value.id,
        num: buyNum.value,
      });
      buyNum.value = 1;
    }
    watch(productId, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        getProduct(productId.value);
      }
    });
    onMounted(() => {
      window.onresize = () => {
        fullWidth.value = window.innerWidth;
      };
      emitter.on('check-collection', (data) => {
        collecitonList.value = data;
      });
    });
    getProduct(productId.value);
    return {
      product,
      productList,
      collecitonList,
      productImgArray,
      buyNum,
      mainImg,
      emitter,
      swiperNum1,
      addCart,
    };
  },
};
</script>
<template>
  <div class="bg-gray-100 relative md:py-16 pt-4 pb-16 min-h-screen">
    <div class="bg-primaryLight w-full h-96 absolute top-0"></div>
    <div
      class="sm:container sm:mx-auto mx-4 bg-white shadow-sm lg:p-24 md:p-12 p-8 pb-24"
    >
      <div
        class="grid lg:grid-cols-12 grid-cols-1 gap-8 relative pb-12 border-b border-gray-300"
      >
        <div class="lg:col-span-5 gap-4">
          <div class="bg-gray-100 p-2 flex flex-col gap-2">
            <img class="w-full" :src="mainImg" alt="產品主圖" />
            <div
              class="w-full bg-gray-100 overflow-x-auto flex gap-x-2"
              v-if="productImgArray.length >= 2"
            >
              <template
                v-for="(productImg, index) in productImgArray"
                :key="productImg"
              >
                <img
                  v-if="productImg !== ''"
                  class="w-20 cursor-pointer hover:brightness-50"
                  :class="{ 'brightness-50': mainImg === productImg }"
                  :src="productImg"
                  :alt="`產品附圖${index}`"
                  @click="mainImg = productImg"
                />
              </template>
            </div>
          </div>
        </div>
        <div class="lg:col-span-7 flex flex-col justify-between">
          <div class="mb-12">
            <p class="productTag bg-primaryLight mb-4">
              {{ product.category }}
            </p>
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
            <div class="flex items-center mb-4 gap-3">
              <p class="text-sm text-gray-400 whitespace-nowrap">剩餘庫存</p>
              <p>{{ `${product.store} ${product.unit}` }}</p>
            </div>
            <div class="flex md:items-center mb-6 gap-3 md:flex-row flex-col">
              <p class="text-sm text-gray-400 whitespace-nowrap">購買數量</p>
              <div class="numberSwitcher">
                <button
                  type="button"
                  class="numberSwitcher__btn"
                  @click="buyNum -= 1"
                >
                  <i class="bi bi-dash text-xl"></i>
                </button>
                <input
                  class="numberSwitcher__numBox focus:outline-none flex-grow"
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
            <div class="flex gap-x-2">
              <button
                type="button"
                class="rounded py-2 px-3 bg-white border border-gray-300"
                data-id="product.id"
                @click="emitter.emit('add-collection', product)"
              >
                <i
                  :class="{
                    'bi-heart': collecitonList.indexOf(product.id) < 0,
                    'bi-heart-fill': collecitonList.indexOf(product.id) >= 0,
                  }"
                  class="bi text-xl text-black"
                ></i>
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
      <div
        class="grid lg:grid-cols-12 grid-cols-1 gap-8 relative mb-24 py-24 border-b border-gray-300"
      >
        <div class="lg:col-span-8">
          <h3 class="text-2xl text-black font-bold mb-8">商品介紹</h3>
          <div v-html="product.content"></div>
        </div>
        <div class="lg:col-span-4">
          <h3 class="text-2xl text-black font-bold mb-8">商品其他資訊</h3>
          <ul class="grid gap-y-4">
            <li class="flex md:flex-row flex-col gap-x-3 gap-y-1">
              <p class="mt-0.5 text-sm text-gray-400 whitespace-nowrap">材質</p>
              <p>{{ product.material }}</p>
            </li>
            <li class="flex md:flex-row flex-col gap-x-3 gap-y-1">
              <p class="mt-0.5 text-sm text-gray-400 whitespace-nowrap">描述</p>
              <p>{{ product.description }}</p>
            </li>
            <li class="flex md:flex-row flex-col gap-x-3 gap-y-1">
              <p class="mt-0.5 text-sm text-gray-400 whitespace-nowrap">尺寸</p>
              <div class="flex gap-4" v-if="product.size">
                <p>長：{{ product.size.sizeLength }}</p>
                <p>寬：{{ product.size.sizeWidth }}</p>
                <p>高：{{ product.size.sizeHeight }}</p>
              </div>
            </li>
            <li class="flex md:flex-row flex-col gap-x-3 gap-y-1">
              <p class="mt-0.5 text-sm text-gray-400 whitespace-nowrap">標籤</p>
              <div class="flex flex-wrap">
                <p v-for="tag in product.tags" :key="tag"># {{ tag }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="mb-24">
        <h3 class="text-center font-bold text-3xl text-black mb-12">
          其他推薦商品
        </h3>
        <ProductSlider :swiper-num="swiperNum1" :product-list="productList" />
      </div>
      <div
        class="flex md:flex-row flex-col justify-end items-center gap-x-8 px-12"
      >
        <router-link to="/products" class="lg:text-3xl tex-xl font-bold"
          >BACK TO PRODUCTS</router-link
        >
        <router-link to="/products" class="arrow"></router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.arrow {
  position: relative;
  width: 200px;
  height: 36px;
  cursor: pointer;
  transition: 0.5s;
  overflow: hidden;
}
.arrow:after {
  position: absolute;
  display: block;
  content: '';
  color: black;
  width: calc(100% - 18px);
  height: 20px;
  top: -1.5px;
  left: 0px;
  border-bottom: solid 1px;
  transform: translatex(4px);
}
.arrow:before {
  position: absolute;
  display: block;
  content: '';
  color: black;
  width: 12px;
  height: 12px;
  border-top: solid 1px;
  border-left: solid 1px;
  top: 50%;
  right: 2px;
  transform-origin: 0% 0%;
  transform: rotatez(135deg);
}
.arrow:before {
  animation: aniArrow01 2s cubic-bezier(0, 0.6, 1, 0.4) infinite 2s;
}
.arrow:after {
  animation: aniArrow02 2s cubic-bezier(0, 0.6, 1, 0.4) infinite 2s;
}
@keyframes aniArrow01 {
  0% {
    transform: rotatez(135deg) translateY(118px) translateX(118px);
  }
  100% {
    transform: rotatez(135deg) translateY(-86px) translateX(-86px);
  }
}
@keyframes aniArrow02 {
  0% {
    transform: translateX(-160px);
  }
  100% {
    transform: translateX(120px);
  }
}
</style>

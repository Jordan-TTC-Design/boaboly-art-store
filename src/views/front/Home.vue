<script>
import { ref } from 'vue';
import { frontApiMethod } from '@/methods/api.js';
import ProductListItemSquare from '@/components/front/ProductListItemSquare.vue';
import HomeSlider from '@/components/front/HomeSlider.vue';
import ArtSlider from '@/components/front/ArtSlider.vue';
import emitter from '@/methods/emitter';

export default {
  components: {
    ProductListItemSquare,
    HomeSlider,
    ArtSlider,
  },
  setup() {
    const productList = ref([]);
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
      productList,
      getProduct,
      emitter,
    };
  },
};
</script>
<template>
  <div class="homeMainSection grid grid-cols-3 py-36 relative">
    <div class="col-start-2 col-span-1">
      <div class="bg-primaryLight">
        <img
          class="w-full h-full"
          src="@/assets/images/boabolyLogo.svg"
          alt="face"
        />
      </div>
    </div>
    <div class="arrow arrow-1"></div>
    <div class="arrow arrow-2"></div>
  </div>
  <ArtSlider />
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
<style lang="scss" scoped>
.arrow {
  position: absolute;
  left: 50%;
  top: 90%;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
}

.arrow-1 {
  -webkit-animation: arrow-movement 2s ease-in-out infinite;
  animation: arrow-movement 2s ease-in-out infinite;
}

.arrow-2 {
  -webkit-animation: arrow-movement 2s 1s ease-in-out infinite;
  animation: arrow-movement 2s 1s ease-in-out infinite;
}

.arrow:before,
.arrow:after {
  background: black;
  content: '';
  display: block;
  height: 2px;
  position: absolute;
  top: 0;
  left: 0;
  width: 1rem;
}

.arrow:before {
  -webkit-transform: rotate(45deg) translateX(-16%);
  transform: rotate(45deg) translateX(-16%);
  -webkit-transform-origin: top left;
  transform-origin: top left;
}

.arrow:after {
  -webkit-transform: rotate(-45deg) translateX(16%);
  transform: rotate(-45deg) translateX(16%);
  -webkit-transform-origin: top right;
  transform-origin: top right;
}

@-webkit-keyframes arrow-movement {
  0% {
    opacity: 0;
    top: 85%;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes arrow-movement {
  0% {
    opacity: 0;
    top: 85%;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

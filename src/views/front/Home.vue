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
  <div class="homeMainSection grid grid-cols-3 pt-24 pb-36 relative">
    <img
      class="homeMainSection__flower flower-white-pink"
      src="@/assets/images/flower-white-pink.svg"
      alt="花瓣"
    />
    <img
      class="homeMainSection__flower flower-white-pink-2"
      src="@/assets/images/flower-white-pink.svg"
      alt="花瓣"
    />
    <img
      class="homeMainSection__flower flower-white-red"
      src="@/assets/images/flower-white-red.svg"
      alt="花瓣"
    />
    <img
      class="homeMainSection__flower flower-white-red-2"
      src="@/assets/images/flower-white-red.svg"
      alt="花瓣"
    />
    <img
      class="homeMainSection__flower flower-white-red-3"
      src="@/assets/images/flower-white-red.svg"
      alt="花瓣"
    />
    <img
      class="homeMainSection__flower flower-blue"
      src="@/assets/images/flower-blue.svg"
      alt="花瓣"
    />
    <img
      class="homeMainSection__flower flower-blue-2"
      src="@/assets/images/flower-blue.svg"
      alt="花瓣"
    />
    <img
      class="homeMainSection__flower flower-yellow"
      src="@/assets/images/flower-yellow.svg"
      alt="花瓣"
    />
    <img
      class="homeMainSection__flower flower-yellow-2"
      src="@/assets/images/flower-yellow.svg"
      alt="花瓣"
    />
    <img
      class="homeMainSection__flower flower-yellow-3"
      src="@/assets/images/flower-yellow.svg"
      alt="花瓣"
    />
    <div class="col-start-2 col-span-1">
      <div class="bg-primaryLight">
        <img
          class="w-full h-full"
          src="@/assets/images/boabolyLogo.svg"
          alt="face"
        />
        <div class="homeBannerCircle"></div>
      </div>
    </div>
    <div class="arrow arrow-1"></div>
    <div class="arrow arrow-2"></div>
  </div>
  <ArtSlider />
  <HomeSlider />
  <div class="relative px-4 bg-white py-24">
    <h4 class="text-xl text-black font-bold uppercase text-center mb-1">
      popular Products
    </h4>
    <h3 class="text-2xl text-black font-medium text-center mb-8">熱門商品</h3>
    <div class="grid grid-cols-5 p-5 gap-4">
      <div
        class="col-span-1 flex justify-center relative items-start pt-24 px-4"
      >
        <div class="homeBoabolyPen w-100 sticky top-32">
          <p
            class="homeBoabolyPen__txt text-center text-xl font-medium text-black mb-12"
          >
            希望你會喜歡
          </p>
          <img
            class="w-100 mb-2"
            src="@/assets/images/img-boaboly-pen.svg"
            alt="Boaboly圖片"
          />
          <router-link
            :to="{ name: 'ProductList' }"
            class="homeBoabolyPen__btn block py-6 px-4 text-center bg-black text-white font-bold"
            >VIEW MORE</router-link
          >
        </div>
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
<style lang="scss" scoped>
.homeMainSection__flower {
  position: absolute;
  width: 4rem;
  z-index: 1;

  &.flower-white-pink {
    top: 36%;
    left: 24%;
    animation: rotate-left 4s linear infinite;
  }
  &.flower-white-pink-2 {
    top: 44%;
    right: 12%;
    animation: rotate-right 4s linear infinite;
  }
  &.flower-white-red {
    top: 12%;
    left: 10%;
    animation: rotate-right 4s linear infinite;
  }
  &.flower-white-red-2 {
    bottom: 18%;
    right: 32%;
    animation: rotate-right 4s linear infinite;
  }
  &.flower-white-red-3 {
    top: 4%;
    right: 20%;
    z-index: 1;
    animation: rotate-left 4s linear infinite;
  }
  &.flower-blue {
    bottom: 12%;
    left: 14%;
    animation: rotate-right 4s linear infinite;
  }
  &.flower-blue-2 {
    top: 10%;
    right: 40%;
    animation: rotate-right 4s linear infinite;
  }
  &.flower-yellow {
    bottom: 40%;
    left: 2%;
    animation: rotate-left 4s linear infinite;
  }
  &.flower-yellow-2 {
    top: 0%;
    left: 30%;
    animation: rotate-left 4s linear infinite;
  }
  &.flower-yellow-3 {
    bottom: 12%;
    right: 4%;
    animation: rotate-left 4s linear infinite;
  }
}
@keyframes rotate-right {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotate-left {
  0% {
    transform: rotate(360deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.homeBoabolyPen {
  &__txt {
    position: relative;
    -webkit-animation: pen-txt-bar 2s ease-in-out infinite;
    animation: pen-txt-bar 2s ease-in-out infinite;
    &::before {
      content: '';
      position: absolute;
      left: -2rem;
      bottom: -1rem;
      width: 3rem;
      height: 0.25rem;
      background-color: black;
      transform: rotate(-115deg);
    }
    &::after {
      content: '';
      position: absolute;
      right: -2rem;
      bottom: -1rem;
      width: 3rem;
      height: 0.25rem;
      background-color: black;
      transform: rotate(115deg);
    }
  }
  &__btn {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 1.5rem;
      left: 2rem;
      width: 0%;
      height: 2px;
      background-color: white;
      transition: all 0.3s;
    }
    &:hover {
      &::after {
        width: calc(100% - 4rem);
      }
    }
  }
}
@keyframes pen-txt-bar {
  0% {
    bottom: 0rem;
  }
  50% {
    bottom: -1rem;
  }
  100% {
    bottom: 0rem;
  }
}

.arrow {
  position: absolute;
  left: calc(50% - 1rem);
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
.homeBannerCircle {
  .loading span:first-of-type {
    width: 50px;
    height: 50px;
    margin: 30px auto;
    display: block;
    background-color: #ddd;
    border: 5px var(--color-black) solid;
    border-right-color: transparent;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    animation: black-circle 1s linear infinite reverse;
    -webkit-animation: black-circle 1s linear infinite reverse;
  }

  @keyframes black-circle {
    100% {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
    }
  }
}
</style>

<script>
import { ref, computed, onMounted } from 'vue';
import ProductListItemSquare from '@/components/front/ProductListItemSquare.vue';
import HomeMainBanner from '@/components/front/HomeMainBanner.vue';
import CharactorsSlider from '@/components/front/CharactorsSlider.vue';
import ArtSlider from '@/components/front/ArtSlider.vue';
import { productStore } from '@/stores/productStore';

export default {
  components: {
    ProductListItemSquare,
    HomeMainBanner,
    CharactorsSlider,
    ArtSlider,
  },
  setup() {
    const productsData = productStore();
    const fullWidth = ref(window.innerWidth);
    const swiperNum1 = computed(() => {
      if (fullWidth.value >= 1280) {
        return 4;
      } else if (fullWidth.value < 1280 && fullWidth.value > 767) {
        return 3;
      } else {
        return 2;
      }
    });
    const swiperNum2 = computed(() => {
      if (fullWidth.value >= 1280) {
        return 3;
      } else {
        return 2;
      }
    });
    onMounted(() => {
      window.onresize = () => {
        fullWidth.value = window.innerWidth;
      };
    });
    productsData.getHotProducts();
    return {
      productsData,
      swiperNum1,
      swiperNum2,
    };
  },
};
</script>

<template>
  <HomeMainBanner />
  <div class="md:mb-36 mb-24 mt-24 relative">
    <h4 class="text-center font-bold text-lg text-black mb-4">NEW WORKS</h4>
    <h3 class="text-center font-bold text-4xl text-black mb-16">
      最新圖文創作
    </h3>
    <ArtSlider :swiper-num="swiperNum1" />
  </div>
  <CharactorsSlider :swiper-num="swiperNum2" />
  <div
    class="grid grid-cols-5 lg:px-12 px-4 md:py-36 py-24 gap-4 relative bg-white border-b border-gray-300"
  >
    <div
      class="col-span-1 relative md:pt-24 xl:px-16 lg:px-8 md:px-4 md:block hidden"
    >
      <div class="homeBoabolyPen sticky top-32 flex flex-col justify-center">
        <p
          class="homeBoabolyPen__txt text-center lg:text-xl text-sm font-medium text-black mb-12"
        >
          希望你會喜歡
        </p>
        <img
          class="mb-2"
          src="@/assets/images/img-boaboly-pen.svg"
          alt="Boaboly圖片"
        />
        <RouterLink
          :to="{ name: 'ProductList' }"
          class="homeBoabolyPen__btn block lg:text-xl text-sm lg:py-6 lg:px-4 px-2 py-4 text-center bg-black text-white font-bold"
          >VIEW MORE</RouterLink
        >
      </div>
    </div>
    <div class="md:col-start-2 md:col-span-4 col-span-5">
      <h4 class="text-center font-bold text-lg text-black mb-4">
        popular Products
      </h4>
      <h3 class="text-center font-bold text-4xl text-black mb-16">熱門商品</h3>
      <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        <template
          v-for="(product, index) in productsData.hotProducts"
          :key="product.id"
        >
          <ProductListItemSquare
            :class="{
              'md:border-none border-b border-gray-300':
                index < productsData.hotProducts.length - 1,
            }"
            :product="product"
            :collection-list="productsData.collections"
          />
        </template>
      </div>
    </div>
  </div>
  <div class="lg:px-48 md:px-24 px-8 py-24 grid grid-col-1 gap-y-12">
    <div
      class="flex md:flex-row flex-col justify-end items-center gap-x-8 goBackListBtn"
    >
      <a
        target="_brank"
        href="https://shopee.tw/boaboly.art"
        class="xl:text-3xl text-xl font-bold py-8 md:px-0 px-8"
        ><i class="bi bi-shop mr-2"></i>GO TO SHOPEE STORE</a
      >
      <a
        target="_brank"
        href="https://shopee.tw/boaboly.art"
        class="goToArrow"
      ></a>
    </div>
    <div
      class="flex md:flex-row flex-col justify-end items-center gap-x-8 goBackListBtn"
    >
      <a
        target="_brank"
        href="https://www.pinkoi.com/store/boaboly"
        class="xl:text-3xl text-xl font-bold py-8 md:px-0 px-8"
        ><i class="bi bi-shop mr-2"></i>GO TO PINKOI STORE</a
      >
      <a
        target="_brank"
        href="https://www.pinkoi.com/store/boaboly"
        class="goToArrow"
      ></a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.homeBoabolyPen {
  &__txt {
    position: relative;
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
    animation: black-circle 1s linear infinite reverse;
  }

  @keyframes black-circle {
    100% {
      transform: rotate(360deg);
    }
  }
}
.goToArrow {
  position: relative;
  width: 200px;
  height: 36px;
  // @media (max-width: 767.98px) {
  //   width: 100px;
  // }
  cursor: pointer;
  transition: 0.5s;
  overflow: hidden;
}
.goToArrow:after {
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
.goToArrow:before {
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
.goToArrow:before {
  animation: aniArrow01 2s cubic-bezier(0, 0.6, 1, 0.4) infinite 2s;
}
.goToArrow:after {
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

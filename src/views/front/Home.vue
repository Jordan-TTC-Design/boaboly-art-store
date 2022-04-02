<script>
import { ref } from 'vue';
import { frontApiMethod } from '@/methods/api.js';
import ProductListItemSquare from '@/components/front/ProductListItemSquare.vue';
import HomeMainBanner from '@/components/front/HomeMainBanner.vue';
import CharactorsSlider from '@/components/front/CharactorsSlider.vue';
import ArtSlider from '@/components/front/ArtSlider.vue';
import emitter from '@/methods/emitter';

export default {
  components: {
    ProductListItemSquare,
    HomeMainBanner,
    CharactorsSlider,
    ArtSlider,
  },
  setup() {
    const productList = ref([]);
    const collecitonList = ref([]);
    function getProduct() {
      emitter.emit('open-loading');
      frontApiMethod.getProductAll().then((res) => {
        if (res) {
          productList.value = JSON.parse(JSON.stringify(res)).filter(
            (item) => item.promoted.star > 0
          );
          emitter.emit('close-loading');
        }
      });
    }
    function checkCollection(data) {
      collecitonList.value = data;
    }
    emitter.on('check-collection', (data) => {
      checkCollection(data);
    });
    getProduct();
    return {
      productList,
      collecitonList,
      getProduct,
      emitter,
    };
  },
};
</script>
<template>
  <HomeMainBanner />
  <div class="pb-48 mt-24 relative">
    <h4 class="text-center font-bold text-lg text-black mb-4">NEW WORKS</h4>
    <h3 class="text-center font-bold text-4xl text-black mb-16">
      最新圖文創作
    </h3>
    <ArtSlider />
  </div>
  <CharactorsSlider />
  <div
    class="grid grid-cols-5 px-12 py-24 gap-4 relative bg-white border-b border-gray-300"
  >
    <div class="col-span-1 flex justify-center relative items-start pt-24 px-4">
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
      <h4 class="text-center font-bold text-lg text-black mb-4">
        popular Products
      </h4>
      <h3 class="text-center font-bold text-4xl text-black mb-16">熱門商品</h3>
      <div class="grid grid-cols-3 gap-4">
        <template v-for="product in productList" :key="product.id">
          <ProductListItemSquare
            :product="product"
            :colleciton-list="collecitonList"
            :is_collection="collecitonList.indexOf(product.id)"
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
  <div class="px-48 py-24 grid grid-col-1 gap-y-12">
    <div class="flex justify-end items-center gap-x-8 goBackListBtn">
      <a
        target="_brank"
        href="https://shopee.tw/boaboly.art"
        class="text-3xl font-bold py-8"
        ><i class="bi bi-shop mr-2"></i>GO TO SHOPEE STORE</a
      >
      <a
        target="_brank"
        href="https://shopee.tw/boaboly.art"
        class="goToArrow"
      ></a>
    </div>
    <div class="flex justify-end items-center gap-x-8 goBackListBtn">
      <a
        target="_brank"
        href="https://www.pinkoi.com/store/boaboly"
        class="text-3xl font-bold py-8"
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
.goToArrow {
  position: relative;
  width: 200px;
  height: 36px;
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

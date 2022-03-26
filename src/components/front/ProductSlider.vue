<script>
import { ref } from 'vue';
import { frontApiMethod } from '@/methods/api.js';
import emitter from '@/methods/emitter';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Autoplay } from 'swiper';
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  emits: ['send-product-id'],
  setup() {
    const modules = ref([Autoplay]);
    const productList = ref([]);
    function getProducts() {
      emitter.emit('open-loading');
      frontApiMethod.getProducts().then((res) => {
        productList.value = JSON.parse(JSON.stringify(res));
        emitter.emit('close-loading');
      });
    }
    getProducts();
    return {
      productList,
      modules,
      emitter,
    };
  },
};
</script>
<template>
  <div class="relative">
    <div class="swiperBox">
      <swiper
        :slides-per-view="3"
        :modules="modules"
        :speed="3000"
        :loop="true"
        :autoplay="{
          delay: 1,
          disableOnInteraction: false,
        }"
      >
        <swiper-slide
          v-for="productItem in productList"
          :key="productItem.id"
          class="px-8 sliderItem group"
        >
          <div
            @click="$emit('send-product-id', productItem.id)"
            class="relative cursor-pointer"
          >
            <img
              class="w-100"
              :src="productItem.imageUrl"
              :alt="`${productItem.title}商品圖片`"
            />
            <div
              class="flex justify-between py-3 border-b border-gray-300 gap-x-3 underLineHover"
            >
              <p class="text-gray-600 group-hover:text-black">
                {{ productItem.category }}
              </p>
            </div>
            <div class="flex justify-between py-3 gap-x-3">
              <p class="text-gray-600 group-hover:text-black">
                {{ productItem.title }}
              </p>
              <p class="flex-shrink-0 text-gray-600 group-hover:text-black">
                NT$ {{ productItem.price }}
              </p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<style lang="scss" scoped>
// 搭配上freemode
.swiper-free-mode > .swiper-wrapper {
  -webkit-transition-timing-function: linear;
  -o-transition-timing-function: linear;
  transition-timing-function: linear;
  margin: 0 auto;
}
.viewMoreBtn {
  font-size: 1.5rem;
  font-weight: 500;
  transition: all 0.3s;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.group:hover {
  overflow: hidden;
  .viewMoreBtn {
    bottom: 1rem;
  }
}
.sliderItem {
  .underLineHover {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 0%;
      height: 1px;
      background-color: black;
      transition: all 0.3s;
      z-index: 1px;
    }
  }
  &:hover {
    .underLineHover::after {
      width: 100%;
    }
  }
}
</style>

<script>
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Autoplay } from 'swiper';
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ['swiper-num', 'product-list'],
  setup(props) {
    const modules = ref([Autoplay]);
    const productList = computed(() => props.productList);
    return {
      productList,
      modules,
    };
  },
};
</script>

<template>
  <div class="relative">
    <div class="swiperBox">
      <Swiper
        :slides-per-view="swiperNum"
        :modules="modules"
        :speed="3000"
        :loop="true"
        :autoplay="{
          delay: 1,
          disableOnInteraction: false,
        }"
      >
        <Swiper-slide
          v-for="productItem in productList"
          :key="productItem.id"
          class="px-8 sliderItem group"
        >
          <RouterLink :to="productItem.id" class="relative cursor-pointer">
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
          </RouterLink>
        </Swiper-slide>
      </Swiper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

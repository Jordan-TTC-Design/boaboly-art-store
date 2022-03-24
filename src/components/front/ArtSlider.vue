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
  setup() {
    const modules = ref([Autoplay]);
    const artList = ref([]);
    const pagination = ref({});
    function getArt() {
      emitter.emit('open-loading');
      frontApiMethod.getArts().then((res) => {
        if (res.success) {
          artList.value = JSON.parse(JSON.stringify(res.articles));
          pagination.value = JSON.parse(JSON.stringify(res.pagination));
          console.log(artList.value);
          console.log(pagination.value);
          emitter.emit('close-loading');
        }
      });
    }
    getArt();
    return {
      artList,
      modules,
      emitter,
    };
  },
};
</script>
<template>
  <div class="pb-64 mt-24 relative slider">
    <h4 class="text-center font-bold text-lg text-black mb-4">NEW WORKS</h4>
    <h3 class="text-center font-bold text-4xl text-black mb-16">
      最新圖文創作
    </h3>
    <div class="swiperBox">
      <swiper
        :slides-per-view="4"
        :loop="true"
        :modules="modules"
        :speed="2000"
        :free-mode="true"
        :autoplay="{
          delay: 1,
          disableOnInteraction: false,
        }"
        class=""
      >
        <swiper-slide
          v-for="artItem in artList"
          :key="artItem.id"
          class="px-8 group slider__item"
        >
          <router-link
            :to="`/arts/${artItem.id}`"
            class="flex justify-center relative"
          >
            <img class="w-100" :src="artItem.imagesUrl[0]" alt="face" />
            <div
              class="absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center opacity-0 group-hover:opacity-100"
            >
              <p class="text-white font-medium text-lg">{{ artItem.title }}</p>
              <div class="viewMoreBtn">
                <p class="text-white font-medium text-lg text-center mt-2">
                  VIEW MORE
                </p>
              </div>
            </div>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.slider {
  transform: translate3d(0, 0, 0);
  overflow: hidden;
}

.slider__item {
  transform: translate3d(0, 0, 0);
}
.swiperBox {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -12%;
    bottom: -12%;
    left: 8%;
    right: 8%;
    background-color: #f7f7f7;
  }
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
</style>

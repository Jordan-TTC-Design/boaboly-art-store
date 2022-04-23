<script>
import { ref } from 'vue';
import { frontApiMethod } from '@/methods/api.js';
import emitter from '@/methods/emitter';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Autoplay, FreeMode } from 'swiper';
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ['swiper-num'],
  setup() {
    const modules = ref([Autoplay, FreeMode]);
    const artList = ref([]);
    function getArts() {
      emitter.emit('open-loading');
      frontApiMethod.getArts().then((res) => {
        if (res.success) {
          artList.value = JSON.parse(JSON.stringify(res.articles));
          emitter.emit('close-loading');
        }
      });
    }
    getArts();
    return {
      artList,
      modules,
      emitter,
    };
  },
};
</script>

<template>
  <div class="swiperBox">
    <swiper
      :slides-per-view="swiperNum"
      :modules="modules"
      :speed="4000"
      :free-mode="true"
      :loop="true"
      :autoplay="{
        delay: 1,
        reverseDirection: true,
        disableOnInteraction: false,
      }"
    >
      <swiper-slide
        v-for="artItem in artList"
        :key="artItem.id"
        class="px-8 group"
      >
        <RouterLink
          :to="`/arts/${artItem.id}`"
          class="flex justify-center relative"
        >
          <img class="w-100" :src="artItem.imagesUrl[0]" alt="face" />
          <div
            class="absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center opacity-0 group-hover:opacity-100 px-3"
          >
            <p
              class="text-white font-medium text-lg text-center md:inline-block hidden"
            >
              {{ artItem.title }}
            </p>
            <div class="seeMore">
              <p class="text-white font-medium text-lg text-center mt-2">
                VIEW MORE
              </p>
            </div>
          </div>
        </RouterLink>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss">
// 搭配上freemode
.swiper-free-mode > .swiper-wrapper {
  transition-timing-function: linear;
  margin: 0 auto;
}
.seeMore {
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
  .seeMore {
    bottom: 1rem;
  }
}
</style>

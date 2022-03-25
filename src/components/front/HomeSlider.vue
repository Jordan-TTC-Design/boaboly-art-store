<script>
import { ref } from 'vue';
import emitter from '@/methods/emitter';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Autoplay, FreeMode } from 'swiper';
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const swiperNum = ref(1);
    const swiperDetail = ref({
      autoPlay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: swiperNum.value,
    });
    const modules = ref([Autoplay, FreeMode]);
    return {
      swiperNum,
      swiperDetail,
      modules,
      emitter,
    };
  },
};
</script>
<template>
  <div class="sectionCharactor bg-gray-100 grid grid-cols-3 py-36 relative">
    <h3 class="sectionCharactor__bgWord sectionCharactor__bgWord--top">
      BOABOLY
    </h3>
    <div class="col-start-1 flex justify-start items-start">
      <div class="bg-black py-4 pl-5 pr-12 ml-8">
        <h3 class="text-3xl text-white font-bold">寶莉角色</h3>
      </div>
    </div>
    <div class="col-start-2 col-span-2">
      <div class="charactorList">
        <swiper
          :slides-per-view="3"
          :space-between="50"
          :loop="true"
          :free-mode="true"
          :modules="modules"
          :speed="6000"
          :autoplay="{
            delay: 1,
            disableOnInteraction: false,
          }"
        >
          <swiper-slide>
            <div class="charactorList__item">
              <p class="charactorList__item__number">001</p>
              <img
                class="charactorList__item__img"
                src="@/assets/images/img-charactor-men.svg"
                alt="face"
              />
              <p class="charactorList__item__name">寶莉</p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="charactorList__item">
              <p class="charactorList__item__number">002</p>
              <img
                class="charactorList__item__img"
                src="@/assets/images/img-charactor-dog.svg"
                alt="face"
              />
              <p class="charactorList__item__name">汪丸</p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="charactorList__item">
              <p class="charactorList__item__number">003</p>
              <img
                class="charactorList__item__img"
                src="@/assets/images/img-charactor-cat.svg"
                alt="face"
              />
              <p class="charactorList__item__name">咪拉</p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="charactorList__item">
              <p class="charactorList__item__number">004</p>
              <img
                class="charactorList__item__img"
                src="@/assets/images/img-charactor-panda.svg"
                alt="face"
              />
              <p class="charactorList__item__name">潘弟</p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="charactorList__item">
              <p class="charactorList__item__number">005</p>
              <img
                class="charactorList__item__img"
                src="@/assets/images/img-charactor-squirrel.svg"
                alt="face"
              />
              <p class="charactorList__item__name">鼠吉</p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="charactorList__item">
              <p class="charactorList__item__number">006</p>
              <img
                class="charactorList__item__img"
                src="@/assets/images/img-charactor-ghost.svg"
                alt="face"
              />
              <p class="charactorList__item__name">晴子</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <h3 class="sectionCharactor__bgWord sectionCharactor__bgWord--bottom">
      CHARACTORS
    </h3>
  </div>
</template>
<style lang="scss">
.sectionCharactor {
  overflow: hidden;
  &__bgWord {
    position: absolute;
    font-size: 8rem;
    font-weight: bold;
    letter-spacing: 1rem;
    &--top {
      top: -4rem;
      left: 2rem;
    }
    &--bottom {
      bottom: -4rem;
      right: 2rem;
    }
  }
}
.charactorList__item {
  padding: 0.5rem;
  &__number,
  &__name {
    font-weight: bold;
    color: var(--black);
    font-size: 1.5rem;
  }
  &__img {
    width: 100%;
    margin: 0.5rem 0;
  }
  &__name {
    text-align: center;
    position: relative;
    padding-top: 1.5rem;
    &::before {
      content: '';
      width: 0.25rem;
      height: 1rem;
      background-color: var(--black);
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>

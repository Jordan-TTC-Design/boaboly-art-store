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
  props: ['swiper-num'],
  setup() {
    const modules = ref([Autoplay, FreeMode]);
    return {
      modules,
      emitter,
    };
  },
};
</script>
<template>
  <div
    class="sectionCharactor bg-gray-100 grid md:grid-cols-3 grid-cols-1 md:py-36 py-24 gap-y-12 relative"
  >
    <h3 class="sectionCharactor__bgWord sectionCharactor__bgWord--top">
      BOABOLY
    </h3>
    <div
      class="col-start-1 flex md:justify-start justify-center items-start px-8"
    >
      <div class="bg-black py-4 md:pl-5 md:pr-12 px-8">
        <h3 class="text-3xl text-white font-bold">寶莉角色</h3>
      </div>
    </div>
    <div class="md:col-start-2 md:col-span-2">
      <div class="charactorList">
        <swiper
          :slides-per-view="swiperNum"
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
                alt="角色寶莉"
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
                alt="角色汪丸"
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
                alt="角色咪拉"
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
                alt="角色潘弟"
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
                alt="角色鼠吉"
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
                alt="角色晴子"
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
    @media (max-width: 767.98px) {
      font-size: 4rem;
      letter-spacing: 0.25rem;
      &--top {
        top: -2rem;
      }
      &--bottom {
        bottom: -2rem;
      }
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

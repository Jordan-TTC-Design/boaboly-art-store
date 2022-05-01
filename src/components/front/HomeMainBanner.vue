<script>
import { ref, onMounted } from 'vue';
import { statusStore } from '@/stores/statusStore';

export default {
  setup() {
    const statusData = statusStore();
    const homeMainBanner = ref(null);
    const homeMainBannerHeight = ref(0);
    const flowerImgData = ref([
      {
        name: 'flower-white-pink',
        imgUrl: 'flower-white-pink',
      },
      {
        name: 'flower-white-pink-2',
        imgUrl: 'flower-white-pink',
      },
      {
        name: 'flower-white-red',
        imgUrl: 'flower-white-red',
      },
      {
        name: 'flower-white-red-2',
        imgUrl: 'flower-white-red',
      },
      {
        name: 'flower-white-red-3',
        imgUrl: 'flower-white-red',
      },
      {
        name: 'flower-blue',
        imgUrl: 'flower-blue',
      },
      {
        name: 'flower-blue-2',
        imgUrl: 'flower-blue',
      },
      {
        name: 'flower-yellow',
        imgUrl: 'flower-yellow',
      },
      {
        name: 'flower-yellow-2',
        imgUrl: 'flower-yellow',
      },
      {
        name: 'flower-yellow-3',
        imgUrl: 'flower-yellow',
      },
    ]);
    function goToSection() {
      statusData.mainContainer.scrollTo({
        top: homeMainBannerHeight.value + 100,
        behavior: 'smooth',
      });
    }
    onMounted(() => {
      setTimeout(() => {
        homeMainBannerHeight.value = homeMainBanner.value.clientHeight;
      }, 100);
    });
    return {
      homeMainBanner,
      flowerImgData,
      goToSection,
    };
  },
};
</script>

<template>
  <div
    ref="homeMainBanner"
    class="homeMainBanner grid md:grid-cols-3 grid-cols-1 py-36 md:px-0 px-12 relative"
  >
    <template v-for="flower in flowerImgData" :key="flower.name">
      <img
        :class="flower.name"
        class="homeMainBanner__flower"
        :src="`@/assets/images/${flower.imgUrl}.svg`"
        alt="花瓣"
    /></template>
    <div class="md:col-start-2 col-span-1">
      <div class="bg-primaryLight">
        <img
          class="w-full h-full"
          src="@/assets/images/boabolyLogo.svg"
          alt="face"
        />
        <div class="homeBannerCircle"></div>
      </div>
    </div>
    <div @click="goToSection" class="goToArrowBox">
      <div class="arrow arrow-1"></div>
      <div class="arrow arrow-2"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.homeMainBanner__flower {
  position: absolute;
  width: 4rem;
  @media (max-width: 1199.98px) {
    width: 3rem;
  }
  @media (max-width: 767.98px) {
    width: 2rem;
  }
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
.goToArrowBox {
  position: absolute;
  left: calc(50% - 1rem);
  bottom: 5%;
  height: 120px;
  padding: 0 1rem;
  cursor: pointer;
}
.arrow {
  position: absolute;
  left: calc(50% - 1rem);
  top: 100%;
  transform-origin: 50% 50%;
  transform: translate3d(-50%, -50%, 0);
}

.arrow-1 {
  animation: arrow-movement 2s ease-in-out infinite;
}

.arrow-2 {
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
  transform: rotate(45deg) translateX(-16%);
  transform-origin: top left;
}

.arrow:after {
  transform: rotate(-45deg) translateX(16%);
  transform-origin: top right;
}

@keyframes arrow-movement {
  0% {
    opacity: 0;
    top: 70%;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

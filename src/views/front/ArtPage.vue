<script>
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { frontApiMethod } from '@/methods/api.js';
import emitter from '@/methods/emitter';
import { changeTime } from '@/methods/filter';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const articleId = computed(() => route.params.id);
    const artItem = ref({});
    const artList = ref([]);
    const pagination = ref({});
    function getArt(itemId) {
      emitter.emit('open-loading');
      frontApiMethod.getArt(itemId).then((res) => {
        artItem.value = res;
        getArts();
      });
    }
    function getArts() {
      frontApiMethod.getArts().then((res) => {
        artList.value = JSON.parse(JSON.stringify(res.articles));
        pagination.value = JSON.parse(JSON.stringify(res.pagination));
        emitter.emit('close-loading');
      });
    }
    function toOtherSamePage(itemId) {
      router.push(`/arts/${itemId}`);
    }
    watch(articleId, () => {
      getArt(articleId.value);
    });
    getArt(articleId.value);
    return {
      artItem,
      artList,
      changeTime,
      toOtherSamePage,
    };
  },
};
</script>
<template>
  <div class="bg-gray-100 relative md:py-16 pt-4 pb-16 min-h-screen">
    <div class="bg-primaryLight w-full h-96 absolute top-0"></div>
    <div
      class="sm:container sm:mx-auto mx-4 bg-white shadow-sm lg:p-24 md:p-12 p-8 pb-24"
    >
      <div
        class="grid md:grid-cols-2 grid-cols-1 gap-8 relative mb-24 pb-12 border-b border-gray-300"
      >
        <div>
          <div class="artContentBox">
            <h2 class="text-3xl font-bold mb-4">{{ artItem.title }}</h2>
            <div class="flex items-center mb-12 pb-12 border-b border-gray-300">
              <p class="border border-gray-300 py-0.5 px-2 mr-2">
                {{ artItem.category }}
              </p>
              <p class="text-gray-500">{{ changeTime(artItem.create_at) }}</p>
            </div>
            <div
              v-html="artItem.content"
              class="artContentBox__content mb-3"
            ></div>
            <div class="flex gap-x-2 text-gray-500">
              <p v-for="tag in artItem.tags" :key="tag">#{{ tag }}</p>
            </div>
          </div>
        </div>
        <div>
          <img
            v-for="(imageUrl, index) in artItem.imagesUrl"
            :key="imageUrl"
            :src="imageUrl"
            :alt="`${artItem.title}圖片-${index}`"
          />
        </div>
      </div>
      <h4 class="mb-12 text-center text-3xl font-bold text-black">其他創作</h4>
      <ul class="grid grid-cols-1 gap-4 mb-24">
        <template v-for="(art, index) in artList" :key="art.id">
          <li
            v-if="index < 3"
            class="otherArtItem flex md:flex-row flex-col justify-between items-center pb-4 group border-b border-gray-line"
          >
            <div class="flex md:flex-row flex-col items-center">
              <img
                class="md:w-40 w-64 group-hover:bg-gray-100 p-4"
                :src="art.imagesUrl[0]"
                :alt="`文章圖片${index}`"
                @click="toOtherSamePage(art.id)"
              />
              <div class="p-6">
                <p
                  class="text-xl font-medium text-black mb-2"
                  @click="toOtherSamePage(art.id)"
                >
                  {{ art.title }}
                </p>
                <div class="flex gap-x-2 text-gray-500 mb-4">
                  <p v-for="tag in artItem.tags" :key="tag">#{{ tag }}</p>
                </div>
                <p class="text-gray-500">{{ changeTime(artItem.create_at) }}</p>
              </div>
            </div>
            <button
              type="button"
              @click="toOtherSamePage(art.id)"
              class="viewMoreBtn font-medium text-black self-end mb-2 md:block hidden"
            >
              VIEW MORE
            </button>
          </li>
        </template>
      </ul>
      <div
        class="flex md:flex-row flex-col justify-end items-center gap-x-8 px-12"
      >
        <RouterLink to="/arts" class="lg:text-3xl tex-xl font-bold"
          >BACK TO WORKS</RouterLink
        >
        <RouterLink to="/arts" class="arrow" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.artContentBox {
  position: sticky;
  top: 8rem;
  height: auto;
  background-color: #fff;
  &__content {
    max-height: 360px;
    overflow-y: auto;
  }
}
.otherArtItem {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 0%;
    height: 1px;
    background-color: black;
    transition: all 0.3s;
  }
  .viewMoreBtn {
    transition: all 0.3s;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      right: 0;
      width: 0%;
      height: 2px;
      background-color: black;
      transition: all 0.3s;
    }
  }
  &:hover {
    &::after {
      width: 100%;
    }
    .viewMoreBtn::after {
      width: 100%;
    }
  }
}
.arrow {
  position: relative;
  width: 200px;
  height: 36px;
  cursor: pointer;
  transition: 0.5s;
  overflow: hidden;
}

.arrow:after {
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

.arrow:before {
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
.arrow:before {
  animation: aniArrow01 2s cubic-bezier(0, 0.6, 1, 0.4) infinite 2s;
}

.arrow:after {
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

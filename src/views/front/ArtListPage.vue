<script>
import { ref } from 'vue';
import { frontApiMethod } from '@/methods/api.js';
import ArtListItemSquare from '@/components/front/ArtListItemSquare.vue';
import emitter from '@/methods/emitter';

export default {
  components: {
    ArtListItemSquare,
  },
  setup() {
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
      emitter,
    };
  },
};
</script>
<template>
  <div class="relative bg-white grid grid-cols-12 px-16 py-32">
    <div class="col-start-2 col-span-10 pb-32">
      <h4 class="text-xl text-black uppercase mb-8">All Works</h4>
      <h3 class="text-8xl text-black font-medium mb-16">全部創作</h3>
      <div class="flex gap-8">
        <div class="w-full">
          <input
            class="appearance-none bg-transparent border-b border-gray-300 w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none"
            type="text"
            id="inputSearch"
            placeholder="搜尋關鍵字"
          />
        </div>
        <div class="w-full">
          <input
            class="appearance-none bg-transparent border-b border-gray-300 w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none"
            type="text"
            id="inputSearch"
            placeholder="搜尋關鍵字"
          />
        </div>
      </div>
    </div>
    <div class="col-start-2 col-span-10 grid grid-cols-2 gap-x-4">
      <template v-for="(art, index) in artList" :key="art.id">
        <ArtListItemSquare :art-item="art" :list-index="index" />
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
// * {
//   outline: 1px solid red;
// }
</style>

<script>
import { ref, computed } from 'vue';
import { frontApiMethod } from '@/methods/api.js';
import { articleCategory } from '@/methods/article.js';
import ArtListItemSquare from '@/components/front/ArtListItemSquare.vue';
import emitter from '@/methods/emitter';

export default {
  components: {
    ArtListItemSquare,
  },
  setup() {
    const artList = ref([]);
    let filterKeyword = ref('');
    let filterArticleCategory = ref('');
    const artfilterList = computed(() => {
      let array = [];
      array = artList.value;
      array = filterWord(filterKeyword.value, array);
      array = filterCategory(filterArticleCategory.value, array);
      return array;
    });
    function filterWord(filterData, dataList) {
      let array = dataList;
      if (filterData !== '') {
        array = dataList.filter((item) => item.title.includes(filterData));
      }
      return array;
    }
    function filterCategory(filterData, dataList) {
      let array = dataList;
      if (filterData !== '') {
        array = dataList.filter((item) => item.category === filterData);
      }
      return array;
    }
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
      filterKeyword,
      filterArticleCategory,
      articleCategory,
      artfilterList,
      emitter,
    };
  },
};
</script>
<template>
  <div class="relative bg-white grid grid-cols-12 px-16 py-32">
    <div class="col-start-2 col-span-10 pb-32">
      <h4 class="text-xl text-black uppercase mb-8">All Works</h4>
      <h3 class="text-8xl text-black font-medium mb-16">全部圖文創作</h3>
      <div class="flex gap-8">
        <div class="pageInputBox flex-1">
          <input
            class="appearance-none bg-transparent border-b border-gray-300 w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none"
            type="text"
            id="inputSearch"
            placeholder="搜尋關鍵字"
            v-model="filterKeyword"
          />
          <button class="py-1.5 px-2 searchBtn">
            <i class="bi bi-search"></i>
          </button>
          <div class="underLine"></div>
        </div>
        <div class="pageSelectBox flex-1">
          <select
            class="cursor-pointer appearance-none bg-transparent border-b border-gray-300 w-full p-2 leading-tight focus:outline-none"
            id="filterCategory"
            value="modelValue"
            v-model="filterArticleCategory"
          >
            <option selected value="">全部類別</option>
            <template v-for="option in articleCategory" :key="option">
              <option :value="option">{{ option }}</option>
            </template>
          </select>
          <div class="underLine"></div>
        </div>
      </div>
    </div>
    <div class="col-start-2 col-span-10 grid grid-cols-2 gap-x-8">
      <template v-for="(art, index) in artfilterList" :key="art.id">
        <ArtListItemSquare :art-item="art" :list-index="index" />
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.pageSelectBox {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 25%;
    right: 0.5rem;
    width: 1rem;
    height: 1px;
    background-color: black;
    transition: all 0.3s;
  }
  &::after {
    content: '';
    position: absolute;
    top: 25%;
    right: 0.5rem;
    width: 1rem;
    height: 1px;
    background-color: black;
    transform: rotate(90deg);
    transition: all 0.3s;
  }
  &:hover {
    &::before {
      transform: rotate(90deg);
    }
    &::after {
      transform: rotate(180deg);
    }
    .underLine {
      width: 100%;
    }
  }
}
.underLine {
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 0%;
  height: 1px;
  background-color: black;
  transition: all 0.3s;
}
.pageInputBox {
  position: relative;
  &:hover {
    .underLine {
      width: 100%;
    }
  }
  .searchBtn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    color: #646464;
    &:hover {
      color: black;
    }
  }
}
</style>

<script>
import { ref, watch, computed } from 'vue';
import { frontApiMethod } from '@/methods/api.js';
import { articleCategory } from '@/methods/article.js';
import ArtListItemSquare from '@/components/front/ArtListItemSquare.vue';
import Pagination from '@/components/helpers/Pagination.vue';
import SideNav from '@/components/helpers/SideNav.vue';
import emitter from '@/methods/emitter';

export default {
  components: {
    ArtListItemSquare,
    SideNav,
    Pagination,
  },
  setup() {
    const artList = ref([]);
    let filterKeyword = ref('');
    let filterArticleCategory = ref('');
    const paginationData = ref({ totalPages: 1, nowPage: 1 });
    const artfilterList = computed(() => {
      let array = [];
      array = artList.value;
      array = filterWord(filterKeyword.value, array);
      array = filterCategory(filterArticleCategory.value, array);
      console.log(array);
      return array;
    });
    const nowPageArts = computed(() => {
      let array = [];
      if (artfilterList.value.length <= 10) {
        return artfilterList.value;
      } else {
        const pageFrist = paginationData.value.nowPage * 10 - 10;
        artfilterList.value.forEach((item, index) => {
          if (pageFrist <= index && index < paginationData.value.nowPage * 10) {
            array.push(item);
          }
        });
        return array;
      }
    });
    watch(artfilterList, (newValue, oldValue) => {
      if (newValue.length !== oldValue.length) {
        paginationData.value.nowPage = 1;
        paginationData.value.totalPages = Math.ceil(newValue.length / 10);
      }
    });
    watch(paginationData.value, () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    function getArts(pageNum = 1) {
      emitter.emit('open-loading');
      frontApiMethod.getArts(pageNum).then((res) => {
        paginationData.value.totalPages = res.pagination.total_pages;
        res.articles.forEach((item) => {
          artList.value.push(item);
        });
        if (res.pagination.has_next) {
          getArts(res.pagination.current_page + 1);
        }
        emitter.emit('close-loading');
      });
    }
    getArts();
    return {
      filterKeyword,
      filterArticleCategory,
      articleCategory,
      nowPageArts,
      emitter,
      paginationData,
    };
  },
};
</script>
<template>
  <div class="relative bg-white grid grid-cols-12 lg:px-24 px-16 py-32">
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
        <div class="pageSelectBox flex-1 md:hidden">
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
    <div class="col-span-2 relative md:block hidden">
      <div class="sticky top-32">
        <SideNav
          :nav-list="articleCategory"
          @change-side-nav="filterArticleCategory = $event"
          >文章類別</SideNav
        >
      </div>
    </div>
    <div class="col-start-3 col-span-10 grid grid-cols-2 gap-x-8 mb-12">
      <template v-for="(art, index) in nowPageArts" :key="art.id">
        <ArtListItemSquare :art-item="art" :list-index="index" />
      </template>
    </div>
    <div
      class="col-start-3 col-span-10 flex justify-center"
      v-if="paginationData.totalPages >= 2"
    >
      <Pagination
        :pagination-data="paginationData"
        @change-page-number="paginationData.nowPage = $event"
      ></Pagination>
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

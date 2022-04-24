<script>
import { ref, watch, computed } from 'vue';
import { articleCategory } from '@/methods/article.js';
import ArtListItemSquare from '@/components/front/ArtListItemSquare.vue';
import Pagination from '@/components/helpers/Pagination.vue';
import SideNav from '@/components/helpers/SideNav.vue';
import emitter from '@/methods/emitter';
import { artStore } from '@/stores/artStore';

export default {
  components: {
    ArtListItemSquare,
    SideNav,
    Pagination,
  },
  setup() {
    const artData = artStore();
    const filterKeyword = ref('');
    const filterArticleCategory = ref('');
    const artfilterList = computed(() => {
      let array = [];
      array = artData.arts;
      array = filterWord(filterKeyword.value, array);
      array = filterCategory(filterArticleCategory.value, array);
      return array;
    });
    const nowPageArts = computed(() => {
      let array = [];
      if (artfilterList.value.length <= 8) {
        return artfilterList.value;
      } else {
        const pageFrist = artData.pagination.nowPage * 8 - 8;
        artfilterList.value.forEach((item, index) => {
          if (pageFrist <= index && index < artData.pagination.nowPage * 8) {
            array.push(item);
          }
        });
        return array;
      }
    });
    watch(artfilterList, (newValue, oldValue) => {
      if (newValue.length !== oldValue.length) {
        artData.pagination.nowPage = 1;
        artData.pagination.totalPages = Math.ceil(newValue.length / 8);
      }
    });
    watch(artData.pagination, () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    function filterWord(filterData, dataList) {
      let array = dataList;
      if (filterData !== '' && filterData !== undefined) {
        array = dataList.filter(
          (item) =>
            item.title.includes(filterData) || item.tags.includes(filterData)
        );
      }
      return array;
    }
    function filterCategory(filterData, dataList) {
      let array = dataList;
      if (filterData !== '' && filterData !== undefined) {
        array = dataList.filter((item) => item.category === filterData);
      }
      return array;
    }
    artData.getArtList();
    return {
      filterKeyword,
      filterArticleCategory,
      articleCategory,
      nowPageArts,
      emitter,
      artData,
    };
  },
};
</script>

<template>
  <div
    class="relative bg-white grid grid-cols-12 lg:px-24 md:px-16 px-4 md:py-32 py-16 md:gap-x-8 w-full"
  >
    <div class="col-start-2 col-span-10 lg:mb-32 md:mb-24 mb-16">
      <h4 class="text-xl text-black uppercase mb-8">All Works</h4>
      <h3 class="lg:text-8xl text-5xl text-black font-medium md:mb-16 mb-8">
        全部圖文創作
      </h3>
      <div class="flex md:flex-row flex-col md:gap-8 gap-4">
        <div class="pageInputBox flex-1">
          <input
            class="appearance-none bg-transparent border-b border-gray-300 w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none"
            type="text"
            id="inputSearch"
            placeholder="搜尋關鍵字"
            v-model="filterKeyword"
          />
          <button type="button" class="py-1.5 px-2 searchBtn group">
            <i class="bi bi-x text-xl group-hover:text-red-600"></i>
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
    <div class="lg:col-span-2 md:col-span-3 relative md:block hidden">
      <div class="sticky top-32">
        <SideNav
          :nav-list="articleCategory"
          @change-side-nav="filterArticleCategory = $event"
          >文章類別</SideNav
        >
      </div>
    </div>
    <div
      class="lg:col-span-10 md:col-span-9 col-span-12 grid xl:grid-cols-2 grid-cols-1 lg:gap-x-8 mb-8"
    >
      <template v-for="(art, index) in nowPageArts" :key="art.id">
        <ArtListItemSquare :art-item="art" :list-index="index" />
      </template>
    </div>
    <div
      class="lg:col-start-3 md:col-start-4 lg:col-span-10 md:col-span-9 col-span-12 flex justify-center"
      v-if="artData.pagination.totalPages >= 2"
    >
      <Pagination
        :pagination-data="artData.pagination"
        @change-page-number="artData.pagination.nowPage = $event"
      />
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

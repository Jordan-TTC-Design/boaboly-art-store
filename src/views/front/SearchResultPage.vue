<script>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { frontApiMethod } from '@/methods/api.js';
import Pagination from '@/components/helpers/Pagination.vue';
import SideNav from '@/components/helpers/SideNav.vue';
import SearchResultListItem from '@/components/front/SearchResultListItem.vue';
import { statusStore } from '@/stores/statusStore';
export default {
  components: {
    SideNav,
    Pagination,
    SearchResultListItem,
  },
  setup() {
    const statusData = statusStore();
    const route = useRoute();
    let keyword = computed(() => route.query.keyword);
    const allResultList = ref([]);
    const filterKeyword = ref(keyword.value || '');
    const resultCategory = ref('');
    const paginationData = ref({ totalPages: 1, nowPage: 1 });
    const resultfilterList = computed(() => {
      let array = allResultList.value;
      array = filterWord(filterKeyword.value, array);
      array = filterCategory(resultCategory.value, array);
      return array;
    });
    const nowPageItems = computed(() => {
      let array = [];
      if (resultfilterList.value.length <= 12) {
        return resultfilterList.value;
      } else {
        const pageFrist = paginationData.value.nowPage * 12 - 12;
        resultfilterList.value.forEach((item, index) => {
          if (pageFrist <= index && index < paginationData.value.nowPage * 12) {
            array.push(item);
          }
        });
        return array;
      }
    });
    watch(resultfilterList, (newValue, oldValue) => {
      if (newValue.length !== oldValue.length) {
        paginationData.value.nowPage = 1;
        paginationData.value.totalPages = Math.ceil(newValue.length / 12);
      }
    });
    watch(paginationData.value, () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    watch(keyword, (newValue) => {
      filterKeyword.value = newValue;
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
        array = dataList.filter((item) => item.searchCategory === filterData);
      }
      return array;
    }
    function getProducts() {
      statusData.isLoading = true;
      frontApiMethod.getProductAll().then((res) => {
        allResultList.value = JSON.parse(JSON.stringify(res));
        allResultList.value.forEach((item) => (item.searchCategory = '商品'));
        statusData.isLoading = false;
        getArts();
      });
    }
    function getArts(pageNum = 1) {
      statusData.isLoading = true;
      frontApiMethod.getArts(pageNum).then((res) => {
        res.articles.forEach((item) => {
          item.searchCategory = '創作';
          allResultList.value.push(item);
        });
        if (res.pagination.has_next) {
          getArts(res.pagination.current_page + 1);
        }
        statusData.isLoading = false;
        // 打亂順序：避免產品先顯示
        allResultList.value.sort(() => 0.5 - Math.random());
      });
    }
    getProducts();
    return {
      allResultList,
      filterKeyword,
      resultCategory,
      nowPageItems,
      paginationData,
    };
  },
};
</script>

<template>
  <div
    class="relative bg-white grid grid-cols-12 lg:px-24 md:px-16 px-4 md:py-32 py-16 md:gap-x-8 w-full"
  >
    <div class="col-start-2 col-span-10 lg:mb-32 md:mb-24 mb-16">
      <h4 class="text-xl text-black uppercase mb-8">Search</h4>
      <h3 class="lg:text-8xl text-5xl text-black font-medium md:mb-16 mb-8">
        全站搜尋
      </h3>
      <div class="flex md:flex-row flex-col md:gap-8 gap-4">
        <div class="pageInputBox flex-1">
          <input
            class="appearance-none bg-transparent border-b border-gray-300 w-full text-gray-700 p-2 leading-tight focus:outline-none"
            type="text"
            id="inputSearch"
            placeholder="搜尋關鍵字"
            v-model="filterKeyword"
          />
          <button
            type="button"
            class="py-1.5 px-2 searchBtn group"
            @click="filterKeyword = ''"
          >
            <i class="bi bi-x text-xl group-hover:text-red-600"></i>
          </button>
          <div class="underLine"></div>
        </div>
        <div class="pageSelectBox flex-1 md:hidden">
          <select
            class="cursor-pointer appearance-none bg-transparent border-b border-gray-300 w-full p-2 leading-tight focus:outline-none"
            id="filterCategory"
            value="modelValue"
            v-model="resultCategory"
          >
            <option selected value="">全部類別</option>
            <option value="商品">商品</option>
            <option value="創作">創作</option>
          </select>
          <div class="underLine"></div>
        </div>
      </div>
    </div>
    <div class="md:col-span-2 relative md:block hidden">
      <div class="sticky top-32">
        <SideNav
          :nav-list="['商品', '創作']"
          @change-side-nav="resultCategory = $event"
          >搜尋類別</SideNav
        >
      </div>
    </div>
    <div
      class="md:col-span-10 col-span-12 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 lg:gap-x-8 mb-8"
    >
      <template v-for="item in nowPageItems" :key="item.id">
        <SearchResultListItem :result-item="item" />
      </template>
    </div>
    <div
      class="md:col-start-3 md:col-span-10 col-span-12 flex justify-center"
      v-if="paginationData.totalPages > 1"
    >
      <Pagination
        :pagination-data="paginationData"
        @change-page-number="paginationData.nowPage = $event"
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

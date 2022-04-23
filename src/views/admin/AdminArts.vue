<script>
import { ref, computed } from 'vue';
import { apiMethod } from '@/methods/api.js';
import { defaultArticleData, articleCategory } from '@/methods/article.js';
import AdminArtSlider from '@/components/admin/AdminArtSlider.vue';
import RowNav from '@/components/helpers/RowNav.vue';
import AdminArticleListItemSquare from '@/components/admin/AdminArticleListItemSquare.vue';

export default {
  components: {
    AdminArtSlider,
    RowNav,
    AdminArticleListItemSquare,
  },
  setup() {
    const articles = ref([]);
    const listState = ref(1);
    const showed = ref(true);
    const articleList = computed(() => {
      let array = [];
      if (listState.value === 2) {
        array = articles.value.filter((product) => product.isPublic);
      } else if (listState.value === 3) {
        array = articles.value.filter((product) => !product.isPublic);
      } else {
        array = articles.value;
      }
      return array;
    });
    const selectItem = ref(JSON.parse(JSON.stringify(defaultArticleData)));
    const modalState = ref(null);
    function clearItem() {
      modalState.value = null;
      selectItem.value = JSON.parse(JSON.stringify(defaultArticleData));
    }
    function openArticleDetail(state, item) {
      if (state === 'isNew') {
        selectItem.value = JSON.parse(JSON.stringify(defaultArticleData));
      } else if (state === 'edit') {
        selectItem.value = JSON.parse(JSON.stringify(item));
      }
      modalState.value = state;
    }
    function changeArticleState(articleData) {
      apiMethod.adminGetArticle(articleData.id).then((res) => {
        articleData = JSON.parse(JSON.stringify(res));
        articleData.isPublic = !articleData.isPublic;
        updateArticle(articleData.id, articleData);
      });
    }
    async function updateArticle(articleId, articleData) {
      try {
        await apiMethod.adminUpdateArticle(articleId, articleData);
        getArticles();
      } catch (err) {
        console.log(err);
      }
    }
    async function deleteArticle(articleId) {
      try {
        await apiMethod.adminDeleteArticle(articleId);
        getArticles();
      } catch (err) {
        console.log(err);
      }
    }
    function getArticles() {
      apiMethod.adminGetArticles().then((res) => {
        if (res) {
          articles.value = Object.values(res.articles);
        }
      });
    }
    getArticles();
    return {
      articleList,
      listState,
      modalState,
      selectItem,
      showed,
      articleCategory,
      openArticleDetail,
      deleteArticle,
      changeArticleState,
      clearItem,
      getArticles,
    };
  },
};
</script>

<template>
  <div class="relative bg-white">
    <div
      class="sticky top-0 bg-white z-40 px-5 pt-6 border-b border-gray-300 mb-6"
    >
      <div class="grid grid-cols-3 mb-8">
        <div class="col-span-1">
          <h3 class="text-3xl font-medium">文章列表</h3>
        </div>
        <div class="col-span-2 flex justify-end">
          <button
            type="button"
            class="border border-gray-200 rounded py-2 px-3 hover:border-gray-300"
            @click="openArticleDetail('isNew', selectItem)"
          >
            新增文章
          </button>
        </div>
      </div>
      <RowNav
        :list-state="listState"
        :nav-array="['全部文章', '刊登中', '已下架']"
        @return-state="listState = $event"
      />
    </div>
    <div class="grid grid-cols-5 p-5 gap-4">
      <div class="col-span-1 min-h-screen">
        <ul class="mb-6">
          <li class="text-sm text-gray-400 mb-2">文章等級</li>
          <li class="group py-2 px-5 cursor-pointer hover:text-yellow-600">
            <span
              class="w-3 h-px bg-gray-300 block absolute top-1/2 left-0 group-hover:bg-yellow-400"
            ></span
            >一般文章
          </li>
          <li class="group py-2 px-5 cursor-pointer hover:text-yellow-600">
            <span
              class="w-3 h-px bg-gray-300 block absolute top-1/2 left-0 group-hover:bg-yellow-400"
            ></span
            >首頁文章
          </li>
        </ul>
        <ul class="mb-6">
          <li class="text-sm text-gray-400 mb-2">文章類別</li>
          <template v-for="category in articleCategory" :key="category">
            <li
              class="group py-2 px-5 cursor-pointer relative hover:text-yellow-600"
            >
              <span
                class="w-3 h-px bg-gray-300 block absolute top-1/2 left-0 group-hover:bg-yellow-400"
              ></span
              >{{ category }}
            </li>
          </template>
        </ul>
      </div>
      <div class="col-start-2 col-span-4">
        <div class="grid grid-cols-3 gap-4">
          <template v-for="article in articleList" :key="article.id">
            <AdminArticleListItemSquare
              :article="article"
              @change-article-state="changeArticleState"
              @open-article-detail="openArticleDetail"
              @delete-article="deleteArticle"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
  <AdminArtSlider
    :select-item="selectItem"
    :modal-state="modalState"
    @get-article="getArticles"
    @clear-item="clearItem"
  />
</template>

<style lang="scss"></style>

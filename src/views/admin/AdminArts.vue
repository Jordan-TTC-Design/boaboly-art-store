<script>
import { ref, computed } from 'vue';
import { defaultArticleData, articleCategory } from '@/methods/article.js';
import AdminArtSlider from '@/components/admin/AdminArtSlider.vue';
import RowNav from '@/components/helpers/RowNav.vue';
import AdminArticleListItemSquare from '@/components/admin/AdminArticleListItemSquare.vue';
import { adminStore } from '@/stores/adminStore';

export default {
  components: {
    AdminArtSlider,
    RowNav,
    AdminArticleListItemSquare,
  },
  setup() {
    const adminData = adminStore();
    const listState = ref(1);
    const articleList = computed(() => {
      let array = [];
      if (listState.value === 2) {
        array = adminData.articles.filter((item) => item.isPublic);
      } else if (listState.value === 3) {
        array = adminData.articles.filter((item) => !item.isPublic);
      } else {
        array = adminData.articles;
      }
      return array;
    });
    function openArticleDetail(state, item) {
      if (state === 'isNew') {
        adminData.articleItem = JSON.parse(JSON.stringify(defaultArticleData));
      } else if (state === 'edit') {
        adminData.articleItem = JSON.parse(JSON.stringify(item));
      }
      adminData.articleModel.state = state;
    }
    adminData.getArticles();
    return {
      adminData,
      articleList,
      listState,
      articleCategory,
      openArticleDetail,
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
            @click="openArticleDetail('isNew', adminData.articleItem)"
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
              @change-article-state="adminData.changeArticleState"
              @open-article-detail="openArticleDetail"
              @delete-article="adminData.deleteArticle"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
  <AdminArtSlider
    :select-item="adminData.articleItem"
    :modal-state="adminData.articleModel.state"
    @get-article="adminData.getArticles"
    @clear-item="adminData.clearArticleItem"
  />
</template>

<style lang="scss"></style>

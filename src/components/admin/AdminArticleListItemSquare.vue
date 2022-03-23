<script>
export default {
  props: ['article'],
  emits: ['changeArticleState', 'openArticleDetail', 'deleteArticle'],
};
</script>
<template>
  <div class="group">
    <div class="relative mb-2">
      <p
        class="cursor-pointer bg-primaryLight px-2 py-0.5 rounded-tl hover:bg-black hover:text-white absolute left-0 top-0 z-10"
      >
        {{ article.category }}
      </p>
      <img
        class="w-100 bg-gray-300 rounded"
        :src="article.imagesUrl[0]"
        :alt="`${article.title}文章圖片`"
      />
      <div
        class="hidden group-hover:flex group-hover:bg-black/30 space-x-3 flex-1 justify-center items-center absolute top-0 left-0 w-full h-full rounded"
      >
        <button
          type="button"
          class="border border-gray-200 rounded py-2 px-3 hover:border-gray-300 bg-white"
          data-action="remove"
          :data-id="article.id"
          @click="$emit('openArticleDetail', 'edit', article)"
        >
          <p>查看貼文</p>
        </button>
        <button
          type="button"
          class="border border-gray-200 rounded py-2 px-3 hover:border-gray-300 bg-white"
          data-action="remove"
          :data-id="article.id"
          @click="$emit('changeArticleState', article)"
        >
          <p>{{ article.isPublic ? '下架貼文' : '上架貼文' }}</p>
        </button>
        <button
          v-if="!article.isPublic"
          type="button"
          class="border border-gray-200 rounded py-2 px-3 hover:border-gray-300 bg-white"
          data-action="remove"
          :data-id="article.id"
          @click="$emit('deleteArticle', article.id)"
        >
          <i class="bi bi-trash2-fill text-xl"></i>
        </button>
      </div>
    </div>
    <p class="group-hover:text-yellow-600 mb-1">{{ article.title }}</p>
    <div class="flex flex-wrap">
      <p class="text-sm mr-1" v-for="tag in article.tags" :key="tag">
        #{{ tag }}
      </p>
    </div>
    <p>{{ article.create_at }}</p>
  </div>
</template>
<style lang="scss"></style>

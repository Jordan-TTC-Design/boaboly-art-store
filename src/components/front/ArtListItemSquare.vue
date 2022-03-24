<script>
export default {
  props: ['artItem', 'listIndex'],
  emits: ['addCollection'],
  setup(props, { emit }) {
    return { emit };
  },
};
</script>
<template>
  <div class="artItem group bg-white border-b border-gray-300 py-12">
    <div class="flex items-end mb-8 gap-4">
      <router-link
        class="relative block p-4 group-hover:bg-gray-100"
        :to="`/arts/${artItem.id}`"
      >
        <img
          class="w-48 bg-gray-300 rounded"
          :src="artItem.imagesUrl[0]"
          :alt="`${artItem.title}產品圖片`"
        />
      </router-link>
      <div class="flex flex-col items-start mb-8">
        <p class="border border-gray-300 px-2 py-0.5 text-sm mb-2">
          {{ artItem.category }}
        </p>
        <router-link
          :to="`/arts/${artItem.id}`"
          class="cursor-pointer text-xl text-black font-medium block mb-2"
        >
          {{ artItem.title }}
        </router-link>
      </div>
    </div>
    <div class="flex justify-between items-start gap-2 pl-4">
      <div class="flex">
        <p v-for="tag in artItem.tags" :key="tag" class="mr-2">#{{ tag }}</p>
      </div>
      <p class="text-gray-500 text-right">
        {{ artItem.create_at }}
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.artItem {
  min-height: 360px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    width: 0%;
    height: 1px;
    background-color: black;
    transition: all 0.3s;
  }
  &:hover {
    &::after {
      width: 100%;
    }
  }
}
</style>

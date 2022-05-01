<script>
import changeTime from '@/methods/filter';

export default {
  props: ['artItem', 'listIndex'],
  emits: ['addCollection'],
  setup(props, { emit }) {
    return { emit, changeTime };
  },
};
</script>

<template>
  <RouterLink
    class="artItem group bg-white border-b border-gray-300 py-12"
    :to="`/arts/${artItem.id}`"
  >
    <div class="flex sm:flex-row flex-col sm:items-end sm:mb-8 gap-4">
      <RouterLink
        class="relative block sm:p-4 group-hover:bg-gray-100 flex-shrink-0"
        :to="`/arts/${artItem.id}`"
      >
        <img
          class="sm:w-48 w-full bg-gray-300 rounded"
          :src="artItem.imagesUrl[0]"
          :alt="`${artItem.title}產品圖片`"
        />
      </RouterLink>
      <div class="flex flex-col items-start sm:mb-8 mb-4 gap-y-2">
        <p class="border border-gray-300 px-2 py-0.5 text-sm">
          {{ artItem.category }}
        </p>
        <RouterLink
          :to="`/arts/${artItem.id}`"
          class="cursor-pointer text-xl text-black font-medium block"
        >
          {{ artItem.title }}
        </RouterLink>
      </div>
    </div>
    <div
      class="flex sm:flex-row flex-col justify-between items-start gap-2 sm:pl-4"
    >
      <div class="flex flex-wrap">
        <p v-for="tag in artItem.tags" :key="tag" class="mr-2">#{{ tag }}</p>
      </div>
      <p class="text-gray-500 text-right whitespace-nowrap self-end">
        {{ changeTime(artItem.create_at) }}
      </p>
    </div>
  </RouterLink>
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

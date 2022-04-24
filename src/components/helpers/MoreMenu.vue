<script>
import { ref } from 'vue';
export default {
  props: ['item-id'],
  emits: ['delete-item', 'edit-item'],
  setup() {
    const modalOpen = ref(false);
    return {
      modalOpen,
    };
  },
};
</script>

<template>
  <div class="moreMenu">
    <button
      type="button"
      @click="modalOpen = !modalOpen"
      class="border border-gray-200 rounded py-1 px-2 hover:border-gray-300 bg-white"
    >
      <i class="bi bi-three-dots text-xl"></i>
    </button>
    <ul
      v-show="modalOpen === true"
      class="moreMenu__box border border-gray-300 rounded bg-white"
    >
      <li
        @click="$emit('edit-item', itemId)"
        class="cursor-pointer border-b border-gray-300 pl-12 pr-4 py-2 moreMenu__item"
      >
        編輯
      </li>
      <li
        @click="$emit('delete-item', itemId)"
        class="cursor-pointer border-b border-gray-300 pl-12 pr-4 py-2 moreMenu__item"
      >
        刪除
      </li>
    </ul>
  </div>
  <div
    v-show="modalOpen === true"
    class="fixed top-0 bottom-0 left-0 right-0 z-50"
    @click="modalOpen = false"
  ></div>
</template>

<style lang="scss" scoped>
.moreMenu {
  position: relative;
  z-index: 99;
  &__box {
    position: absolute;
    bottom: -0.25rem;
    right: 0;
    transform: translateY(100%);
  }
}
.moreMenu__item {
  white-space: nowrap;
  &:last-child {
    border-bottom: 0;
  }
}
</style>

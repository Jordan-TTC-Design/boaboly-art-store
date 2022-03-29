<script>
import { computed } from 'vue';
export default {
  props: ['pagination-data'],
  emits: ['change-page-number'],
  setup(props) {
    const pagination = computed(
      () => props.paginationData || { totalPages: 1, nowPage: 1 }
    );
    const pageList = computed(() => {
      let array = [];
      for (let i = 1; i <= pagination.value.totalPages; i++) {
        array.push(i);
      }
      return array;
    });
    return { pagination, pageList };
  },
};
</script>
<template>
  <ul class="pagination bg-gray-100 rounded">
    <li
      class="pagination__item mr-1 is_able"
      @click="$emit('change-page-number', pagination.nowPage - 1)"
    >
      <i class="bi bi-arrow-left"></i>
    </li>
    <template v-for="page in pageList" :key="page">
      <li
        :class="{ active: pagination.nowPage === page }"
        class="pagination__item mr-1 is_able"
        @click="$emit('change-page-number', page)"
      >
        {{ page }}
      </li>
    </template>
    <li
      class="pagination__item is_able"
      @click="$emit('change-page-number', pagination.nowPage + 1)"
    >
      <i class="bi bi-arrow-right"></i>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  &__item {
    padding: 0.5rem 1rem;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 0px;
      width: 100%;
      background-color: black;
      transition: all 0.3s;
    }
    &.active {
      &::after {
        height: 4px;
      }
    }
    &.is_able {
      cursor: pointer;
    }
    &:hover {
      background-color: rgba(255, 2555, 255, 0.5);
    }
  }
}
</style>

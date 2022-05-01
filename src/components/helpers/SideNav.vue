<script>
import { ref } from 'vue';

export default {
  props: ['nav-list'],
  emits: ['change-side-nav'],
  setup(props, { emit }) {
    let nowNavItem = ref('');
    function changeNav(targetItem) {
      nowNavItem.value = targetItem;
      emit('change-side-nav', targetItem);
    }
    return {
      nowNavItem,
      changeNav,
    };
  },
};
</script>

<template>
  <ul>
    <li class="text-sm text-gray-400 mb-2"><slot></slot></li>
    <li
      @click="changeNav()"
      :class="{ 'text-yellow-600': nowNavItem === '' }"
      class="group py-2 px-5 cursor-pointer relative hover:text-yellow-600"
    >
      <span
        :class="{ 'bg-yellow-400': nowNavItem === '' }"
        class="w-3 h-px bg-gray-300 block absolute top-1/2 left-0 group-hover:bg-yellow-400"
      ></span
      >全部
    </li>
    <template v-for="navItem in navList" :key="navItem">
      <li
        @click="changeNav(navItem)"
        :class="{ 'text-yellow-600': nowNavItem === navItem }"
        class="group py-2 px-5 cursor-pointer relative hover:text-yellow-600"
      >
        <span
          :class="{ 'bg-yellow-400': nowNavItem === navItem }"
          class="w-3 h-px bg-gray-300 block absolute top-1/2 left-0 group-hover:bg-yellow-400"
        ></span
        >{{ navItem }}
      </li>
    </template>
  </ul>
</template>

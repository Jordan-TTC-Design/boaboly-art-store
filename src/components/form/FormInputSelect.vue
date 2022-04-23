<script>
import { computed } from 'vue';
export default {
  props: ['modelValue', 'input-id', 'select-data'],
  setup(props) {
    const data = computed(() => props.modelValue);
    return { data };
  },
};
</script>

<template>
  <div class="w-full mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
      :for="inputId"
    >
      <slot></slot>
    </label>
    <div>
      <select
        class="cursor-pointer appearance-none bg-transparent border border-gray-300 w-full py-2 px-2 leading-tight focus:outline-none"
        :class="{
          'text-gray-400': data === '',
          'text-gray-700': data !== '',
        }"
        :id="inputId"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option selected value="">請選擇</option>
        <template v-for="option in selectData" :key="option">
          <option :value="option">{{ option }}</option>
        </template>
      </select>
    </div>
  </div>
</template>

<style lang="scss"></style>

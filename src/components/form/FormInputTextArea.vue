<script>
import { ref } from 'vue';
export default {
  props: ['modelValue', 'input-id', 'input-type', 'textAreaRow'],
  setup(props, { slots }) {
    const data = ref(slots);
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
    <textarea
      class="appearance-none bg-transparent border border-gray-300 w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none"
      :id="inputId"
      :rows="textAreaRow"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>
<style lang="scss"></style>

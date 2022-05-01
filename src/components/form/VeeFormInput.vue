<script>
import { Field, ErrorMessage } from 'vee-validate';

export default {
  components: {
    Field,
    ErrorMessage,
  },
  props: [
    'labelName',
    'modelValue',
    'input-id',
    'input-type',
    'text-holder',
    'errors',
  ],
  setup() {},
};
</script>

<template>
  <div class="w-full mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
      :for="inputId"
    >
      {{ labelName }}
    </label>
    <Field
      :id="inputId"
      :name="labelName"
      :type="inputType"
      class="appearance-none bg-transparent border border-gray-300 w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none"
      :class="{ 'is-invalid': errors[`${labelName}`] }"
      :placeholder="textHolder"
      :rules="`${inputType === 'email' ? 'email' : ''}|required`"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></Field>
    <Error-message
      :name="labelName"
      class="invalid-feedback text-red-700"
    ></Error-message>
  </div>
</template>

<style lang="scss"></style>

<script>
import { ref, watch } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  props: ['modelValue', 'input-id', 'input-name'],
  setup() {
    // 編輯器套件
    const editor = ref(ClassicEditor);
    const editorConfig = ref({
      toolbar: ['heading', '|', 'bold', 'italic', 'link'],
      language: 'zh',
      placeholder: '請輸入...',
      heading: {
        // 設定 Heading 內的樣式，可新增多個
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph',
          },
          {
            model: 'heading1',
            view: 'h2',
            title: 'Heading 1',
            class: 'ck-heading_heading1',
          },
          {
            model: 'heading2',
            view: 'h3',
            title: 'Heading 2',
            class: 'ck-heading_heading2',
          },
        ],
      },
    });
    const textData = ref('');
    watch(textData, (newValue, oldValue) => {
      console.log(newValue, oldValue);
    });
    function check() {
      console.log(textData.value);
    }
    return { textData, editor, editorConfig, check };
  },
};
</script>
<template>
  <div class="w-full mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
      :for="inputId"
    >
      {{ inputName }}
    </label>
    <ckeditor
      :id="inputId"
      :name="inputName"
      :editor="editor"
      tag-name="textarea"
      v-model="textData"
      :config="editorConfig"
    ></ckeditor>
    <button type="button" @click="check">dddd</button>
  </div>
</template>
<style lang="scss">
// :v-model="$emit('update:modelValue', $event.target.value)"
</style>

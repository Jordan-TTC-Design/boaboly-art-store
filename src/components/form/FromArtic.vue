<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '@/methods/myUploadAdapter';
function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}
export default {
  props: ['child-data', 'input-id', 'input-name', 'text-holder'],
  data() {
    return {
      textData: '',
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link'],
        extraPlugins: [MyCustomUploadAdapterPlugin],
        language: 'zh',
        placeholder: `${this.textHolder}`,
        heading: {
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
      },
    };
  },
  watch: {
    childData(val) {
      this.textData = val;
    },
    textData(val) {
      console.log(val);
      this.$emit('update:childData', this.textData);
    },
  },
  methods: {
    checkout(value) {
      console.log(value);
    },
  },
  created() {
    console.log(this.textData);
  },
};
</script>
<template>
  <div class="w-full mb-6 md:mb-0 form__infoEditBox">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
      :for="inputId"
    >
      {{ inputName }}
    </label>
    <ckeditor
      class="articalInputArea"
      :editor="editor"
      :config="editorConfig"
      :id="inputId"
      :name="inputName"
      v-model="textData"
    ></ckeditor>
    <!-- <textarea
      type="textarea"
      v-model="textData"
      @input="checkout($event.target.value)"
    /> -->
  </div>
</template>
<style lang="scss">
.form__infoEditBox {
  .ck-editor__editable_inline {
    min-height: 480px;
  }
  .ck-content h2 {
    font-size: 24px;
  }
}
</style>

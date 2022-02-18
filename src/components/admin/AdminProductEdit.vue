<script>
import { computed, ref } from 'vue';
import { apiMethod } from '@/methods/api.js';
import ImgUploader from '@/components/admin/ImgUploader.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormInputNumber from '@/components/form/FormInputNumber.vue';
import emitter from '@/methods/emitter';

export default {
  components: {
    ImgUploader,
    FormInput,
    FormInputNumber,
  },
  props: ['selectItem', 'modal-state'],
  emits: ['get-product', 'clear-item'],
  setup(props, { emit }) {
    const productItem = computed(() => props.selectItem);
    const state = computed(() => props.modalState);
    const newProductItem = ref({
      title: '',
      category: '',
      origin_price: 0,
      price: 0,
      unit: '',
      description: '',
      content: '',
      is_enabled: 1,
      imageUrl: '',
      imagesUrl: [''],
    });
    const imgCoverUploader = ref(null);
    const imgsData = ref([{ useUrl: true, url: '' }]);
    function upload() {
      console.dir(imgCoverUploader);
      const [file] = imgCoverUploader.value.files;
      apiMethod.adminImageUpload(file);
    }
    function getUrl(url, name) {
      console.log(url, name);
      if (name === '主要圖片') {
        productItem.value.imageUrl = url;
      } else {
        productItem.value.imagesUrl[name] = url;
      }
      console.log(productItem.value);
    }
    function newProduct() {
      console.log(productItem.value);
      console.log(state.value);
      if (state.value === 'isNew') {
        apiMethod.adminPostProduct(productItem.value).then(() => {
          emit('get-product');
          emit('clear-item');
        });
      } else if (state.value === 'edit') {
        apiMethod
          .adminUpdateProduct(productItem.value.id, productItem.value)
          .then(() => {
            emit('get-product');
            emit('clear-item');
          });
      }
    }
    function openPopModal() {
      emitter.emit('open-pop-modal');
    }
    return {
      imgsData,
      productItem,
      state,
      newProductItem,
      imgCoverUploader,
      openPopModal,
      upload,
      getUrl,
      newProduct,
    };
  },
};
</script>
<template>
  <div class="flex flex-col relative h-full">
    <div
      class="flex flex-shrink justify-between items-center px-5 py-2 border-b border-gray-300"
    >
      <h3>新增商品</h3>
      <button
        type="button"
        class="mr-2 rounded py-2 px-3"
        @click="$emit('clear-item')"
      >
        <i class="bi bi-x text-xl group-hover:text-gray-900"></i>
      </button>
    </div>
    <form
      @submit.prevent="newProduct"
      class="flex flex-col flex-shrink overflow-y-scroll"
    >
      <div class="flex flex-shrink flex-wrap gap-y-6 p-5">
        <FormInput
          v-model="productItem.title"
          input-id="productTitle"
          type="text"
        >
          <template v-slot:default>產品標題</template>
        </FormInput>
        <div class="w-full md:w-1/2">
          <FormInput
            v-model="productItem.category"
            input-id="productCategory"
            type="text"
          >
            <template v-slot:default>產品分類</template>
          </FormInput>
        </div>
        <div class="w-full md:w-1/2">
          <FormInput
            v-model="productItem.unit"
            input-id="productUnit"
            type="text"
          >
            <template v-slot:default>產品單位</template>
          </FormInput>
        </div>
        <div class="w-full md:w-1/2">
          <FormInput
            v-model="productItem.origin_price"
            input-id="productOriginPrice"
            input-type="number"
          >
            <template v-slot:default>產品原價</template>
          </FormInput>
        </div>
        <div class="w-full md:w-1/2">
          <FormInputNumber v-model="productItem.price" input-id="productPrice">
            <template v-slot:default>產品價格</template>
          </FormInputNumber>
        </div>
        <div class="w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
            for="productDescription"
          >
            產品描述
          </label>
          <div class="flex items-center border-b border-gray-200 py-2">
            <textarea
              class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              id="productDescription"
              rows="3"
              v-model="productItem.description"
            ></textarea>
          </div>
        </div>
        <div class="w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
            for="productImgCover"
          >
            產品主圖
          </label>
          <ImgUploader @send-img-url="getUrl" :img-name="'主要圖片'" />
        </div>
        <div class="w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
            for="productImgCover"
          >
            產品附圖
          </label>
          <div
            class="mb-4"
            v-for="(img, index) in productItem.imagesUrl"
            :key="`img${index}`"
          >
            <ImgUploader @send-img-url="getUrl" :img-name="index" />
          </div>
          <button
            v-if="
              !productItem.imagesUrl.length ||
              productItem.imagesUrl[productItem.imagesUrl.length - 1] !== ''
            "
            type="button"
            class="w-full border border-gray-200 rounded py-2 px-3 hover:border-gray-300 mb-2"
            @click="productItem.imagesUrl.push('')"
          >
            新增圖片欄位
          </button>
          <button
            type="button"
            class="w-full border border-gray-200 rounded py-2 px-3 hover:border-gray-300"
            @click="productItem.imagesUrl.pop()"
          >
            刪除圖片欄位
          </button>
        </div>
      </div>
      <div class="flex p-4 w-full border-t border-gray-200 bg-white">
        <button
          type="button"
          class="mr-2 border border-gray-200 rounded py-2 px-3 hover:border-gray-300"
          @click="$emit('clear-item')"
        >
          取消
        </button>
        <button
          type="submit"
          class="flex-1 bg-purple-200 text-purple-600 rounded py-2 px-3 hover:border-gray-300"
        >
          {{ state === 'isNew' ? '新增產品' : '更新產品' }}
        </button>
      </div>
    </form>
  </div>
</template>
<style lang="scss"></style>

<script>
import { computed, ref } from 'vue';
import { apiMethod } from '@/methods/api.js';
import ImgUploader from '@/components/admin/ImgUploader.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormInputNumber from '@/components/form/FormInputNumber.vue';
import FormInputTextArea from '@/components/form/FormInputTextArea.vue';
import FromArtic from '@/components/form/FromArtic.vue';

export default {
  components: {
    ImgUploader,
    FormInput,
    FormInputNumber,
    FormInputTextArea,
    FromArtic,
  },
  emits: ['get-product'],
  setup(props, { emit }) {
    const productItem = computed(() => {
      return {
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
        material: [''],
        size: {
          sizeLength: '',
          sizeWidth: '',
          sizeHeight: '',
        },
        promoted: {
          star: false,
          event: {
            title: '',
            price: 0,
            is_enabled: 0,
          },
        },
        tags: [''],
        reserve: 1,
        num: 1,
        made: '',
      };
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
        const newName = name.slice(2);
        productItem.value.imagesUrl[newName] = url;
      }
      console.log(productItem.value);
    }
    function newProduct() {
      apiMethod.adminPostProduct(productItem.value).then(() => {
        emit('get-product');
      });
    }
    return {
      imgsData,
      productItem,
      imgCoverUploader,
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
      <div class="grid grid-cols-6 gap-4 p-4 flex-shrink">
        <div class="col-span-2">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
            for="productImgCover"
          >
            商品主圖
          </label>
          <ImgUploader
            @send-img-url="getUrl"
            img-name="主要圖片"
            :exist-img-url="productItem.imageUrl"
          />
        </div>
        <div class="col-span-4 grid grid-cols-2 gap-4">
          <div class="col-span-2 lg:col-span-1">
            <FormInput
              v-model="productItem.title"
              input-id="productTitle"
              type="text"
            >
              <template v-slot:default>商品標題</template>
            </FormInput>
          </div>
          <div class="col-span-2 lg:col-span-1">
            <FormInput
              v-model="productItem.category"
              input-id="productCategory"
              type="text"
            >
              <template v-slot:default>商品分類</template>
            </FormInput>
          </div>
          <div class="col-span-2 lg:col-span-1">
            <FormInput
              v-model.number="productItem.origin_price"
              input-id="productOriginPrice"
              input-type="number"
            >
              <template v-slot:default>商品原價</template>
            </FormInput>
          </div>
          <div class="col-span-2 lg:col-span-1">
            <FormInputNumber
              v-model.number="productItem.price"
              input-id="productPrice"
            >
              <template v-slot:default>商品價格</template>
            </FormInputNumber>
          </div>
          <div class="col-span-2 lg:col-span-1">
            <FormInputNumber
              v-model.number="productItem.reserve"
              input-id="productReserve"
            >
              <template v-slot:default>商品庫存</template>
            </FormInputNumber>
          </div>
          <div class="col-span-2">
            <FormInputTextArea
              v-model="productItem.description"
              input-id="productDescription"
              text-area-row="5"
              text-holder="請輸入商品描述"
            >
              <template v-slot:default>商品描述</template>
            </FormInputTextArea>
            <FromArtic
              v-model="productItem.description"
              input-id="productDescription"
              input-name="商品描述"
            >
            </FromArtic>
          </div>
          <div class="col-span-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
            >
              商品附圖
            </label>
            <div class="grid grid-cols-3 gap-4">
              <div
                class="relative"
                v-for="(img, index) in productItem.imagesUrl"
                :key="`img${index}`"
              >
                <ImgUploader
                  @send-img-url="getUrl"
                  :img-name="`圖片${index}`"
                  :exist-img-url="img"
                />
                <button
                  type="button"
                  class="h-7 w-7 p-1 bg-gray-200 active:scale-90 rounded-md cursor-pointer transition-all absolute top-0 right-0 translate-x-3 -translate-y-3"
                  @click="productItem.imagesUrl.splice(index, 1)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-full w-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div
                v-if="
                  productItem.imagesUrl.length ||
                  productItem.imagesUrl[productItem.imagesUrl.length - 1] !== ''
                "
              >
                <button
                  type="button"
                  class="w-full min-h-full py-24 border border-gray-300 rounded py-2 px-3 hover:bg-gray-100"
                  @click="productItem.imagesUrl.push('')"
                >
                  新增圖片欄位
                </button>
              </div>
            </div>
          </div>
          <div class="col-span-2 lg:col-span-1">
            <FormInput
              v-model="productItem.unit"
              input-id="productUnit"
              type="text"
            >
              <template v-slot:default>商品單位</template>
            </FormInput>
          </div>
          <div class="col-span-2 lg:col-span-1">
            <FormInput
              v-model="productItem.Material"
              input-id="productMaterial"
              type="text"
            >
              <template v-slot:default>商品材質</template>
            </FormInput>
          </div>
          <div class="col-span-2 flex gap-x-4">
            <div class="flex-1">
              <FormInput
                v-model="productItem.size.sizeLength"
                input-id="productlength"
                type="text"
              >
                <template v-slot:default>商品長度</template>
              </FormInput>
            </div>
            <div class="flex-1">
              <FormInput
                v-model="productItem.size.sizeWidth"
                input-id="productWidth"
                type="text"
              >
                <template v-slot:default>商品寬度</template>
              </FormInput>
            </div>
            <div class="flex-1">
              <FormInput
                v-model="productItem.size.sizeHeight"
                input-id="productHeight"
                type="text"
              >
                <template v-slot:default>商品高度</template>
              </FormInput>
            </div>
          </div>
          <div class="col-span-2">
            <FormInputTextArea
              v-model="productItem.content"
              input-id="productContent"
              text-area-row="5"
              text-holder="請輸入商品特色"
            >
              <template v-slot:default>商品特色</template>
            </FormInputTextArea>
          </div>
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
          新增商品
        </button>
      </div>
    </form>
  </div>
</template>
<style lang="scss"></style>

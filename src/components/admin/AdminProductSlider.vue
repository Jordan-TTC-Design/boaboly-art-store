<script>
import { ref } from 'vue';
import { apiMethod } from '@/methods/api.js';
import {
  productCategory,
  materialCategory,
  unitCategory,
} from '@/methods/data.js';
import ImgUploader from '@/components/admin/ImgUploader.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormInputNumber from '@/components/form/FormInputNumber.vue';
import FormInputTextArea from '@/components/form/FormInputTextArea.vue';
import RowNav from '@/components/helpers/RowNav.vue';
import FromArtic from '@/components/form/FromArtic.vue';
import FormInputSelect from '@/components/form/FormInputSelect.vue';
import { adminStore } from '@/stores/adminStore';

export default {
  components: {
    ImgUploader,
    FormInput,
    FormInputNumber,
    FormInputTextArea,
    RowNav,
    FromArtic,
    FormInputSelect,
  },
  setup() {
    const adminData = adminStore();
    const listState = ref(1);
    const imgCoverUploader = ref(null);
    const imgsData = ref([{ useUrl: true, url: '' }]);
    function upload() {
      const [file] = imgCoverUploader.value.files;
      apiMethod.adminImageUpload(file);
    }
    function getUrl(url, name) {
      if (name === '主要圖片') {
        adminData.productItem.imageUrl = url;
      } else {
        const newName = name.slice(2);
        adminData.productItem.imagesUrl[newName] = url;
      }
    }
    return {
      adminData,
      productCategory,
      materialCategory,
      unitCategory,
      imgsData,
      listState,
      imgCoverUploader,
      upload,
      getUrl,
    };
  },
};
</script>

<template>
  <div class="flex flex-col relative h-full">
    <div class="relative border-b border-gray-300 p-6 pb-0">
      <h3 class="text-2xl mb-6">{{ adminData.productItem.title }}</h3>
      <RowNav
        :list-state="listState"
        :nav-array="['商品資訊', '優惠活動', '售出紀錄', '產品評價']"
        @return-state="listState = $event"
      />
      <button
        type="button"
        class="mr-2 rounded py-2 px-3 top-3 right-2 absolute"
        @click="$emit('clear-item')"
      >
        <i class="bi bi-x text-xl group-hover:text-gray-900"></i>
      </button>
    </div>
    <form
      @submit.prevent="adminData.newProduct"
      class="flex flex-col flex-shrink overflow-y-scroll"
    >
      <div class="grid grid-cols-6 gap-x-8 p-6 flex-shrink">
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
            :exist-img-url="adminData.productItem.imageUrl"
          />
        </div>
        <div class="col-span-4 grid grid-cols-6 gap-4">
          <h3
            class="col-span-6 text-xl font-bold border-b border-gray-300 pb-3 mb-4"
          >
            主要資訊
          </h3>
          <div class="col-span-6 lg:col-span-3">
            <FormInput
              v-model="adminData.productItem.title"
              input-id="productTitle"
              type="text"
            >
              <template v-slot:default>商品標題</template>
            </FormInput>
          </div>
          <div class="col-span-6 lg:col-span-3">
            <FormInputSelect
              v-model="adminData.productItem.category"
              input-id="productCategory"
              :select-data="productCategory"
            >
              <template v-slot:default>商品分類</template>
            </FormInputSelect>
          </div>
          <div class="col-span-6 lg:col-span-3">
            <FormInput
              v-model.number="adminData.productItem.origin_price"
              input-id="productOriginPrice"
              input-type="number"
            >
              <template v-slot:default>商品原價</template>
            </FormInput>
          </div>
          <div class="col-span-6 lg:col-span-3">
            <FormInputNumber
              v-model.number="adminData.productItem.price"
              input-id="productPrice"
            >
              <template v-slot:default>商品價格</template>
            </FormInputNumber>
          </div>
          <div class="col-span-6 mb-12">
            <FormInputTextArea
              v-model="adminData.productItem.description"
              input-id="productDescription"
              text-area-row="5"
              text-holder="請輸入商品摘要"
            >
              <template v-slot:default>商品摘要</template>
            </FormInputTextArea>
          </div>
          <h3
            class="col-span-6 text-xl font-bold border-b border-gray-300 pb-3 mb-4"
          >
            商品圖片
          </h3>
          <div class="col-span-6 mb-12">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
            >
              商品附圖
            </label>
            <div class="grid grid-cols-3 gap-4">
              <div
                class="relative"
                v-for="(img, index) in adminData.productItem.imagesUrl"
                :key="`img${index}`"
              >
                <ImgUploader
                  @send-img-url="getUrl"
                  :img-name="`圖片${index}`"
                  :exist-img-url="img"
                />
                <button
                  type="button"
                  :class="{ hidden: index == 0 }"
                  class="h-7 w-7 p-1 bg-gray-200 active:scale-90 rounded-md cursor-pointer transition-all absolute top-0 right-0 translate-x-3 -translate-y-3"
                  @click="adminData.productItem.imagesUrl.splice(index, 1)"
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
              <button
                v-if="
                  adminData.productItem.imagesUrl.length ||
                  adminData.productItem.imagesUrl[
                    adminData.productItem.imagesUrl.length - 1
                  ] !== ''
                "
                type="button"
                class="w-full border border-gray-300 rounded py-2 px-3 hover:bg-gray-100"
                @click="adminData.productItem.imagesUrl.push('')"
              >
                新增圖片欄位
              </button>
            </div>
          </div>
          <h3
            class="col-span-6 text-xl font-bold border-b border-gray-300 pb-3 mb-4"
          >
            主要介紹內容
          </h3>
          <div class="col-span-6 flex gap-x-4 mb-12">
            <FromArtic
              input-id="productContent"
              input-name="商品介紹內容"
              text-holder="請輸入商品介紹內容"
              v-model="adminData.productItem.content"
            />
          </div>
          <h3
            class="col-span-6 text-xl font-bold border-b border-gray-300 pb-3 mb-4"
          >
            其他資訊
          </h3>
          <div class="col-span-6 lg:col-span-2">
            <FormInputSelect
              v-model="adminData.productItem.unit"
              input-id="productUnit"
              :select-data="unitCategory"
            >
              <template v-slot:default>商品單位</template>
            </FormInputSelect>
          </div>
          <div class="col-span-6 lg:col-span-2">
            <FormInputNumber
              v-model.number="adminData.productItem.store"
              input-id="productReserve"
            >
              <template v-slot:default>商品庫存</template>
            </FormInputNumber>
          </div>
          <div class="col-span-6 lg:col-span-2">
            <FormInputSelect
              v-model="adminData.productItem.material"
              input-id="productMaterial"
              :select-data="materialCategory"
            >
              <template v-slot:default>商品材質</template>
            </FormInputSelect>
          </div>
          <div class="col-span-6 lg:col-span-2">
            <FormInput
              v-model="adminData.productItem.made"
              input-id="productMade"
              type="text"
            >
              <template v-slot:default>商品產地</template>
            </FormInput>
          </div>
          <div class="col-span-6 lg:col-span-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
              for="productImgCover"
            >
              商品是否刊登於首頁
            </label>
            <div class="flex items-center">
              <div>
                <input
                  class="hidden"
                  type="radio"
                  id="productNormal"
                  value="0"
                  v-model.number="adminData.productItem.promoted.star"
                /><label
                  for="productNormal"
                  :class="{
                    'bg-black/60 text-white':
                      adminData.productItem.promoted.star == 0,
                  }"
                  class="cursor-pointer block py-1.5 px-3 mr-2 border border-gray-200 rounded hover:border-gray-300"
                  >一般商品</label
                >
              </div>
              <div>
                <input
                  class="hidden"
                  type="radio"
                  id="productStar"
                  value="1"
                  v-model.number="adminData.productItem.promoted.star"
                /><label
                  for="productStar"
                  :class="{
                    'bg-black/60 text-white':
                      adminData.productItem.promoted.star > 0,
                  }"
                  class="cursor-pointer block py-1.5 px-3 mr-2 border border-gray-200 rounded hover:border-gray-300"
                  >首頁商品</label
                >
              </div>
            </div>
          </div>
          <div class="col-span-6 flex gap-x-4">
            <div class="flex-1">
              <FormInput
                v-model="adminData.productItem.size.sizeLength"
                input-id="productLength"
                type="text"
              >
                <template v-slot:default>商品長度</template>
              </FormInput>
            </div>
            <div class="flex-1">
              <FormInput
                v-model="adminData.productItem.size.sizeWidth"
                input-id="productWidth"
                type="text"
              >
                <template v-slot:default>商品寬度</template>
              </FormInput>
            </div>
            <div class="flex-1">
              <FormInput
                v-model="adminData.productItem.size.sizeHeight"
                input-id="productHeight"
                type="text"
              >
                <template v-slot:default>商品高度</template>
              </FormInput>
            </div>
          </div>
          <div class="col-span-6 mb-12">
            <div class="grid grid-cols-3 gap-4">
              <div
                v-for="(tag, index) in adminData.productItem.tags"
                :key="index"
                class="flex-1 relative"
              >
                <FormInput
                  v-model="adminData.productItem.tags[index]"
                  input-id="productlength"
                  type="text"
                >
                  <template v-slot:default>商品標籤{{ index + 1 }}</template>
                </FormInput>
                <button
                  type="button"
                  :class="{ hidden: index == 0 }"
                  class="h-7 w-7 p-1 bg-gray-200 active:scale-90 rounded-md cursor-pointer transition-all absolute top-0 right-0 translate-x-3 translate-y-2"
                  @click="adminData.productItem.tags.splice(index, 1)"
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
              <button
                v-if="
                  adminData.productItem.tags.length ||
                  adminData.productItem.tags[
                    adminData.productItem.tags.length - 1
                  ] !== ''
                "
                type="button"
                class="w-full border border-gray-300 py-1.5 px-3 hover:bg-gray-100"
                @click="adminData.productItem.tags.push('')"
              >
                新增標籤欄位
              </button>
            </div>
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
          更新產品
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss"></style>

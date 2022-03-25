<script>
import { watch, computed, ref } from 'vue';
import { apiMethod } from '@/methods/api.js';
import { defaultArticleData, articleCategory } from '@/methods/article.js';
import ImgUploader from '@/components/admin/ImgUploader.vue';
import FormInput from '@/components/form/FormInput.vue';
import FromArtic from '@/components/form/FromArtic.vue';
import FormInputSelect from '@/components/form/FormInputSelect.vue';

export default {
  components: {
    ImgUploader,
    FormInput,
    FromArtic,
    FormInputSelect,
  },
  props: ['select-item', 'modal-open', 'modal-state'],
  emits: ['get-article', 'clear-item'],
  setup(props, { emit }) {
    const articleItem = ref(JSON.parse(JSON.stringify(defaultArticleData)));
    const modalOpen = ref(false);
    const modalState = computed(() => props.modalState);
    const selectItemId = computed(() => props.selectItem.id);
    let listState = ref(1);
    const imgCoverUploader = ref(null);
    const imgsData = ref([{ useUrl: true, url: '' }]);
    function upload() {
      const [file] = imgCoverUploader.value.files;
      apiMethod.adminImageUpload(file);
    }
    function getUrl(url, name) {
      if (name !== '主要圖片') {
        const newName = name.slice(2);
        articleItem.value.imagesUrl[newName] = url;
      }
    }
    function getArticle(articleId) {
      apiMethod.adminGetArticle(articleId).then((res) => {
        articleItem.value = res;
        modalOpen.value = true;
      });
    }
    function newArticle() {
      articleItem.value.create_at = new Date().getTime();
      if (props.modalState === 'isNew') {
        apiMethod.adminPostArticle(articleItem.value).then(() => {
          closeModal();
        });
      } else if (props.modalState === 'edit') {
        apiMethod
          .adminUpdateArticle(articleItem.value.id, articleItem.value)
          .then(() => {
            closeModal();
          });
      }
    }
    function closeModal() {
      modalOpen.value = false;
      emit('get-article');
      emit('clear-item');
      articleItem.value = JSON.parse(JSON.stringify(defaultArticleData));
    }
    watch(selectItemId, (newVal) => {
      if (newVal !== '' && modalState.value === 'edit') {
        getArticle(newVal);
      }
    });
    watch(modalState, (newVal) => {
      if (newVal === 'isNew') {
        modalOpen.value = true;
      }
    });
    watch(modalOpen, (newVal) => {
      if (newVal === false && articleItem.value.id !== '') {
        emit('clear-item');
        articleItem.value = JSON.parse(JSON.stringify(defaultArticleData));
      }
    });
    return {
      articleCategory,
      modalState,
      modalOpen,
      imgsData,
      listState,
      articleItem,
      imgCoverUploader,
      upload,
      getUrl,
      newArticle,
    };
  },
};
</script>
<template>
  <div
    class="siderBg z-sider"
    :class="{ active: modalOpen }"
    @click="modalOpen = false"
  ></div>
  <div class="siderBox z-sider" :class="{ active: modalOpen === true }">
    <div class="flex flex-col relative h-full">
      <div
        class="flex justify-between items-center border-b border-gray-300 py-4 px-6"
      >
        <h3 class="text-2xl">
          {{ modalState === 'isNew' ? '新增圖文創作' : articleItem.title }}
        </h3>
        <button
          type="button"
          class="rounded py-1.5 px-3"
          @click="$emit('clear-item')"
        >
          <i class="bi bi-x text-xl group-hover:text-gray-900"></i>
        </button>
      </div>
      <form
        @submit.prevent="newArticle"
        class="flex flex-col flex-shrink overflow-y-scroll"
      >
        <div class="grid grid-cols-6 gap-x-8 gap-y-4 p-6 flex-shrink">
          <div class="col-span-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
            >
              文章圖片
            </label>
            <div class="grid grid-cols-3 gap-4">
              <div
                class="relative"
                v-for="(img, index) in articleItem.imagesUrl"
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
                  @click="articleItem.imagesUrl.splice(index, 1)"
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
                  articleItem.imagesUrl.length ||
                  articleItem.imagesUrl[articleItem.imagesUrl.length - 1] !== ''
                "
                type="button"
                class="w-full py-24 border border-gray-300 rounded px-3 hover:bg-gray-100"
                @click="articleItem.imagesUrl.push('')"
              >
                新增圖片欄位
              </button>
            </div>
          </div>
          <div class="col-span-6 lg:col-span-3">
            <FormInput
              v-model="articleItem.title"
              input-id="productTitle"
              type="text"
            >
              <template v-slot:default>文章標題</template>
            </FormInput>
          </div>
          <div class="col-span-6 lg:col-span-3">
            <FormInputSelect
              v-model="articleItem.category"
              input-id="articleCategory"
              :select-data="articleCategory"
            >
              <template v-slot:default>文章分類</template>
            </FormInputSelect>
          </div>
          <div class="col-span-6">
            <FromArtic
              input-id="productContent"
              input-name="創作內容或文章"
              text-holder="請輸入創作內容或文章"
              v-model:child-data="articleItem.content"
            />
          </div>
          <div class="col-span-6 grid grid-cols-6 gap-4">
            <h3
              class="col-span-6 text-xl font-bold border-b border-gray-300 pb-3 mb-4"
            >
              其他資訊
            </h3>
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
                    id="articleNormal"
                    value="0"
                    v-model.number="articleItem.promoted.star"
                  /><label
                    for="articleNormal"
                    :class="{
                      'bg-black/60 text-white': articleItem.promoted.star == 0,
                    }"
                    class="cursor-pointer block py-1.5 px-3 mr-2 border border-gray-200 rounded hover:border-gray-300"
                    >一般文章</label
                  >
                </div>
                <div>
                  <input
                    class="hidden"
                    type="radio"
                    id="articleStar"
                    value="1"
                    v-model.number="articleItem.promoted.star"
                  /><label
                    for="articleStar"
                    :class="{
                      'bg-black/60 text-white': articleItem.promoted.star > 0,
                    }"
                    class="cursor-pointer block py-1.5 px-3 mr-2 border border-gray-200 rounded hover:border-gray-300"
                    >首頁文章</label
                  >
                </div>
              </div>
            </div>
            <div class="col-span-6 mb-12">
              <div class="grid grid-cols-3 gap-4 flex items-end">
                <div
                  v-for="(tag, index) in articleItem.tags"
                  :key="index"
                  class="flex-1 relative"
                >
                  <FormInput
                    v-model="articleItem.tags[index]"
                    input-id="productlength"
                    type="text"
                  >
                    <template v-slot:default>文章標籤{{ index + 1 }}</template>
                  </FormInput>
                  <button
                    type="button"
                    :class="{ hidden: index == 0 }"
                    class="h-7 w-7 p-1 bg-gray-200 active:scale-90 rounded-md cursor-pointer transition-all absolute top-0 right-0 translate-x-3 translate-y-2"
                    @click="articleItem.tags.splice(index, 1)"
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
                    articleItem.tags.length ||
                    articleItem.tags[articleItem.tags.length - 1] !== ''
                  "
                  type="button"
                  class="w-full py-1.5 border border-gray-300 py-2 px-3 hover:bg-gray-100"
                  @click="articleItem.tags.push('')"
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
            {{ modalState === 'isNew' ? '上傳文章' : '更新文章' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<style lang="scss"></style>

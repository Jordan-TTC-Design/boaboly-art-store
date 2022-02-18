<script>
import { ref, watch } from 'vue';
import _ from 'lodash';
import { apiMethod } from '@/methods/api.js';
import emitter from '@/methods/emitter';
import ImgCropperPopModal from '@/components/helpers/ImgCropperPopModal.vue';

export default {
  props: ['imgName'],
  emits: ['sendImgUrl'],
  components: {
    ImgCropperPopModal,
  },
  setup(props, { emit }) {
    const imgCoverUploader = ref(null);
    const imgsData = ref({
      useUrl: false,
      url: '',
    });
    let imgData = {};
    watch(
      () => imgsData.value.url,
      _.debounce((url) => {
        if (imgsData.value.useUrl) {
          console.log(url);
          sendImgUrl(url);
        }
      }, 2000)
    );
    function sendImgUrl(url) {
      emit('sendImgUrl', url, props.imgName);
    }
    function getImg(data) {
      imgData = data;
    }
    function uploadmgToDB() {
      const base64String = imgData.replace('data:image/jpeg;base64,', '');
      console.log(base64String);
      apiMethod.adminImageUpload(base64String).then((url) => {
        console.log(url);
        // imgsData.value.useUrl = true;
        // sendImgUrl(url);
      });
    }
    function toogleCropper() {
      console.dir(imgCoverUploader);
      const [file] = imgCoverUploader.value.files;
      emitter.emit('open-pop-modal', file);
    }
    return {
      imgsData,
      imgCoverUploader,
      sendImgUrl,
      toogleCropper,
      uploadmgToDB,
      getImg,
    };
  },
};
</script>
<template>
  <div class="p-8 border border-gray-200 rounded">
    <input
      v-show="imgsData.useUrl"
      type="text"
      class="form-control"
      placeholder="請輸入圖片網址"
      v-model="imgsData.url"
    />
    <input
      v-show="!imgsData.useUrl"
      ref="imgCoverUploader"
      type="file"
      class="form-control"
      id="productImgCover"
      placeholder="請選擇上傳檔案"
      @change="toogleCropper"
    />
    <button
      v-show="!imgsData.useUrl"
      class="border border-gray-200 rounded py-2 px-3 hover:border-gray-30 mr-2"
      type="button"
      @click="uploadmgToDB"
    >
      上傳
    </button>
    <button
      class="border border-gray-200 rounded py-2 px-3 hover:border-gray-300"
      type="button"
      @click="imgsData.useUrl = !imgsData.useUrl"
    >
      切換
    </button>
  </div>
  <ImgCropperPopModal
    @send-img-data="getImg"
    imgNumber="1"
    dataName="dataName"
  />
</template>
<style lang="scss"></style>

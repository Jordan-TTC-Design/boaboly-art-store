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
      imgsData.value.url = data.src;
      imgData = data;
    }
    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
    // //將base64轉換為blob
    // function dataURLtoBlob(dataurl) {
    //   var arr = dataurl.split(','),
    //     mime = arr[0].match(/:(.*?);/)[1],
    //     bstr = atob(arr[1]),
    //     n = bstr.length,
    //     u8arr = new Uint8Array(n);
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }
    //   return new Blob([u8arr], { type: mime });
    // }
    // //將blob轉換為file
    // function blobToFile(theBlob, fileName) {
    //   theBlob.lastModifiedDate = new Date();
    //   theBlob.name = fileName;
    //   return theBlob;
    // }
    //呼叫
    function uploadmgToDB() {
      var file = dataURLtoFile(imgData.src, 'file-to-upload');
      // var blob = dataURLtoBlob(imgData.src);
      // var file = blobToFile(blob, 'file-to-upload');
      // console.log(blob);
      console.log(file);
      apiMethod.adminImageUpload(file).then((url) => {
        console.log(url);
        // imgsData.value.useUrl = true;
        // sendImgUrl(url);
      });
    }
    function toogleCropper() {
      console.dir(imgCoverUploader);
      const [file] = imgCoverUploader.value.files;
      emitter.emit(`open-pop-modal-${props.imgName}`, file);
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
  <div class="w-full mb-2">
    <input
      v-show="imgsData.useUrl"
      type="text"
      class="appearance-none bg-transparent border border-gray-300 w-full text-gray-700 py-2 px-2 leading-tight focus:outline-none"
      placeholder="請輸入圖片網址"
      v-model="imgsData.url"
      id="productImgCoverUrl"
    />
  </div>
  <div class="p-4 border border-gray-300 border-b-0" v-show="!imgsData.useUrl">
    <input
      v-show="!imgsData.useUrl"
      ref="imgCoverUploader"
      type="file"
      class="hidden"
      :id="`productImgCover-${imgName}`"
      placeholder="請選擇上傳檔案"
      @change="toogleCropper"
    />
    <div class="bg-gray-100 h-72 relative">
      <img
        v-if="imgsData.url"
        :src="imgsData.url"
        alt="圖片"
        class="w-full h-full absolute top-0 left-0 object-contain object-center"
      />
      <label
        class="w-full h-full absolute flex justify-center items-center uppercase tracking-wide text-gray-700 font-medium cursor-pointer"
        :class="{ 'bg-gray-700/50 text-white': imgsData.url }"
        :for="`productImgCover-${imgName}`"
      >
        {{ imgsData.url ? '重新選擇檔案' : '點擊選擇檔案' }}
      </label>
    </div>
  </div>
  <div class="flex border border-gray-300">
    <button
      v-show="!imgsData.useUrl"
      class="py-2 px-3 hover:border-gray-30 flex-1 border-r border-gray-300"
      type="button"
      @click="uploadmgToDB"
    >
      上傳
    </button>
    <button
      class="py-2 px-3 hover:border-gray-300 flex-1"
      type="button"
      @click="imgsData.useUrl = !imgsData.useUrl"
    >
      {{ imgsData.useUrl ? '切換為上傳工具' : '切換為圖片網址' }}
    </button>
  </div>
  <ImgCropperPopModal @send-img-data="getImg" :img-name="imgName" />
</template>
<style lang="scss"></style>

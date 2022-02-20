<script>
import { ref, onMounted, onUnmounted } from 'vue';
import Cropper from 'cropperjs';
import emitter from '@/methods/emitter';

export default {
  props: ['imgName'],
  emits: ['send-img-data'],
  setup(props, { emit }) {
    let showed = ref(false);
    let isImg = ref(false);
    let cropsrc = ref('');
    let cropper = {};
    let imgData = {};
    const cropperImage = ref(null);
    const destination = ref({});
    function closeModal() {
      showed.value = false;
      cleanImg();
    }
    function openModal(data) {
      showed.value = true;
      console.log(data);
      emitOpenImageCropper(data);
    }
    function putImage(data) {
      const reader = new FileReader();
      if (data) {
        isImg.value = true;
        reader.readAsDataURL(data);
        reader.onload = () => {
          const dataURL = reader.result;
          imgData = cropperImage.value;
          imgData.src = dataURL;
          console.log(imgData);
          cropper = new Cropper(imgData, {
            aspectRatio: 1 / 1,
            viewMode: 0,
            dragMode: 'move',
            minContainerWidth: 480,
            minContainerHeight: 360,
            zoomable: true,
            scalable: true,
            crop: () => {
              const canvas = cropper.getCroppedCanvas({
                maxWidth: 960,
                maxHeight: 720,
              });
              destination.value = canvas.toDataURL('image/jpeg');
            },
          });
        };
      }
    }
    function convertCanvasToImage(canvas) {
      const image = new Image();
      image.src = canvas.toDataURL('image/jpeg');
      return image;
    }
    function processImage() {
      const canvas = cropper.getCroppedCanvas({
        maxWidth: 4096,
        maxHeight: 4096,
        fillColor: '#fff',
        imageSmoothingEnabled: false,
        imageSmoothingQuality: 'high',
      });
      const imgData = convertCanvasToImage(canvas);
      emit('send-img-data', imgData);
      closeModal();
    }
    function cleanImg() {
      if (isImg.value) {
        cropsrc.value = '';
        cropper.destroy();
        isImg.value = false;
      }
    }
    function emitOpenImageCropper(data) {
      // 檢查有無之前遺留的
      if (cropper !== {}) {
        cleanImg();
      }
      setTimeout(() => {
        putImage(data);
      }, 100);
    }
    onMounted(() => {
      emitter.on(`open-pop-modal-${props.imgName}`, openModal);
      // emitter.on('close-pop-modal', closeModal);
    });
    onUnmounted(() => {
      emitter.off(`open-pop-modal-${props.imgName}`, openModal);
      // emitter.off('close-pop-modal', closeModal);
    });

    return {
      showed,
      cropperImage,
      destination,
      closeModal,
      processImage,
    };
  },
};
</script>
<template>
  <div
    :class="[
      'fixed top-0 left-0 z-popModal',
      'w-screen h-screen',
      'p-5',
      'flex justify-center items-center',
      'transition-all duration-300',
      showed ? 'opacity-100' : 'opacity-0 pointer-events-none',
    ]"
  >
    <!-- Modal-Overlay -->
    <div
      class="absolute top-0 left-0 w-full h-full bg-black/50"
      @click="closeModal()"
    />

    <!-- Modal-Window -->
    <div
      :class="[
        'w-full max-w-4xl bg-white rounded-md overflow-hidden z-popModal',
        showed ? 'scale-100' : 'scale-0',
        'transition-all duration-300',
      ]"
    >
      <div class="border-b-2 p-3 flex justify-between items-center">
        <div class="font-bold text-gray-700">
          <p>裁切圖片</p>
        </div>
        <div
          class="h-7 w-7 p-1 hover:bg-gray-200 active:scale-90 rounded-md cursor-pointer transition-all"
          @click="closeModal()"
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
        </div>
      </div>
      <div>
        <slot name="itemContent">
          <div class="bg-white h-full grid grid-cols-5 p-4 gap-4">
            <div class="col-span-4">
              <div class="cropperImageBox rounded overflow-hidden">
                <img
                  class="cropperImage"
                  ref="cropperImage"
                  src=""
                  alt="原圖"
                />
              </div>
            </div>
            <div class="col-span-1">
              <div class="preViewImgBox bg-gray-100 rounded p-5">
                <div class="w-100 d-flex flex-column align-items-center mb-4">
                  <p class="mb-1">預覽圖</p>
                  <div class="bg-white rounded">
                    <img
                      class="preViewImgBox__img"
                      :src="destination"
                      alt="圖片預覽圖"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </slot>
        <div class="flex justify-end p-4 pt-0">
          <button
            type="button"
            class="border border-gray-200 rounded py-2 px-3 hover:border-gray-300"
            @click="processImage"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.cropperImageBox {
  display: block;
  width: 100%;
  background: color #f7f7f7;
  .cropperImage {
    max-width: 100%;
  }
}
.cropper-container {
  min-height: 360px;
  min-width: 480px;
  img {
    display: block;
    height: 100%;
    image-orientation: 0deg;
    max-height: none !important;
    max-width: none !important;
    min-height: 0 !important;
    min-width: 0 !important;
    width: 100%;
  }
}
.preViewImgBox {
  width: 100%;
  min-height: 100%;
  &__img {
    object-fit: contain;
    border-radius: 0.25rem;
    width: 160px !important;
    height: 90px !important;
  }
  &__img--circle {
    object-fit: contain;
    border-radius: 50%;
    width: 132px !important;
    height: 132px !important;
  }
}
</style>

<template>
  <div class="bg-white h-full grid grid-cols-3">
    <div class="col-span-2">
      <div class="cropperImageBox rounded overflow-hidden">
        <img class="cropperImage" ref="cropperImage" src="" alt="原圖" />
      </div>
    </div>
    <div class="col-span-1">
      <div class="preViewImgBox bg-gray-light rounded p-5">
        <div class="w-100 d-flex flex-column align-items-center mb-4">
          <p class="mb-1">長型預覽圖</p>
          <div class="bg-light p-1 rounded">
            <img
              class="preViewImgBox__img"
              :src="destination"
              alt="長型圖片預覽圖"
            />
          </div>
        </div>
        <div class="w-100 d-flex flex-column align-items-center">
          <p class="mb-1">圓型預覽圖</p>
          <div class="bg-light p-1 rounded-circle">
            <img
              class="preViewImgBox__img preViewImgBox__img--circle"
              :src="destination"
              alt="圓型圖片預覽圖"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <button
    type="button"
    @click="processImage"
    class="flex-1 bg-purple-200 text-purple-600 rounded py-2 px-3 hover:border-gray-300"
  >
    確定
  </button>
</template>

<script>
import Cropper from 'cropperjs';

export default {
  props: ['dataName'],
  emits: ['send-img-data'],
  data() {
    return {
      imageCropperModal: {},
      cropper: {},
      cropsrc: '',
      isImg: false,
      imgData: {},
      destination: {},
    };
  },
  methods: {
    putImage(data) {
      const reader = new FileReader();
      if (data) {
        this.isImg = true;
        reader.readAsDataURL(data);
        reader.onload = () => {
          const dataURL = reader.result;
          this.imgData = this.$refs.cropperImage;
          this.imgData.src = dataURL;
          this.cropper = new Cropper(this.imgData, {
            aspectRatio: 16 / 9,
            viewMode: 0,
            dragMode: 'move',
            minContainerWidth: 480,
            minContainerHeight: 360,
            zoomable: true,
            scalable: true,
            crop: () => {
              const canvas = this.cropper.getCroppedCanvas({
                maxWidth: 960,
                maxHeight: 720,
              });
              this.destination = canvas.toDataURL('image/jpeg');
            },
          });
          this.openModal();
        };
      }
    },
    processImage() {
      const canvas = this.cropper.getCroppedCanvas({
        maxWidth: 4096,
        maxHeight: 4096,
        fillColor: '#fff',
        imageSmoothingEnabled: false,
        imageSmoothingQuality: 'high',
      });
      this.cropsrc = canvas.toDataURL('image/jpeg');
      this.sendbackImg();
    },
    sendbackImg() {
      this.$emit('send-img-data', this.cropsrc);
    },
    cleanImg() {
      if (this.isImg) {
        this.cropsrc = '';
        this.cropper.destroy();
        this.isImg = false;
      }
    },
    closeModal() {
      this.cleanImg();
    },
    emitOpenImageCropper(data) {
      // 檢查有無之前遺留的
      if (this.cropper !== {}) {
        this.cleanImg();
      }
      setTimeout(() => {
        this.putImage(data);
      }, 100);
    },
  },
};
</script>

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

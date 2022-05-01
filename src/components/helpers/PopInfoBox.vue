<script>
import { statusStore } from '@/stores/statusStore';
import { cartStore } from '@/stores/cartStore';

export default {
  setup() {
    const statusData = statusStore();
    const cartData = cartStore();
    let actionFunciton = null;
    function addFunction() {
      actionFunciton = statusData.popInfoBox.action;
      actionFunciton();
      statusData.closePopInfoBox();
    }
    return {
      statusData,
      cartData,
      actionFunciton,
      addFunction,
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
      'transition-all duration-300 ',
      statusData.popInfoBox.open
        ? 'opacity-100'
        : 'opacity-0 pointer-events-none',
    ]"
  >
    <!-- Modal-Overlay -->
    <div
      class="absolute top-0 left-0 w-full h-full bg-black/50"
      @click="statusData.closePopInfoBox"
    />

    <!-- Modal-Window -->
    <div
      :class="[
        'w-full max-w-xl md:max-h-1/3 sm:h-2/5 max-h-1/3 bg-white rounded-md z-popModal relative',
        statusData.popInfoBox.open ? 'scale-100' : 'scale-0',
        'transition-all duration-300',
        'flex flex-col justify-between',
      ]"
      class="imgCropperPopModal"
    >
      <div
        class="flex flex-grow justify-between sm:flex-row flex-col overflow-auto sm:mb-0 mb-4"
      >
        <div class="flex flex-col gap-4 md:p-8 p-6">
          <h4 class="text-2xl font-bold text-black">
            {{ statusData.popInfoBox.title }}
          </h4>
          <p>
            {{ statusData.popInfoBox.text }}
          </p>
        </div>
        <img
          class="sm:max-w-1/3 w-1/4 sm:self-auto self-end sm:block hidden"
          src="@/assets/images/Img-charactor-pig.svg"
          alt="原圖"
        />
      </div>
      <div class="flex sm:flex-row flex-col sm:gap-4 gap-2 p-4 pt-0">
        <button
          type="button"
          @click="addFunction"
          class="w-full bg-black text-white rounded py-2 px-3 hover:border-gray-300"
        >
          確定
        </button>
        <button
          type="button"
          @click="statusData.closePopInfoBox"
          class="w-full border border-gray-400 rounded py-2 px-3 hover:border-gray-300"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.z-popModal {
  z-index: 2400;
}
</style>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import emitter from '@/methods/emitter';

export default {
  setup() {
    const showed = ref(false);
    const showText = ref('');
    function closeModal() {
      showed.value = false;
    }
    function openModal(data) {
      showText.value = data;
      showed.value = true;
      setTimeout(() => {
        closeModal();
      }, 1500);
    }
    onMounted(() => {
      emitter.on('open-pop-reminder', (data) => {
        openModal(data);
      });
    });
    onUnmounted(() => {
      emitter.off('open-pop-reminder', (data) => {
        openModal(data);
      });
    });
    return {
      showed,
      showText,
      closeModal,
    };
  },
};
</script>

<template>
  <div
    :class="[
      'fixed right-3 top-24 max-w-sm py-4 px-8 flex items-center justify-center bg-black rounded-md overflow-hidden z-popModal shadow-md',
      showed ? 'scale-100' : 'scale-0',
      'transition-all duration-300',
    ]"
  >
    <p class="font-bold text-white text-right">{{ showText }}</p>
  </div>
</template>

<style lang="scss"></style>

<script>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { frontApiMethod } from '@/methods/api.js';
import emitter from '@/methods/emitter';

export default {
  emits: ['fix-window'],
  setup(props, { emit }) {
    const route = useRoute();
    const nowPath = computed(() => route.path);
    let modalOpen = ref(false);
    let collection = ref([]);
    const productList = ref([]);
    const collectionProduct = computed(() => {
      let array = [];
      collection.value.forEach((itemId) => {
        productList.value.forEach((item) => {
          if (item.id == itemId) {
            array.push(item);
          }
        });
      });
      return array;
    });
    watch(nowPath, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        modalOpen.value = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    watch(modalOpen, (newValue) => {
      if (newValue === true) {
        emit('fix-window', true);
      } else {
        emit('fix-window', false);
      }
    });
    function getCollection() {
      const temJobCollectionsArray = JSON.parse(
        localStorage.getItem('boaboly-store-collection')
      );
      if (temJobCollectionsArray) {
        collection.value = temJobCollectionsArray;
      }
      emitter.emit('check-collection', collection.value);
    }
    function deleteAll() {
      localStorage.setItem('boaboly-store-collection', JSON.stringify([]));
      getCollection();
    }
    function addCollection(product) {
      const newId = product.id;
      const check = collection.value.indexOf(newId);
      if (check < 0) {
        collection.value.push(newId);
        localStorage.setItem(
          'boaboly-store-collection',
          JSON.stringify(collection.value)
        );
      } else {
        collection.value.splice(check, 1);
        localStorage.setItem(
          'boaboly-store-collection',
          JSON.stringify(collection.value)
        );
      }
      getCollection();
    }
    function getProducts() {
      frontApiMethod.getProductAll().then((res) => {
        productList.value = JSON.parse(JSON.stringify(res));
      });
    }
    getProducts();
    getCollection();
    onMounted(() => {
      emitter.on('get-collection', getCollection);
      emitter.on('add-collection', (data) => {
        addCollection(data);
      });
      emitter.emit('check-collection', collection.value);
    });
    onUnmounted(() => {
      modalOpen.value = false;
    });
    return {
      modalOpen,
      collection,
      collectionProduct,
      emitter,
      addCollection,
      deleteAll,
    };
  },
};
</script>
<template>
  <button
    type="button"
    class="rounded py-2 px-3 hover:border-gray-300 hover:bg-white/50 relative"
    @click="modalOpen = !modalOpen"
  >
    <p v-show="collection.length > 0" class="cart__number">
      {{ collection.length }}
    </p>
    <i class="bi bi-heart text-xl text-white"></i>
  </button>
  <div
    class="siderBg--x z-sider"
    :class="{ active: modalOpen }"
    @click="modalOpen = false"
  ></div>
  <div class="siderBox--x z-sider" :class="{ active: modalOpen }">
    <div class="relative h-full flex flex-col">
      <div class="p-8">
        <div class="flex justify-between mb-4">
          <button
            type="button"
            class="px-3 py-2 flex items-center"
            @click="modalOpen = false"
          >
            <i class="bi bi-chevron-double-left mr-1"></i>
            <p>返回</p>
          </button>
          <button
            type="button"
            v-if="collectionProduct.length > 0"
            class="border border-gray-200 rounded py-1 px-2 hover:border-gray-300 bg-white"
            @click="deleteAll"
          >
            <p>刪除全部</p>
          </button>
        </div>
        <h2
          class="inline-block py-3 px-8 bg-black text-2xl text-white font-bold self-start"
        >
          收藏商品
        </h2>
      </div>
      <ul
        class="cartList grid grid-cols-1 gap-y-4 flex-grow-1 overflow-y-auto px-8"
      >
        <li class="grid grid-cols-4 gap-2 border-b border-gray-300">
          <div class="col-span-3">
            <p class="text-sm text-gray-400 mb-2">品項</p>
          </div>
          <div class="col-span-1 flex justify-center">
            <p class="text-sm text-gray-400 mb-2">動作</p>
          </div>
        </li>
        <template v-for="product in collectionProduct" :key="product.id">
          <li class="grid grid-cols-4 gap-2 hover:bg-gray-100/50 py-2">
            <div class="col-span-3 flex items-center">
              <img
                class="w-20"
                :src="product.imageUrl"
                :alt="`${product.title}圖片`"
              />
              <div class="ml-3">
                <p>{{ product.title }}</p>
                <p>NT$ {{ product.price }}</p>
              </div>
            </div>
            <div class="col-span-1 flex justify-center items-center gap-x-2">
              <button
                type="button"
                class="border border-gray-200 rounded py-1 px-2 hover:border-gray-300 bg-white"
                @click="emitter.emit('add-cart', product)"
              >
                <i class="bi bi-cart text-xl"></i>
              </button>
              <button
                type="button"
                class="border border-gray-200 rounded py-1 px-2 hover:border-gray-300 bg-white"
                @click="addCollection(product)"
              >
                <i class="bi bi-x text-xl"></i>
              </button>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<style lang="scss"></style>

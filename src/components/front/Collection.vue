<script>
import { watch, computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { productStore } from '@/stores/productStore';
import { cartStore } from '@/stores/cartStore';
import { statusStore } from '@/stores/statusStore';

export default {
  setup() {
    const route = useRoute();
    const productsData = productStore();
    const cartData = cartStore();
    const statusData = statusStore();
    const nowPath = computed(() => route.path);
    watch(nowPath, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        statusData.collectionModel = false;
        statusData.mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    productsData.getProducts();
    productsData.getCollections();
    onUnmounted(() => {
      statusData.collectionModel = false;
    });
    return {
      productsData,
      cartData,
      statusData,
    };
  },
};
</script>

<template>
  <button
    type="button"
    class="rounded py-2 px-3 hover:border-gray-300 hover:bg-white/50 relative"
    @click="statusData.collectionModel = !statusData.collectionModel"
  >
    <p v-show="productsData.collections.length > 0" class="cart__number">
      {{ productsData.collections.length }}
    </p>
    <i class="bi bi-heart text-xl text-white"></i>
  </button>
  <div
    class="siderBg--x z-sider"
    :class="{ active: statusData.collectionModel }"
    @click="statusData.collectionModel = false"
  ></div>
  <div
    class="siderBox--x z-sider"
    :class="{ active: statusData.collectionModel }"
  >
    <div class="relative h-full flex flex-col">
      <div class="p-8">
        <div class="flex justify-between mb-4">
          <button
            type="button"
            class="px-3 py-2 flex items-center"
            @click="statusData.collectionModel = false"
          >
            <i class="bi bi-chevron-double-left mr-1"></i>
            <p>返回</p>
          </button>
          <button
            type="button"
            v-if="productsData.collectionProduct.length > 0"
            class="border border-gray-200 rounded py-1 px-2 hover:border-gray-300 bg-white"
            @click="
              statusData.openPopInfoBox(
                '刪除全部',
                `請問你要刪除收藏中全部商品？`,
                function () {
                  productsData.deleteAllCollections();
                }
              )
            "
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
      <ul class="cartList flex flex-col flex-grow-1 overflow-y-auto px-8">
        <li class="grid md:grid-cols-4 gap-2 border-b border-gray-300">
          <div class="md:col-span-3">
            <p class="text-sm text-gray-400 mb-2">品項</p>
          </div>
          <div class="col-span-1 md:flex hidden justify-center">
            <p class="text-sm text-gray-400 mb-2">動作</p>
          </div>
        </li>
        <template
          v-for="(product, index) in productsData.collectionProduct"
          :key="product.id"
        >
          <li
            :class="{
              'border-b border-gray-300':
                index < productsData.collectionProduct.length - 1,
            }"
            class="grid grid-cols-4 gap-2 hover:bg-gray-100/50 py-6"
          >
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
                @click="cartData.addCart(product.id, product.num)"
              >
                <i class="bi bi-cart text-xl"></i>
              </button>
              <button
                type="button"
                class="border border-gray-200 rounded py-1 px-2 hover:border-gray-300 bg-white"
                @click="
                  statusData.openPopInfoBox(
                    '刪除收藏',
                    `請問你要從收藏中刪除${product.title}商品？`,
                    function () {
                      productsData.addCollection(product);
                    }
                  )
                "
              >
                <i class="bi bi-x text-xl"></i>
              </button>
            </div>
          </li>
        </template>
        <li
          v-if="productsData.collectionProduct.length === 0"
          class="flex flex-col justify-center items-center pt-6 gap-4"
        >
          <p class="text-gray-400">目前尚無任何商品</p>
          <RouterLink
            to="/products"
            class="bg-black rounded py-2 px-3 hover:bg-gray-800 text-white"
            >去看看有什麼喜歡的
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

import { frontApiMethod } from '@/methods/api.js';
import emitter from '@/methods/emitter';

export default {
  setup() {
    const route = useRoute();
    let modalOpen = ref(false);
    let cartTotal = ref(0);
    const cartList = ref([]);
    const cartAmount = computed(() => {
      let num = 0;
      cartList.value.forEach((item) => {
        num += item.qty;
      });
      return num;
    });
    function addCart(productId, buyNum) {
      emitter.emit('open-loading');
      frontApiMethod.addCart(productId, buyNum).then(() => {
        getCart();
      });
    }
    function updateCart(cartItemNum, cartItemId) {
      emitter.emit('open-loading');
      frontApiMethod.editCart(cartItemNum, cartItemId).then((res) => {
        console.log(res.data);
        getCart();
      });
    }
    function editAmout(num, index) {
      if (num > 0) {
        console.log(num);
        cartList.value[index].qty += 1;
      } else {
        console.log(num);
        cartList.value[index].qty -= 1;
      }
      updateCart(cartList.value[index].qty, cartList.value[index].id);
    }
    function getCart() {
      frontApiMethod.getCart().then((res) => {
        cartList.value = JSON.parse(JSON.stringify(res.carts));
        console.log(cartList.value);
        cartTotal.value = res.total;
        emitter.emit('close-loading');
      });
    }
    function deleteCart(cartItemId) {
      emitter.emit('open-loading');
      frontApiMethod.deleteCart(cartItemId).then(() => {
        getCart();
      });
    }
    function deleteCartAll() {
      emitter.emit('open-loading');
      frontApiMethod.deleteCartAll().then(() => {
        getCart();
      });
    }
    const nowPath = computed(() => route.path);
    watch(nowPath, (newValue, oldValue) => {
      console.log(newValue, oldValue);
      if (newValue !== oldValue) {
        modalOpen.value = false;
      }
    });
    getCart();
    onMounted(() => {
      emitter.on('get-cart', getCart);
      emitter.on('add-cart', (data) => {
        addCart(data.id, data.num);
      });
    });
    onUnmounted(() => {
      modalOpen.value = false;
    });
    return {
      cartAmount,
      cartTotal,
      cartList,
      modalOpen,
      addCart,
      deleteCart,
      editAmout,
      deleteCartAll,
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
    <p v-show="cartAmount > 0" class="cart__number">{{ cartAmount }}</p>
    <i class="bi bi-cart text-xl text-white"></i>
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
            <p>返回繼續購物</p>
          </button>
          <button
            type="button"
            :disabled="cartList.length === 0"
            class="border border-gray-200 rounded py-1 px-2 hover:border-gray-300 bg-white"
            @click="deleteCartAll"
          >
            <p>刪除全部</p>
          </button>
        </div>
        <h2
          class="inline-block py-3 pl-8 pr-32 bg-black text-3xl text-white font-bold mb-8 self-start"
        >
          購物車
        </h2>
      </div>
      <ul
        class="cartList grid grid-cols-1 gap-y-4 flex-grow-1 overflow-y-auto px-8"
      >
        <li class="grid grid-cols-6 gap-2 border-b border-gray-300">
          <div class="col-span-3">
            <p class="text-sm text-gray-400 mb-2">品項</p>
          </div>
          <div class="col-span-2 flex justify-center">
            <p class="text-sm text-gray-400 mb-2">數量</p>
          </div>
          <div class="col-span-1 flex justify-center">
            <p class="text-sm text-gray-400 mb-2">刪除</p>
          </div>
        </li>
        <template v-for="(item, index) in cartList" :key="item.id">
          <li class="grid grid-cols-6 gap-2 hover:bg-gray-100/50 py-2">
            <div class="col-span-3 flex items-center">
              <img
                class="w-20"
                :src="item.product.imageUrl"
                :alt="`${item.product}圖片`"
              />
              <div class="ml-3">
                <p>{{ item.product.title }}</p>
                <p>NT$ {{ item.product.price }}</p>
              </div>
            </div>
            <div class="col-span-2 flex justify-center items-center">
              <div class="numberSwitcher">
                <button
                  type="button"
                  class="numberSwitcher__btn"
                  @click="editAmout(-1, index)"
                >
                  <i class="bi bi-dash text-xl"></i>
                </button>
                <input
                  class="numberSwitcher__numBox focus:outline-none"
                  type="number"
                  :value="item.qty"
                />
                <button
                  type="button"
                  class="numberSwitcher__btn"
                  @click="editAmout(1, index)"
                >
                  <i class="bi bi-plus text-xl"></i>
                </button>
              </div>
            </div>
            <div class="col-span-1 flex justify-center items-center">
              <button
                type="button"
                class="border border-gray-200 rounded py-1 px-2 hover:border-gray-300 bg-white"
                @click="deleteCart(item.id)"
              >
                <i class="bi bi-x text-xl"></i>
              </button>
            </div>
          </li>
        </template>
      </ul>
      <div
        class="w-full absolute left-0 bottom-0 border-t border-gray-300 bg-white p-5 flex justify-between items-center"
      >
        <div>
          <p class="text-sm text-gray-400 mb-1">總金額</p>
          <p class="text-xl font-bold">NT$ {{ cartTotal }}</p>
        </div>
        <router-link
          to="/checkout"
          class="bg-black rounded py-2 px-3 hover:bg-gray-800 text-white"
        >
          前往結帳
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>

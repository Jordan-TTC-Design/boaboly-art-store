<script>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { frontApiMethod } from '@/methods/api.js';
import emitter from '@/methods/emitter';

export default {
  emits: ['fix-window'],
  setup(props, { emit }) {
    const route = useRoute();
    const modalOpen = ref(false);
    const cartTotal = ref(0);
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
        emitter.emit('open-pop-reminder', '成功加入購物車 !');
      });
    }
    function updateCart(cartItemNum, cartItemId) {
      emitter.emit('open-loading');
      frontApiMethod.editCart(cartItemNum, cartItemId).then(() => {
        getCart();
      });
    }
    function editAmout(num, index) {
      if (cartList.value[index].qty > 1) {
        if (num > 0) {
          cartList.value[index].qty += 1;
        } else {
          cartList.value[index].qty -= 1;
        }
        updateCart(cartList.value[index].qty, cartList.value[index].id);
      }
    }
    function getCart() {
      frontApiMethod.getCart().then((res) => {
        cartList.value = JSON.parse(JSON.stringify(res.carts));
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
            <p>返回</p>
          </button>
          <button
            type="button"
            v-if="cartList.length > 0"
            class="border border-gray-200 rounded py-1 px-2 hover:border-gray-300 bg-white"
            @click="deleteCartAll"
          >
            <p>刪除全部</p>
          </button>
        </div>
        <h2
          class="inline-block py-3 px-8 bg-black text-2xl text-white font-bold self-start"
        >
          購物車
        </h2>
      </div>
      <ul
        class="cartList grid grid-cols-1 flex-grow-1 overflow-y-auto px-8 pb-36"
      >
        <li class="grid md:grid-cols-6 gap-2 border-b border-gray-300">
          <div class="md:col-span-3">
            <p class="text-sm text-gray-400 mb-2">品項</p>
          </div>
          <div class="col-span-2 md:flex hidden justify-center">
            <p class="text-sm text-gray-400 mb-2">數量</p>
          </div>
          <div class="col-span-1 md:flex hidden justify-center">
            <p class="text-sm text-gray-400 mb-2">刪除</p>
          </div>
        </li>
        <template v-for="(item, index) in cartList" :key="item.id">
          <li
            :class="{
              'border-b border-gray-300': index < cartList.length - 1,
            }"
            class="grid md:grid-cols-6 grid-cols-2 gap-2 hover:bg-gray-100/50 py-6"
          >
            <div class="md:col-span-3 col-span-2 flex items-center">
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
            <div
              class="md:col-span-2 col-span-1 flex justify-center items-center"
            >
              <div class="numberSwitcher w-full">
                <button
                  type="button"
                  class="numberSwitcher__btn"
                  :class="{
                    'text-gray-300': item.qty <= 1,
                    'cursor-default': item.qty <= 1,
                  }"
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
            <div
              class="col-span-1 flex md:justify-center justify-end items-center"
            >
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
        <RouterLink
          :to="cartList.length === 0 ? '' : '/checkout'"
          :class="{ 'opacity-50': cartList.length === 0 }"
          class="bg-black rounded py-2 px-3 hover:bg-gray-800 text-white"
        >
          前往結賬
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>

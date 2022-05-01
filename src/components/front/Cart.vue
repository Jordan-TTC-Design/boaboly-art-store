<script>
import { watch, computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { cartStore } from '@/stores/cartStore';
import { statusStore } from '@/stores/statusStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const cartData = cartStore();
    const statusData = statusStore();
    const route = useRoute();
    const nowPath = computed(() => route.path);
    watch(nowPath, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        statusData.cartModel = false;
      }
    });
    function goToPage(url) {
      router.push(url);
    }
    cartData.getCart();
    onUnmounted(() => {
      statusData.cartModel = false;
    });
    return {
      cartData,
      statusData,
      goToPage,
    };
  },
};
</script>

<template>
  <button
    type="button"
    class="rounded py-2 px-3 hover:border-gray-300 hover:bg-white/50 relative"
    @click="statusData.cartModel = !statusData.cartModel"
  >
    <p v-show="cartData.cartAmount > 0" class="cart__number">
      {{ cartData.cartAmount }}
    </p>
    <i class="bi bi-cart text-xl text-white"></i>
  </button>
  <div
    class="siderBg--x z-sider"
    :class="{ active: statusData.cartModel }"
    @click="statusData.cartModel = false"
  ></div>
  <div class="siderBox--x z-sider" :class="{ active: statusData.cartModel }">
    <div class="relative h-full flex flex-col">
      <div class="p-8">
        <div class="flex justify-between mb-4">
          <button
            type="button"
            class="px-3 py-2 flex items-center"
            @click="statusData.cartModel = false"
          >
            <i class="bi bi-chevron-double-left mr-1"></i>
            <p>返回</p>
          </button>
          <button
            type="button"
            v-if="cartData.carts.length > 0"
            class="border border-gray-200 rounded py-1 px-2 hover:border-gray-300 bg-white"
            @click="
              statusData.openPopInfoBox(
                '刪除全部',
                `請問你要刪除購物車中全部商品？`,
                function () {
                  cartData.deleteCartAll();
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
          購物車
        </h2>
      </div>
      <ul class="cartList flex flex-col flex-grow-1 overflow-y-auto px-8 pb-36">
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
        <template v-for="(item, index) in cartData.carts" :key="item.id">
          <li
            @click.self="goToPage(`/products/${item.product.id}`)"
            :class="{
              'border-b border-gray-300': index < cartData.carts.length - 1,
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
                  @click.stop="cartData.editCartAmount(-1, index)"
                >
                  <i class="bi bi-dash text-xl"></i>
                </button>
                <input
                  class="numberSwitcher__numBox focus:outline-none"
                  type="number"
                  :value="item.qty"
                  readonly
                />
                <button
                  type="button"
                  class="numberSwitcher__btn"
                  @click.stop="cartData.editCartAmount(1, index)"
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
                @click.stop="
                  statusData.openPopInfoBox(
                    '刪除項目',
                    `請問你要刪除購物車中的${item.product.title}？`,
                    function () {
                      cartData.deleteCart(item.id);
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
          v-if="cartData.carts.length === 0"
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
      <div
        class="w-full absolute left-0 bottom-0 border-t border-gray-300 bg-white p-5 flex justify-between items-center"
      >
        <div>
          <p class="text-sm text-gray-400 mb-1">總金額</p>
          <p class="text-xl font-bold">NT$ {{ cartData.cartTotal }}</p>
        </div>
        <RouterLink
          :to="cartData.carts.length === 0 ? '' : '/checkout'"
          :class="{ 'opacity-50': cartData.carts.length === 0 }"
          class="bg-black rounded py-2 px-3 hover:bg-gray-800 text-white"
        >
          前往結賬
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { frontApiMethod } from '@/methods/api.js';
import {
  defaultOrderData,
  orderStatus,
  shippingWay,
  payWay,
} from '@/methods/order.js';
import emitter from '@/methods/emitter';
import VeeFormInput from '@/components/form/VeeFormInput.vue';
import FormInputTextArea from '@/components/form/FormInputTextArea.vue';
import { Form } from 'vee-validate';

export default {
  components: {
    VeeFormInput,
    FormInputTextArea,
    Form,
  },
  setup() {
    const router = useRouter();
    let cartTotal = ref(0);
    let checkStage = ref(1);
    const cartList = ref([]);
    let shipping = computed(() => {
      let num = 60;
      if (cartTotal.value >= 1000) {
        num = 0;
      }
      return num;
    });
    let finalTotal = computed(() => cartTotal.value + shipping.value);
    const orderFormData = ref(JSON.parse(JSON.stringify(defaultOrderData)));
    function getCart() {
      frontApiMethod.getCart().then((res) => {
        cartList.value = JSON.parse(JSON.stringify(res.carts));
        cartTotal.value = res.total;
      });
    }
    function sendOrder() {
      orderFormData.value.user.shipping.price = shipping.value;
      orderFormData.value.user.finalPrice = finalTotal.value;
      frontApiMethod.postOrder(orderFormData.value).then(() => {
        emitter.emit('get-cart');
        router.push({ name: 'Home' });
        emitter.emit('open-pop-reminder', '購買成功 !');
      });
    }
    getCart();
    return {
      cartTotal,
      shipping,
      finalTotal,
      cartList,
      checkStage,
      orderFormData,
      sendOrder,
      orderStatus,
      shippingWay,
      payWay,
    };
  },
};
</script>
<template>
  <div class="bg-gray-100 relative md:py-16 pt-4 pb-16 min-h-screen">
    <div class="bg-primaryLight w-full h-96 absolute top-0"></div>
    <div
      class="sm:container sm:mx-auto mx-4 bg-white shadow-sm lg:p-24 md:p-12 p-8 pb-24"
    >
      <router-link
        :to="{ name: 'Home' }"
        class="px-3 py-2 flex items-center mb-4"
      >
        <i class="bi bi-chevron-double-left mr-1"></i>
        <p>返回繼續購物</p>
      </router-link>
      <div
        class="grid lg:grid-cols-12 grid-cols-1 gap-y-8"
        v-if="checkStage === 1"
      >
        <div class="lg:col-span-7">
          <ul
            class="carouter-link grid-cols-1 flex-grow-1 overflow-y-auto lg:px-8 mt-8"
          >
            <li class="grid grid-cols-6 gap-2 border-b border-gray-300">
              <div class="col-span-4">
                <p class="text-sm text-gray-400 mb-2">品項</p>
              </div>
              <div class="col-span-1 md:flex hidden justify-center">
                <p class="text-sm text-gray-400 mb-2">數量</p>
              </div>
              <div class="col-span-1 md:flex hidden justify-center">
                <p class="text-sm text-gray-400 mb-2">金額</p>
              </div>
            </li>
            <template v-for="(item, index) in cartList" :key="item.id">
              <li
                :class="{
                  'border-b border-gray-300': index < cartList.length - 1,
                }"
                class="grid md:grid-cols-6 grid-cols-2 gap-2 hover:bg-gray-100/50 py-4"
              >
                <div class="md:col-span-4 col-span-2 flex items-center">
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
                <div class="col-span-1 flex md:justify-center items-center">
                  <p>{{ item.qty }} 項</p>
                </div>
                <div
                  class="col-span-1 flex md:justify-center justify-end items-center"
                >
                  <p>NT$ {{ item.total }}</p>
                </div>
              </li>
            </template>
            <li
              class="col border-t border-gray-300 bg-white p-2 flex items-center"
            >
              <p class="text-sm text-gray-400 mr-3">總金額</p>
              <p class="text font-bold">NT$ {{ cartTotal }}</p>
            </li>
          </ul>
        </div>
        <div class="lg:col-span-5">
          <div class="border border-gray-300 p-6">
            <div class="border-b border-gray-300 mb-5">
              <p class="text-sm text-gray-400 mb-2">訂單狀態</p>
            </div>
            <p class="mb-3">
              <span class="text-sm text-gray-400 mr-4">商品總計</span>NT$
              {{ cartTotal }}
            </p>
            <div class="xs:flex-row flex-col xs: justify-between mb-3">
              <p>
                <span class="text-sm text-gray-400 mr-4">運費</span>
                {{ cartTotal >= 1000 ? '免運' : `NT$ ${shipping}` }}
              </p>
              <p v-show="cartTotal < 1000" class="text-red-500">
                尚未達到免運門檻
              </p>
            </div>
            <div class="mb-3 flex xs:flex-row flex-col xs:items-center">
              <label
                class="block uppercase tracking-wide text-sm text-gray-400 mr-4"
                for="discountTicket"
              >
                折扣碼
              </label>
              <input
                class="appearance-none bg-transparent border border-gray-300 text-gray-700 py-1.5 px-2 leading-tight focus:outline-none flex-grow"
                type="text"
                id="discountTicket"
                v-model="orderFormData.user.discount.ticket"
              />
            </div>
            <p class="mb-3">
              <span class="text-sm text-gray-400 mr-4">折扣金額</span>NT$
              {{ orderFormData.user.discount.price }}
            </p>
            <div
              class="border-t border-gray-300 bg-white pt-6 mt-6 xs:flex-row flex-col xs:justify-between items-center"
            >
              <div class="xs:mb-0 mb-4">
                <p class="text-sm text-gray-400 mb-1">總金額</p>
                <p class="text-xl font-bold">NT$ {{ finalTotal }}</p>
              </div>
              <button
                type="button"
                class="bg-black rounded py-2 px-3 hover:bg-gray-800 text-white"
                @click="checkStage = 2"
              >
                填寫收件人資料
              </button>
            </div>
          </div>
        </div>
      </div>
      <Form
        class="grid lg:grid-cols-12 grid-cols-1 gap-x-6"
        v-if="checkStage === 2"
        v-slot="{ errors }"
        @submit="sendOrder"
      >
        <div class="lg:col-span-7 flex flex-col gap-y-3">
          <VeeFormInput
            v-model="orderFormData.user.name"
            input-id="userName"
            input-type="text"
            :errors="errors"
            label-name="姓名"
            text-holder="請輸入姓名"
          />
          <VeeFormInput
            v-model="orderFormData.user.tel"
            input-id="userTel"
            input-type="text"
            :errors="errors"
            label-name="聯絡電話"
            text-holder="請輸入聯絡電話"
          />
          <VeeFormInput
            v-model="orderFormData.user.email"
            input-id="userEmail"
            input-type="email"
            :errors="errors"
            label-name="Email"
            text-holder="請輸入Email"
          />
          <div>
            <p
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
            >
              運送方式
            </p>
            <div class="flex gap-4">
              <template
                v-for="(shipping, index) in shippingWay"
                :key="shipping"
              >
                <button
                  type="button"
                  :class="{
                    'bg-black text-white':
                      orderFormData.user.shipping.way === index,
                  }"
                  class="border border-gray-300 py-1 px-2 hover:border-gray-300 bg-white"
                  @click="orderFormData.user.shipping.way = index"
                >
                  <p>{{ shipping }}</p>
                </button>
              </template>
            </div>
          </div>
          <VeeFormInput
            v-model="orderFormData.user.address"
            input-id="userAddress"
            input-type="text"
            :errors="errors"
            label-name="地址"
            text-holder="請輸入地址"
          />
          <div>
            <FormInputTextArea
              v-model="orderFormData.messages"
              input-id="messages"
              text-area-row="5"
              text-holder="如您有任何需求，請在此留言。"
            >
              <template v-slot:default>訂單備註</template>
            </FormInputTextArea>
          </div>
        </div>
        <div class="lg:col-span-5">
          <div class="border border-gray-300 md:p-6 p-4">
            <div class="border-b border-gray-300 mb-5">
              <p class="text-sm text-gray-400 mb-2">付款資訊</p>
            </div>
            <p
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
            >
              付款方式
            </p>
            <div class="flex flex-wrap md:mb-12 mb-4 md:gap-4 gap-2">
              <template v-for="(pay, index) in payWay" :key="pay">
                <button
                  type="button"
                  :class="{
                    'bg-black text-white': orderFormData.user.pay.way === index,
                  }"
                  class="border border-gray-300 py-1 px-2 hover:border-gray-300 bg-white"
                  @click="orderFormData.user.pay.way = index"
                >
                  <p>{{ pay }}</p>
                </button>
              </template>
            </div>
            <div
              class="border-t border-gray-300 bg-white pt-6 mt-6 xs:flex-row flex-col xs:justify-between items-center"
            >
              <div class="xs:mb-0 mb-4">
                <p class="text-sm text-gray-400 mb-1">總金額</p>
                <p class="text-xl font-bold">NT$ {{ finalTotal }}</p>
              </div>
              <button
                :disabled="
                  Object.keys(errors).length === 0 && cartList.length === 0
                "
                type="submit"
                :class="{
                  'bg-opacity-50 hover:bg-opacity-50':
                    Object.keys(errors).length === 0 && cartList.length === 0,
                }"
                class="bg-black rounded py-2 px-3 hover:bg-gray-800 text-white"
              >
                確定付款
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>
<style lang="scss"></style>

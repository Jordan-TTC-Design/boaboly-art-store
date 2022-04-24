<script>
import { ref, watch, computed, onUnmounted } from 'vue';
import { apiMethod } from '@/methods/api.js';
import {
  shippingWay,
  payWay,
  payStatus,
  shippingStatus,
  orderStatus,
} from '@/methods/order.js';
import MoreMenu from '@/components/helpers/MoreMenu.vue';
import VeeFormInput from '@/components/form/VeeFormInput.vue';
import FormInputTextArea from '@/components/form/FormInputTextArea.vue';
import { Form } from 'vee-validate';

export default {
  components: { MoreMenu, VeeFormInput, FormInputTextArea, Form },
  props: ['select-order'],
  emits: ['get-orders'],
  setup(props, { emit }) {
    const modalOpen = ref(false);
    const editMode = ref(false);
    const listOpen = ref(false);
    const selectItem = computed(() => props.selectOrder);
    function deleteOrder(itemId) {
      apiMethod.adminDeleteOrder(itemId).then(() => {
        modalOpen.value = false;
        emit('get-orders');
      });
    }
    function adminPutOrder(itemId) {
      apiMethod.adminPutOrder(itemId, selectItem.value).then(() => {
        modalOpen.value = false;
        emit('get-orders');
      });
    }
    function changePayState() {
      selectItem.value.is_paid = !selectItem.value.is_paid;
      if (selectItem.value.is_paid) {
        selectItem.value.user.pay.status = 1;
      } else {
        selectItem.value.user.pay.status = 0;
      }
      adminPutOrder(selectItem.value.id);
    }
    function changeShippingStatus() {
      if (selectItem.value.user.shipping.status < 1) {
        selectItem.value.user.shipping.status = 1;
        selectItem.value.user.orderStatus = 2;
      } else {
        selectItem.value.user.shipping.status = 0;
        selectItem.value.user.orderStatus = 1;
      }
      adminPutOrder(selectItem.value.id);
    }
    watch(selectItem, () => {
      modalOpen.value = true;
    });
    watch(modalOpen, () => {
      if (!modalOpen.value) {
        editMode.value = modalOpen.value;
      }
    });
    onUnmounted(() => {
      modalOpen.value = false;
    });
    return {
      selectItem,
      modalOpen,
      editMode,
      listOpen,
      shippingWay,
      payWay,
      payStatus,
      shippingStatus,
      orderStatus,
      deleteOrder,
      adminPutOrder,
      changePayState,
      changeShippingStatus,
    };
  },
};
</script>

<template>
  <div
    class="siderBg--x z-sider w-2/3"
    :class="{ active: modalOpen }"
    @click="modalOpen = false"
  ></div>
  <div class="siderBox--x z-sider w-1/3" :class="{ active: modalOpen }">
    <Form
      class="relative h-full border border-gray-300 flex flex-col"
      v-if="modalOpen"
      v-slot="{ errors }"
      @submit="adminPutOrder(selectItem.id)"
    >
      <div
        class="flex justify-between items-center border-b border-gray-300 px-4 py-3"
      >
        <p class="text-lg text-black font-medium">
          編號：{{ `${selectItem.id.slice(1, 12)}... ` }}
        </p>
        <div class="flex">
          <MoreMenu :item-id="selectItem.id" @delete-item="deleteOrder" />
          <button
            type="button"
            class="border border-gray-200 rounded py-1 px-2 hover:border-gray-300 bg-white ml-2"
            @click="modalOpen = false"
          >
            <i class="bi bi-x text-xl"></i>
          </button>
        </div>
      </div>
      <div
        class="overflow-y-scroll px-4 py-3 flex-shrink"
        v-show="editMode === false"
      >
        <div class="border-b border-gray-300 mb-4">
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂購人名稱</p>
            <p class="orderInfoItem__content">{{ selectItem.user.name }}</p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">聯絡電話</p>
            <p class="orderInfoItem__content">{{ selectItem.user.tel }}</p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">聯絡信箱</p>
            <p class="orderInfoItem__content">{{ selectItem.user.email }}</p>
          </div>
        </div>
        <div class="border-b border-gray-300 mb-4">
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單編號</p>
            <p class="orderInfoItem__content">{{ selectItem.id }}</p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單日期</p>
            <p class="orderInfoItem__content">{{ selectItem.create_at }}</p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單狀態</p>
            <p class="orderInfoItem__content">
              {{ payStatus[selectItem.user.pay.status] }}
            </p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">運送方式</p>
            <p class="orderInfoItem__content">
              {{ shippingWay[selectItem.user.shipping.way] }}
            </p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">運送地址</p>
            <p class="orderInfoItem__content">
              {{ selectItem.user.address }}
            </p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單原金額</p>
            <p class="orderInfoItem__content">NT$ {{ selectItem.total }}</p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單運費</p>
            <p class="orderInfoItem__content">
              NT$ {{ selectItem.user.shipping.price }}
            </p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單折扣碼</p>
            <p class="orderInfoItem__content">
              {{ selectItem.user.discount.ticket || '無' }}
            </p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單折扣</p>
            <p class="orderInfoItem__content">
              {{ selectItem.user.discount.price || '無' }}
            </p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">訂單總金額</p>
            <p class="orderInfoItem__content">
              NT$ {{ selectItem.user.finalPrice }}
            </p>
          </div>
        </div>
        <div class="border-b border-gray-300 mb-4">
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">付款方式</p>
            <p class="orderInfoItem__content">{{ selectItem.user.name }}</p>
          </div>
          <div class="orderInfoItem">
            <p class="orderInfoItem__title">付款狀態</p>
            <p class="orderInfoItem__content">{{ selectItem.user.tel }}</p>
          </div>
        </div>
        <div class="orderInfoItem">
          <p class="orderInfoItem__title">購買商品項目</p>
          <button
            type="button"
            @click="listOpen = !listOpen"
            class="border border-gray-200 rounded py-1.5 px-3 hover:border-gray-300"
            :class="{
              'border-black text-black hover:border-black': listOpen,
            }"
          >
            展開
          </button>
        </div>
        <ul class="orderProductList" v-show="listOpen === true">
          <li
            class="flex justify-between mb-3"
            v-for="product in selectItem.products"
            :key="product.product.id"
          >
            <img
              class="w-12 h-12 mr-2"
              :src="product.product.imageUrl"
              :alt="`${product.product.title}產品圖片`"
            />
            <div class="flex-1 mr-2">
              <p>{{ product.product.title }}</p>
              <p class="text-sm text-gray-400">數量： {{ product.qty }} 個</p>
            </div>
            <p class="text-sm">NT$ {{ product.total }}</p>
          </li>
        </ul>
      </div>
      <div
        class="overflow-y-scroll px-4 py-3 flex-shrink"
        v-show="editMode === true"
      >
        <h3
          class="text-lg text-black font-medium mb-4 pb-4 border-b border-gray-300"
        >
          編輯訂單
        </h3>
        <div class="grid gap-4">
          <VeeFormInput
            v-model="selectItem.user.name"
            input-id="userName"
            input-type="text"
            :errors="errors"
            label-name="姓名"
            text-holder="請輸入姓名"
          />
          <VeeFormInput
            v-model="selectItem.user.name"
            input-id="userName"
            input-type="text"
            :errors="errors"
            label-name="姓名"
            text-holder="請輸入姓名"
          />
          <VeeFormInput
            v-model="selectItem.user.tel"
            input-id="userTel"
            input-type="text"
            :errors="errors"
            label-name="聯絡電話"
            text-holder="請輸入聯絡電話"
          />
          <VeeFormInput
            v-model="selectItem.user.email"
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
                      selectItem.user.shipping.way === index,
                  }"
                  class="border border-gray-300 py-1 px-2 hover:border-gray-300 bg-white"
                  @click="selectItem.user.shipping.way = index"
                >
                  <p>{{ shipping }}</p>
                </button>
              </template>
            </div>
          </div>
          <div>
            <p
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
            >
              出貨狀態
            </p>
            <div class="flex mb-3 gap-4">
              <template v-for="(pay, index) in shippingStatus" :key="pay">
                <button
                  type="button"
                  :class="{
                    'bg-black text-white':
                      selectItem.user.shipping.status === index,
                  }"
                  class="border border-gray-300 py-1 px-2 hover:border-gray-300 bg-white"
                  @click="selectItem.user.shipping.status = index"
                >
                  <p>{{ pay }}</p>
                </button>
              </template>
            </div>
          </div>
          <VeeFormInput
            v-model="selectItem.user.address"
            input-id="userAddress"
            input-type="text"
            :errors="errors"
            label-name="地址"
            text-holder="請輸入地址"
          />
          <FormInputTextArea
            v-model="selectItem.messages"
            input-id="messages"
            text-area-row="5"
            text-holder="如您有任何需求，請在此留言。"
          >
            <template v-slot:default>訂單備註</template>
          </FormInputTextArea>
          <div class="border-b border-gray-300">
            <p class="text-sm text-gray-400 mb-2 pl-2">付款資訊</p>
          </div>
          <div>
            <p
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
            >
              付款方式
            </p>
            <div class="flex mb-3 gap-4">
              <template v-for="(pay, index) in payWay" :key="pay">
                <button
                  type="button"
                  :class="{
                    'bg-black text-white': selectItem.user.pay.way === index,
                  }"
                  class="border border-gray-300 py-1 px-2 hover:border-gray-300 bg-white"
                  @click="selectItem.user.pay.way = index"
                >
                  <p>{{ pay }}</p>
                </button>
              </template>
            </div>
          </div>
          <div>
            <p
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pl-2"
            >
              付款狀態
            </p>
            <div class="flex mb-3 gap-4">
              <template v-for="(pay, index) in payStatus" :key="pay">
                <button
                  type="button"
                  :class="{
                    'bg-black text-white': selectItem.user.pay.status === index,
                  }"
                  class="border border-gray-300 py-1 px-2 hover:border-gray-300 bg-white"
                  @click="selectItem.user.pay.status = index"
                >
                  <p>{{ pay }}</p>
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-gray-100 p-4 flex justify-between"
        v-show="editMode === false"
      >
        <div class="flex">
          <button
            type="button"
            @click="changePayState"
            class="rounded py-1.5 px-3 bg-white hover:bg-white/50 mr-2"
          >
            {{ selectItem.is_paid ? '變更未收' : '變更已收' }}
          </button>
          <button
            type="button"
            @click="editMode = true"
            class="rounded py-1.5 px-3 bg-white hover:bg-white/50"
          >
            編輯訂單
          </button>
        </div>
        <button
          type="button"
          @click="changeShippingStatus"
          class="rounded py-1.5 px-3 text-white bg-black hover:bg-black/80"
        >
          出貨
        </button>
      </div>
      <div
        class="bg-gray-100 p-4 flex justify-between"
        v-show="editMode === true"
      >
        <button
          type="button"
          @click="editMode = false"
          class="rounded py-1.5 px-3 bg-white hover:bg-white/50 mr-2"
        >
          取消編輯
        </button>
        <button
          type="submit"
          class="rounded py-1.5 px-3 text-white bg-black hover:bg-black/80"
        >
          保存
        </button>
      </div>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
.orderInfoItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  &__title {
    font-size: 0.75rem;
    color: #979797;
  }
}
</style>

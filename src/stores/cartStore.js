import { defineStore } from 'pinia';
import { frontApiMethod } from '@/methods/api.js';
import { statusStore } from '@/stores/statusStore';
const statusData = statusStore();
export const cartStore = defineStore({
  id: 'cartStore',
  state: () => ({
    carts: [],
    cartTotal: 0,
    targetItem: {},
  }),
  getters: {
    cartAmount: (state) => {
      let num = 0;
      state.carts.forEach((item) => {
        num += item.qty;
      });
      return num;
    },
    shippingFee: (state) => {
      let num = 60;
      if (state.cartTotal >= 1000) {
        num = 0;
      }
      return num;
    },
    orderTotal(state) {
      return this.shippingFee + state.cartTotal;
    },
  },
  actions: {
    getCart() {
      statusData.isLoading = true;
      frontApiMethod.getCart().then((res) => {
        this.carts = JSON.parse(JSON.stringify(res.carts));
        this.cartTotal = res.total;
        statusData.isLoading = false;
      });
    },
    addCart(productId, buyNum) {
      statusData.isLoading = true;
      frontApiMethod.addCart(productId, buyNum).then(() => {
        statusData.openPopReminder('成功加入購物車');
        this.getCart();
      });
    },
    updateCart(cartItemNum, cartItemId) {
      statusData.isLoading = true;
      frontApiMethod.editCart(cartItemNum, cartItemId).then(() => {
        this.getCart();
      });
    },
    deleteCart(cartItemId) {
      statusData.isLoading = true;
      frontApiMethod.deleteCart(cartItemId).then(() => {
        statusData.openPopReminder('成功刪除');
        this.getCart();
      });
    },
    deleteCartAll() {
      statusData.isLoading = true;
      frontApiMethod.deleteCartAll().then(() => {
        statusData.openPopReminder('成功刪除');
        this.getCart();
      });
    },
    editCartAmount(targetNum, targetIndex) {
      if (targetNum > 0) {
        this.carts[targetIndex].qty += 1;
        this.updateCart(
          this.carts[targetIndex].qty,
          this.carts[targetIndex].id
        );
      } else {
        if (this.carts[targetIndex].qty > 1) {
          this.carts[targetIndex].qty -= 1;
          this.updateCart(
            this.carts[targetIndex].qty,
            this.carts[targetIndex].id
          );
        }
      }
    },
  },
});

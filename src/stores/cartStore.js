import { defineStore } from 'pinia';
import { frontApiMethod } from '@/methods/api.js';
import { statusStore } from '@/stores/statusStore';
const statusData = statusStore();
export const cartStore = defineStore({
  id: 'cartStore',
  state: () => ({
    carts: [],
    cartTotal: 0,
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
        this.getCart();
      });
    },
    deleteCartAll() {
      statusData.isLoading = true;
      frontApiMethod.deleteCartAll().then(() => {
        this.getCart();
      });
    },
    editCartAmount(num, index) {
      if (this.carts[index].qty > 1) {
        if (num > 0) {
          this.carts[index].qty += 1;
        } else {
          this.carts[index].qty -= 1;
        }
        this.updateCart(this.carts[index].qty, this.carts[index].id);
      }
    },
  },
});

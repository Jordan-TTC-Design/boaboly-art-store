import { defineStore } from 'pinia';
import { frontApiMethod } from '@/methods/api.js';
import { statusStore } from '@/stores/statusStore';
const statusData = statusStore();
export const productStore = defineStore({
  id: 'productStore',
  state: () => ({
    products: [],
    collections: [],
  }),
  getters: {},
  actions: {
    getProducts() {
      statusData.isLoading = true;
      frontApiMethod.getProductAll().then((res) => {
        this.products = JSON.parse(JSON.stringify(res));
        console.log(this.products);
        statusData.isLoading = false;
      });
    },
    getCollections() {
      this.collections = JSON.parse(
        localStorage.getItem('boaboly-store-collection')
      );
    },
  },
});

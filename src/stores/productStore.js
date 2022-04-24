import { defineStore } from 'pinia';
import { frontApiMethod } from '@/methods/api.js';
import { statusStore } from '@/stores/statusStore';
const statusData = statusStore();
export const productStore = defineStore({
  id: 'productStore',
  state: () => ({
    products: [],
    hotProducts: [],
    collections: [],
  }),
  getters: {
    collectionProduct(state) {
      let array = [];
      state.collections.forEach((itemId) => {
        state.products.forEach((item) => {
          if (item.id == itemId) {
            array.push(item);
          }
        });
      });
      return array;
    },
  },
  actions: {
    getProducts() {
      statusData.isLoading = true;
      frontApiMethod.getProductAll().then((res) => {
        this.products = JSON.parse(JSON.stringify(res));
        statusData.isLoading = false;
      });
    },
    getHotProducts() {
      statusData.isLoading = true;
      frontApiMethod.getProductAll().then((res) => {
        if (res) {
          this.hotProducts = JSON.parse(JSON.stringify(res)).filter(
            (item) => item.promoted.star > 0
          );
          statusData.isLoading = false;
        }
      });
    },
    getCollections() {
      this.collections = JSON.parse(
        localStorage.getItem('boaboly-store-collection')
      );
    },
    addCollection(product) {
      const newId = product.id;
      const check = this.collections.indexOf(newId);
      if (check < 0) {
        this.collections.push(newId);
        localStorage.setItem(
          'boaboly-store-collection',
          JSON.stringify(this.collections)
        );
        statusData.openPopReminder('已加入收藏');
      } else {
        this.collections.splice(check, 1);
        localStorage.setItem(
          'boaboly-store-collection',
          JSON.stringify(this.collections)
        );
        statusData.openPopReminder('已移除收藏');
      }
      this.getCollections();
    },
    deleteAllCollections() {
      localStorage.setItem('boaboly-store-collection', JSON.stringify([]));
      this.getCollections();
    },
  },
});

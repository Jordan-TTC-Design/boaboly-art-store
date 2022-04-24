import { defineStore } from 'pinia';
import { apiMethod } from '@/methods/api.js';
import { defaultProductData } from '@/methods/data.js';

export const adminStore = defineStore({
  id: 'adminStore',
  state: () => ({
    products: [],
    productItem: JSON.parse(JSON.stringify(defaultProductData)),
    productModel: { open: false, state: '' },
    imagePopModel: false,
  }),
  getters: {},
  actions: {
    getProduct() {
      apiMethod.adminGetProductsAll().then((res) => {
        if (res) {
          this.products = Object.values(res);
        }
      });
    },
    async deleteProduct(itemId) {
      try {
        await apiMethod.adminDeleteProduct(itemId);
        this.getProduct();
        this.productItem = JSON.parse(JSON.stringify(defaultProductData));
      } catch (err) {
        console.log(err);
      }
    },
    changeProductState(productData) {
      productData.is_enabled = !productData.is_enabled;
      this.updateProduct(productData.id, productData);
    },
    async updateProduct(itemId, productData) {
      try {
        await apiMethod.adminUpdateProduct(itemId, productData);
        this.getProduct();
      } catch (err) {
        console.log(err);
      }
    },
  },
});

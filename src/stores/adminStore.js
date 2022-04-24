import { defineStore } from 'pinia';
import { apiMethod } from '@/methods/api.js';
import { defaultProductData } from '@/methods/data.js';
import { defaultArticleData } from '@/methods/article.js';

export const adminStore = defineStore({
  id: 'adminStore',
  state: () => ({
    products: [],
    productItem: JSON.parse(JSON.stringify(defaultProductData)),
    productModel: { open: false, state: '' },
    imagePopModel: false,
    articles: [],
    articleItem: JSON.parse(JSON.stringify(defaultArticleData)),
    articleModel: { open: false, state: '' },
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
    newProduct() {
      if (this.productModel.state === 'isNew') {
        apiMethod.adminPostProduct(this.productItem).then(() => {
          this.getProduct();
          this.clearProductItem();
        });
      } else if (this.productModel.state === 'edit') {
        apiMethod
          .adminUpdateProduct(this.productItem.id, this.productItem)
          .then(() => {
            this.getProduct();
            this.clearProductItem();
          });
      }
    },
    clearProductItem() {
      this.productModel.open = false;
      this.productModel.state = '';
      this.productItem = JSON.parse(JSON.stringify(defaultProductData));
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
    changeArticleState(articleData) {
      apiMethod.adminGetArticle(articleData.id).then((res) => {
        articleData = JSON.parse(JSON.stringify(res));
        articleData.isPublic = !articleData.isPublic;
        this.updateArticle(articleData.id, articleData);
      });
    },
    getArticles() {
      apiMethod.adminGetArticles().then((res) => {
        if (res) {
          this.articles = Object.values(res.articles);
        }
      });
    },
    async updateArticle(articleId, articleData) {
      try {
        await apiMethod.adminUpdateArticle(articleId, articleData);
        this.getArticles();
      } catch (err) {
        console.log(err);
      }
    },
    async deleteArticle(articleId) {
      try {
        await apiMethod.adminDeleteArticle(articleId);
        this.getArticles();
      } catch (err) {
        console.log(err);
      }
    },
    clearArticleItem() {
      this.articleModel.state = '';
      this.articleItem = JSON.parse(JSON.stringify(defaultArticleData));
    },
  },
});

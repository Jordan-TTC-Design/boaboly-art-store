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
    articles: [],
    articleItem: JSON.parse(JSON.stringify(defaultArticleData)),
    articleModel: { open: false, state: '' },
    imgCropperModel: false,
    cropImg: { imgName: '', file: null, imgUrl: '' },
    toCropImg: {},
  }),
  getters: {},
  actions: {
    getImgToCrop(name, file) {
      this.toCropImg['imgName'] = name;
      this.toCropImg['file'] = file;
      this.imgCropperModel = true;
    },
    closeImgToCrop() {
      this.imgCropperModel = false;
      this.cleanImgToCrop();
    },
    cleanImgToCrop() {
      this.toCropImg = {};
    },
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
    deleteProduct(itemId) {
      apiMethod
        .adminDeleteProduct(itemId)
        .then(() => {
          this.getProduct();
          this.productItem = JSON.parse(JSON.stringify(defaultProductData));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeProductState(productData) {
      productData.is_enabled = !productData.is_enabled;
      this.updateProduct(productData.id, productData);
    },
    updateProduct(itemId, productData) {
      apiMethod
        .adminUpdateProduct(itemId, productData)
        .then(() => {
          this.getProduct();
        })
        .catch((err) => {
          console.log(err);
        });
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
    updateArticle(articleId, articleData) {
      apiMethod
        .adminUpdateArticle(articleId, articleData)
        .then(() => {
          this.getArticles();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteArticle(articleId) {
      apiMethod
        .adminDeleteArticle(articleId)
        .then(() => {
          this.getArticles();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clearArticleItem() {
      this.articleModel.state = '';
      this.articleItem = JSON.parse(JSON.stringify(defaultArticleData));
    },
  },
});

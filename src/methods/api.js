import axios from 'axios';
const api = {
  url: import.meta.env.VITE_APP_URL,
  path: import.meta.env.VITE_APP_PATH,
};
const frontApiPath = {
  getProduct: `${api.url}/api/${api.path}/product`,
  getArticle: `${api.url}/api/${api.path}/article`,
  cart: `${api.url}/api/${api.path}/cart`,
  order: `${api.url}/api/${api.path}/order`,
};
const adminApiPath = {
  signin: `${api.url}/admin/signin`,
  checkLogin: `${api.url}/api/user/check`,
  adminGetProductsAll: `${api.url}/api/${api.path}/admin/products/all`,
  adminGetProducts: `${api.url}/api/${api.path}/admin/products`,
  adminPostProduct: `${api.url}/api/${api.path}/admin/product`,
  adminDeleteProduct: `${api.url}/api/${api.path}/admin/product`,
  adminUpdateProduct: `${api.url}/api/${api.path}/admin/product`,
  imgUpload: `${api.url}/api/${api.path}/admin/upload`,
  adminOrders: `${api.url}/api/${api.path}/admin/orders`,
  adminOrder: `${api.url}/api/${api.path}/admin/order`,
  adminArticle: `${api.url}/api/${api.path}/admin/article`,
};

const token = document.cookie.replace(
  // eslint-disable-next-line no-useless-escape
  /(?:(?:^|.*;\s*)ttcDesignToken\s*\=\s*([^;]*).*$)|^.*$/,
  '$1'
);
// 把Authorization加到HEADER
axios.defaults.headers.common['Authorization'] = token;
const frontApiMethod = {
  getProductAll() {
    return axios
      .get(`${frontApiPath.getProduct}s/all`)
      .then((res) => {
        return res.data.products;
      })
      .catch((err) => {
        console.dir(err.response);
      });
  },
  getProducts() {
    return axios
      .get(`${frontApiPath.getProduct}s`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.dir(err.response);
      });
  },
  getProduct(productId) {
    return axios
      .get(`${frontApiPath.getProduct}/${productId}`)
      .then((res) => {
        return res.data.product;
      })
      .catch((err) => {
        console.dir(err.response);
      });
  },
  getArts(pageNum = 1) {
    return axios
      .get(`${frontApiPath.getArticle}s?page=${pageNum}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.dir(err.response);
      });
  },
  getArt(articleId) {
    return axios
      .get(`${frontApiPath.getArticle}/${articleId}`)
      .then((res) => {
        return res.data.article;
      })
      .catch((err) => {
        console.dir(err.response);
      });
  },
  getCart() {
    return axios
      .get(frontApiPath.cart)
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {
        console.dir(err.response);
      });
  },
  addCart(productId, buyNum = 1) {
    const data = {
      product_id: productId,
      qty: buyNum,
    };
    return axios
      .post(frontApiPath.cart, { data })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.dir(err.response);
      });
  },
  editCart(cartItemNum, cartItemId) {
    const data = {
      product_id: cartItemId,
      qty: cartItemNum,
    };
    return axios
      .put(`${frontApiPath.cart}/${cartItemId}`, { data })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.dir(err.response);
      });
  },
  deleteCart(productId) {
    return axios
      .delete(`${frontApiPath.cart}/${productId}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.dir(err.response);
      });
  },
  deleteCartAll() {
    return axios
      .delete(`${frontApiPath.cart}s`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.dir(err.response);
      });
  },
  postOrder(formData) {
    const data = formData;
    return axios
      .post(frontApiPath.order, { data })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.dir(err.response);
      });
  },
};
const apiMethod = {
  login(user) {
    return axios
      .post(adminApiPath.signin, user)
      .then((res) => {
        //把 token 和 expired 儲存在 cookie
        const { token, expired } = res.data;
        document.cookie = `ttcDesignToken=${token}; expires=${new Date(
          expired
        )};`;
        return 'success';
      })
      .catch((err) => {
        console.log(err.data);
      });
  },
  checkLogin() {
    const token = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)ttcDesignToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common['Authorization'] = token;
    return axios
      .post(adminApiPath.checkLogin)
      .then((res) => {
        return res.data.success;
      })
      .catch((err) => {
        console.log(err.response);
        return false;
      });
  },
  adminGetProductsAll() {
    return axios
      .get(adminApiPath.adminGetProductsAll)
      .then((res) => {
        return res.data.products;
      })
      .catch((err) => {
        console.dir(err.response.status);
      });
  },
  adminPostProduct(productData) {
    const product = {
      data: {
        ...productData,
      },
    };
    return axios
      .post(adminApiPath.adminPostProduct, product)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  adminDeleteProduct(itemId) {
    return axios
      .delete(`${adminApiPath.adminDeleteProduct}/${itemId}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  adminUpdateProduct(itemId, productData) {
    const product = {
      data: {
        ...productData,
      },
    };
    return axios
      .put(`${adminApiPath.adminUpdateProduct}/${itemId}`, product)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  adminImageUpload(file) {
    const formData = new FormData(); // 產生表單格式
    formData.append('file-to-upload', file);
    return axios
      .post(`${adminApiPath.imgUpload}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        return res.data.imageUrl;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  adminGetOrders() {
    return axios
      .get(adminApiPath.adminOrders)
      .then((res) => {
        return res.data.orders;
      })
      .catch((err) => {
        console.dir(err.response.status);
      });
  },
  adminPutOrder(orderId, formData) {
    const data = formData;
    return axios
      .put(`${adminApiPath.adminOrder}/${orderId}`, { data })
      .then((res) => {
        return res.data.orders;
      })
      .catch((err) => {
        console.dir(err.response.status);
      });
  },
  adminDeleteOrdersAll() {
    return axios
      .delete(`${adminApiPath.adminOrders}/all`)
      .then((res) => {
        return res.data.orders;
      })
      .catch((err) => {
        console.dir(err.response.status);
      });
  },
  adminDeleteOrder(orderId) {
    return axios
      .delete(`${adminApiPath.adminOrder}/${orderId}`)
      .then((res) => {
        return res.data.orders;
      })
      .catch((err) => {
        console.dir(err.response.status);
      });
  },
  adminGetArticles(pageNum = 1) {
    return axios
      .get(`${adminApiPath.adminArticle}s?page=${pageNum}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  adminGetArticle(articleId) {
    return axios
      .get(`${adminApiPath.adminArticle}/${articleId}`)
      .then((res) => {
        return res.data.article;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  adminPostArticle(ArticleData) {
    const article = {
      data: {
        ...ArticleData,
      },
    };
    return axios
      .post(adminApiPath.adminArticle, article)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  adminUpdateArticle(articleId, articleData) {
    const data = articleData;
    return axios
      .put(`${adminApiPath.adminArticle}/${articleId}`, { data })
      .then((res) => {
        return res;
        // return res.data.Articls;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  adminDeleteArticle(articleId) {
    return axios
      .delete(`${adminApiPath.adminArticle}/${articleId}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.dir(err.response.status);
      });
  },
  turnBackLogin(status) {
    if (status === 401 || status === 403) {
      window.location = '/boaboly-art-store/#/admin-login';
    }
  },
};
export { frontApiMethod, apiMethod };

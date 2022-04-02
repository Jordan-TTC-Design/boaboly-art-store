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
        console.log('成功取得全部商品資料');
        console.log(res);
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
        console.log('成功取得多筆商品資料');
        console.log(res);
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
        console.log('成功取得商品資料');
        console.log(res);
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
        console.log('成功取得多筆創作資料');
        console.log(res.data);
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
        console.log('成功取得創作資料');
        console.log(res);
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
        console.log('成功取得購物車資料');
        console.log(res);
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
        console.log('已加入購物車');
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
        console.log('修改成功');
        console.log(res);
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
        console.log('刪除成功');
        console.log(res);
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
        console.log('修改成功');
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        console.dir(err.response);
      });
  },
  postOrder(formData) {
    const data = formData;
    console.log({ data });
    return axios
      .post(frontApiPath.order, { data })
      .then((res) => {
        console.log('送出成功');
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        console.dir(err.response);
      });
  },
};
const apiMethod = {
  login(user) {
    axios
      .post(adminApiPath.signin, user)
      .then((res) => {
        console.log(res);
        //把 token 和 expired 儲存在 cookie
        const { token, expired } = res.data;
        document.cookie = `ttcDesignToken=${token}; expires=${new Date(
          expired
        )};`;
        console.log('success');
        window.location = '/#/admin';
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
        console.log(res);
        return res.data.success;
      })
      .catch((err) => {
        console.log(err.response);
        this.turnBackLogin(err.response.status);
      });
  },
  adminGetProductsAll() {
    return axios
      .get(adminApiPath.adminGetProductsAll)
      .then((res) => {
        console.log('取得成功');
        console.log(res);
        return res.data.products;
      })
      .catch((err) => {
        console.dir(err.response.status);
      });
  },
  adminPostProduct(productData) {
    console.log(productData);
    const product = {
      data: {
        ...productData,
      },
    };
    return axios
      .post(adminApiPath.adminPostProduct, product)
      .then((res) => {
        console.log('新增成功');
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  adminDeleteProduct(itemId) {
    return axios
      .delete(`${adminApiPath.adminDeleteProduct}/${itemId}`)
      .then((res) => {
        console.log(res);
        console.log('刪除成功');
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
        console.log(res);
        console.log('更新成功');
      })
      .catch((err) => {
        console.log(err);
      });
  },
  adminImageUpload(file) {
    const formData = new FormData(); // 產生表單格式
    formData.append('file-to-upload', file);
    console.log(formData);
    return axios
      .post(`${adminApiPath.imgUpload}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
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
        console.log('取得成功');
        console.log(res);
        return res.data.orders;
      })
      .catch((err) => {
        console.dir(err.response.status);
      });
  },
  adminPutOrder(orderId, formData) {
    const data = formData;
    console.log({ data });
    return axios
      .put(`${adminApiPath.adminOrder}/${orderId}`, { data })
      .then((res) => {
        console.log('修改成功');
        console.log(res);
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
        console.log('刪除成功');
        console.log(res);
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
        console.log('刪除成功');
        console.log(res);
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
        console.log('取得成功');
        console.log(res.data.articles);
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
        console.log('取得成功');
        return res.data.article;
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  adminPostArticle(ArticleData) {
    console.log(ArticleData);
    const article = {
      data: {
        ...ArticleData,
      },
    };
    return axios
      .post(adminApiPath.adminArticle, article)
      .then((res) => {
        console.log('新增成功');
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  },
  adminUpdateArticle(articleId, articleData) {
    const data = articleData;
    console.log({ data });
    return axios
      .put(`${adminApiPath.adminArticle}/${articleId}`, { data })
      .then((res) => {
        console.log('修改成功');
        console.log(res);
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
        console.log('刪除成功');
        console.log(res.data);
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

import axios from 'axios';

const api = {
  url: 'https://vue3-course-api.hexschool.io/v2',
  path: 'boaboly-shop',
};
const frontApiPath = {
  getProduct: `${api.url}/api/${api.path}/product`,
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
};

const token = document.cookie.replace(
  // eslint-disable-next-line no-useless-escape
  /(?:(?:^|.*;\s*)ttcDesignToken\s*\=\s*([^;]*).*$)|^.*$/,
  '$1'
);
// 把Authorization加到HEADER
axios.defaults.headers.common['Authorization'] = token;
const frontApiMethod = {
  getProducts() {
    return axios
      .get(`${frontApiPath.getProduct}s`)
      .then((res) => {
        console.log('成功取得多筆商品資料');
        console.log(res);
        return res.data.products;
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
        console.log(res);
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
        window.location = '/admin';
      })
      .catch((err) => {
        console.log(err);
      });
  },
  checkLogin() {
    return axios
      .post(adminApiPath.checkLogin)
      .then((res) => {
        console.log(res);
        return res.data.success;
      })
      .catch((err) => {
        console.log(err);
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
  turnBackLogin(status) {
    if (status === 401) {
      window.location = '/admin-login';
    }
  },
};
export { frontApiMethod, apiMethod };

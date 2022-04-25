var u=Object.defineProperty;var d=Object.getOwnPropertySymbols;var p=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable;var i=(e,t,o)=>t in e?u(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,l=(e,t)=>{for(var o in t||(t={}))p.call(t,o)&&i(e,o,t[o]);if(d)for(var o of d(t))g.call(t,o)&&i(e,o,t[o]);return e};import{j as r}from"./vendor.eae21ba8.js";const n={url:"https://vue3-course-api.hexschool.io/v2",path:"boaboly-shop"},s={getProduct:`${n.url}/api/${n.path}/product`,getArticle:`${n.url}/api/${n.path}/article`,cart:`${n.url}/api/${n.path}/cart`,order:`${n.url}/api/${n.path}/order`},c={signin:`${n.url}/admin/signin`,checkLogin:`${n.url}/api/user/check`,adminGetProductsAll:`${n.url}/api/${n.path}/admin/products/all`,adminGetProducts:`${n.url}/api/${n.path}/admin/products`,adminPostProduct:`${n.url}/api/${n.path}/admin/product`,adminDeleteProduct:`${n.url}/api/${n.path}/admin/product`,adminUpdateProduct:`${n.url}/api/${n.path}/admin/product`,imgUpload:`${n.url}/api/${n.path}/admin/upload`,adminOrders:`${n.url}/api/${n.path}/admin/orders`,adminOrder:`${n.url}/api/${n.path}/admin/order`,adminArticle:`${n.url}/api/${n.path}/admin/article`},h=document.cookie.replace(/(?:(?:^|.*;\s*)ttcDesignToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");r.defaults.headers.common.Authorization=h;const P={getProductAll(){return r.get(`${s.getProduct}s/all`).then(e=>e.data.products).catch(e=>{console.dir(e.response)})},getProducts(){return r.get(`${s.getProduct}s`).then(e=>e.data).catch(e=>{console.dir(e.response)})},getProduct(e){return r.get(`${s.getProduct}/${e}`).then(t=>t.data.product).catch(t=>{console.dir(t.response)})},getArts(e=1){return r.get(`${s.getArticle}s?page=${e}`).then(t=>t.data).catch(t=>{console.dir(t.response)})},getArt(e){return r.get(`${s.getArticle}/${e}`).then(t=>t.data.article).catch(t=>{console.dir(t.response)})},getCart(){return r.get(s.cart).then(e=>(console.log("\u6210\u529F\u53D6\u5F97\u8CFC\u7269\u8ECA\u8CC7\u6599"),console.log(e),e.data.data)).catch(e=>{console.dir(e.response)})},addCart(e,t=1){const o={product_id:e,qty:t};return r.post(s.cart,{data:o}).then(a=>a.data).catch(a=>{console.dir(a.response)})},editCart(e,t){const o={product_id:t,qty:e};return r.put(`${s.cart}/${t}`,{data:o}).then(a=>a.data).catch(a=>{console.dir(a.response)})},deleteCart(e){return r.delete(`${s.cart}/${e}`).then(t=>t.data).catch(t=>{console.dir(t.response)})},deleteCartAll(){return r.delete(`${s.cart}s`).then(e=>(console.log("\u4FEE\u6539\u6210\u529F"),console.log(e),e.data)).catch(e=>{console.dir(e.response)})},postOrder(e){const t=e;return console.log({data:t}),r.post(s.order,{data:t}).then(o=>o.data).catch(o=>{console.dir(o.response)})}},A={login(e){return r.post(c.signin,e).then(t=>{console.log(t);const{token:o,expired:a}=t.data;return document.cookie=`ttcDesignToken=${o}; expires=${new Date(a)};`,"success"}).catch(t=>{console.log(t.data)})},checkLogin(){const e=document.cookie.replace(/(?:(?:^|.*;\s*)ttcDesignToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");return r.defaults.headers.common.Authorization=e,r.post(c.checkLogin).then(t=>(console.log(t),t.data.success)).catch(t=>(console.log(t.response),!1))},adminGetProductsAll(){return r.get(c.adminGetProductsAll).then(e=>(console.log("\u53D6\u5F97\u6210\u529F"),console.log(e),e.data.products)).catch(e=>{console.dir(e.response.status)})},adminPostProduct(e){console.log(e);const t={data:l({},e)};return r.post(c.adminPostProduct,t).then(o=>{console.log("\u65B0\u589E\u6210\u529F"),console.log(o)}).catch(o=>{console.log(o.response)})},adminDeleteProduct(e){return r.delete(`${c.adminDeleteProduct}/${e}`).then(t=>{console.log(t),console.log("\u522A\u9664\u6210\u529F")}).catch(t=>{console.log(t.response)})},adminUpdateProduct(e,t){const o={data:l({},t)};return r.put(`${c.adminUpdateProduct}/${e}`,o).then(a=>{console.log(a),console.log("\u66F4\u65B0\u6210\u529F")}).catch(a=>{console.log(a)})},adminImageUpload(e){const t=new FormData;return t.append("file-to-upload",e),console.log(t),r.post(`${c.imgUpload}`,t,{headers:{"Content-Type":"multipart/form-data"}}).then(o=>(console.log(o),o.data.imageUrl)).catch(o=>{console.log(o)})},adminGetOrders(){return r.get(c.adminOrders).then(e=>(console.log("\u53D6\u5F97\u6210\u529F"),console.log(e),e.data.orders)).catch(e=>{console.dir(e.response.status)})},adminPutOrder(e,t){const o=t;return console.log({data:o}),r.put(`${c.adminOrder}/${e}`,{data:o}).then(a=>(console.log("\u4FEE\u6539\u6210\u529F"),console.log(a),a.data.orders)).catch(a=>{console.dir(a.response.status)})},adminDeleteOrdersAll(){return r.delete(`${c.adminOrders}/all`).then(e=>(console.log("\u522A\u9664\u6210\u529F"),console.log(e),e.data.orders)).catch(e=>{console.dir(e.response.status)})},adminDeleteOrder(e){return r.delete(`${c.adminOrder}/${e}`).then(t=>(console.log("\u522A\u9664\u6210\u529F"),console.log(t),t.data.orders)).catch(t=>{console.dir(t.response.status)})},adminGetArticles(e=1){return r.get(`${c.adminArticle}s?page=${e}`).then(t=>(console.log("\u53D6\u5F97\u6210\u529F"),console.log(t.data.articles),t.data)).catch(t=>{console.log(t.response)})},adminGetArticle(e){return r.get(`${c.adminArticle}/${e}`).then(t=>(console.log("\u53D6\u5F97\u6210\u529F"),t.data.article)).catch(t=>{console.log(t.response)})},adminPostArticle(e){console.log(e);const t={data:l({},e)};return r.post(c.adminArticle,t).then(o=>{console.log("\u65B0\u589E\u6210\u529F"),console.log(o)}).catch(o=>{console.log(o.response)})},adminUpdateArticle(e,t){const o=t;return console.log({data:o}),r.put(`${c.adminArticle}/${e}`,{data:o}).then(a=>{console.log("\u4FEE\u6539\u6210\u529F"),console.log(a)}).catch(a=>{console.log(a.response)})},adminDeleteArticle(e){return r.delete(`${c.adminArticle}/${e}`).then(t=>(console.log("\u522A\u9664\u6210\u529F"),console.log(t.data),t.data)).catch(t=>{console.dir(t.response.status)})},turnBackLogin(e){(e===401||e===403)&&(window.location="/boaboly-art-store/#/admin-login")}};export{A as a,P as f};

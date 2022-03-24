const defaultOrderData = {
  user: {
    name: '',
    email: '',
    tel: '',
    address: '',
    shipping: {
      way: 0,
      price: 60,
      time: null,
      status: 0,
    },
    pay: {
      way: 0,
      time: null,
      status: 0,
    },
    discount: {
      ticket: '',
      price: 0,
    },
    finalPrice: 0,
    orderStatus: 0,
  },
  messages: '',
};
const shippingWay = ['宅配', '超商取貨'];
const payWay = ['信用卡', '銀行轉帳', '貨到付款'];
const payStatus = ['未付款', '已付款', '已退款'];
const shippingStatus = ['未出貨', '已出貨'];
const orderStatus = [
  '訂單未付款',
  '商品備貨中',
  '商品已出貨',
  '訂單已完成',
  '訂單已取消',
  '訂單已退款',
];
export {
  defaultOrderData,
  shippingWay,
  payWay,
  payStatus,
  shippingStatus,
  orderStatus,
};

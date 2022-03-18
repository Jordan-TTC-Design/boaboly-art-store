const productCategory = ['貼紙', '別針', '刺繡', '卡片', '鑰匙圈', '吊飾'];
const materialCategory = ['貼紙', '美術紙', '壓克力', '金屬', '塑膠'];
const unitCategory = ['個', '張', '本', '支', '枚', '組'];
const defaultProductData = {
  title: '',
  category: '',
  origin_price: 1,
  price: 1,
  unit: '',
  description: '',
  content: '',
  is_enabled: 1,
  imageUrl: '',
  imagesUrl: [''],
  material: '',
  size: {
    sizeLength: '',
    sizeWidth: '',
    sizeHeight: '',
  },
  promoted: {
    star: 0,
    event: {
      title: '',
      price: 0,
      is_enabled: 0,
    },
  },
  tags: [''],
  reserve: 1,
  store: 1,
  made: '',
};
const orderCategory = ['訂單未付款', '商品備貨中', '商品已出貨'];

export {
  defaultProductData,
  productCategory,
  materialCategory,
  unitCategory,
  orderCategory,
};

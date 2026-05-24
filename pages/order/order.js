// 点餐页逻辑
const { dishes, categories, searchDishes } = require('../../utils/dishes');
const app = getApp();

Page({
  data: {
    categories,
    activeCategory: '热菜',
    filteredDishes: [],
    keyword: '',
    cartItems: [],
    totalPrice: 0,
    totalCount: 0,
    showCart: false,
    showCartPopup: false,
    showConfirm: false
  },

  onLoad() {
    const savedCat = wx.getStorageSync('activeCategory');
    if (savedCat) {
      this.setData({ activeCategory: savedCat });
      wx.removeStorageSync('activeCategory');
    }
    this.filterDishes();
  },

  onShow() {
    this.filterDishes();
    this.updateCart();
  },

  switchCategory(e) {
    const cat = e.currentTarget.dataset.cat;
    this.setData({ activeCategory: cat, keyword: '' });
    this.filterDishes();
  },

  onSearch(e) {
    const keyword = e.detail.value;
    this.setData({ keyword });
    this.filterDishes();
  },

  clearSearch() {
    this.setData({ keyword: '' });
    this.filterDishes();
  },

  filterDishes() {
    let result;
    if (this.data.keyword) {
      result = searchDishes(this.data.keyword);
    } else {
      result = dishes.filter(d => d.category === this.data.activeCategory);
    }
    this.setData({ filteredDishes: result });
  },

  getCartQty(dishId) {
    const item = app.globalData.cart.find(i => i.id === dishId);
    return item ? item.quantity : 0;
  },

  addToCart(e) {
    const dish = e.currentTarget.dataset.dish;
    app.addToCart(dish);
    wx.vibrateShort({ type: 'light' });
    this.updateCart();
  },

  decreaseQty(e) {
    const dishId = e.currentTarget.dataset.id;
    const item = app.globalData.cart.find(i => i.id === dishId);
    if (item && item.quantity > 0) {
      app.updateCartQuantity(dishId, item.quantity - 1);
    }
    this.updateCart();
  },

  updateCart() {
    this.setData({
      cartItems: app.globalData.cart,
      totalPrice: app.getTotalPrice(),
      totalCount: app.getTotalCount(),
      showCart: app.globalData.cart.length > 0
    });
    if (this.data.totalCount > 0) {
      wx.setTabBarBadge({ index: 1, text: this.data.totalCount.toString() });
    } else {
      wx.removeTabBarBadge({ index: 1 });
    }
  },

  toggleCartPopup() {
    this.setData({ showCartPopup: !this.data.showCartPopup });
  },

  closeCartPopup() {
    this.setData({ showCartPopup: false });
  },

  clearCart() {
    var that = this;
    wx.showModal({
      title: '确认清空？',
      content: '将清除购物车中所有菜品',
      success: function(res) {
        if (res.confirm) {
          app.clearCart();
          that.updateCart();
          that.setData({ showCartPopup: false });
        }
      }
    });
  },

  submitOrder() {
    if (app.globalData.cart.length === 0) {
      wx.showToast({ title: '请先选择菜品', icon: 'none' });
      return;
    }
    this.setData({ showCartPopup: false, showConfirm: true });
  },

  closeConfirm() {
    this.setData({ showConfirm: false });
  },

  doSubmitOrder() {
    const order = app.submitOrder();
    if (order) {
      this.setData({ showConfirm: false });
      wx.showToast({ title: '下单成功！🎉', icon: 'success' });
      this.updateCart();
    }
  },

  preventMove() {
    return;
  }
});

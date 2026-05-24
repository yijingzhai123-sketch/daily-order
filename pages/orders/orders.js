// 订单页逻辑
const app = getApp();

Page({
  data: {
    orders: []
  },

  onShow() {
    this.setData({
      orders: app.globalData.orders
    });
  },

  goToOrder() {
    wx.switchTab({ url: '/pages/order/order' });
  }
});

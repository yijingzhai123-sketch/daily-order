// 我的页面逻辑
const app = getApp();

Page({
  data: {
    userName: '美食家',
    orderCount: 0,
    totalSpent: 0,
    favoriteCat: '——'
  },

  onShow() {
    this.loadStats();
  },

  loadStats() {
    const orders = app.globalData.orders;
    const orderCount = orders.length;
    const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

    const catCount = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        catCount[item.category] = (catCount[item.category] || 0) + item.quantity;
      });
    });
    let favoriteCat = '——';
    let maxCount = 0;
    Object.entries(catCount).forEach(([cat, count]) => {
      if (count > maxCount) {
        maxCount = count;
        favoriteCat = cat;
      }
    });

    this.setData({ orderCount, totalSpent, favoriteCat });
  },

  goToOrders() {
    wx.switchTab({ url: '/pages/orders/orders' });
  },

  goToOrder() {
    wx.switchTab({ url: '/pages/order/order' });
  },

  showAbout() {
    wx.showModal({
      title: '关于每日点菜',
      content: '🍽️ 每日点菜 v1.0.0\n\n一款简洁优雅的点菜小程序，帮你告别"今天吃什么"的选择困难。\n\n精选六大品类、38道经典菜品，每日更新推荐，让你每天都有新发现！',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  clearAllData() {
    var that = this;
    wx.showModal({
      title: '⚠️ 清除数据',
      content: '将清除所有订单记录和购物车数据，此操作不可恢复。\n\n确定继续吗？',
      confirmColor: '#E17055',
      success: function(res) {
        if (res.confirm) {
          app.globalData.orders = [];
          app.globalData.cart = [];
          wx.removeStorageSync('orders');
          wx.removeStorageSync('cart');
          wx.removeTabBarBadge({ index: 1 });
          that.loadStats();
          wx.showToast({ title: '已清除', icon: 'success' });
        }
      }
    });
  }
});

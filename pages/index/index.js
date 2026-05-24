// 首页逻辑
const { dishes, getDailySpecials, categoryColors } = require('../../utils/dishes');
const app = getApp();

Page({
  data: {
    specials: [],
    popularDishes: [],
    todayDate: ''
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const now = new Date();
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    const todayDate = `${now.getMonth() + 1}月${now.getDate()}日 星期${weekDays[now.getDay()]}`;

    this.setData({
      specials: getDailySpecials(),
      popularDishes: dishes.filter(d => d.popular),
      todayDate
    });
  },

  goToOrder(e) {
    const cat = e.currentTarget.dataset.cat;
    wx.switchTab({ url: '/pages/order/order' });
    wx.setStorageSync('activeCategory', cat);
  },

  quickAdd(e) {
    const dish = e.currentTarget.dataset.dish;
    app.addToCart(dish);
    wx.vibrateShort({ type: 'light' });
    this.updateCartBadge();
  },

  goToDishDetail(e) {
    const dish = e.currentTarget.dataset.dish;
    wx.showModal({
      title: `${dish.emoji} ${dish.name}`,
      content: `${dish.desc}\n\n分类：${dish.category}\n价格：¥${dish.price}\n辣度：${'🌶️'.repeat(dish.spicy) || '不辣'}`,
      confirmText: '加入点餐',
      success(res) {
        if (res.confirm) {
          app.addToCart(dish);
        }
      }
    });
  },

  updateCartBadge() {
    const count = app.getTotalCount();
    if (count > 0) {
      wx.setTabBarBadge({ index: 1, text: count.toString() });
    } else {
      wx.removeTabBarBadge({ index: 1 });
    }
  }
});

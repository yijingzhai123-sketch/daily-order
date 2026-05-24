// 每日点菜 小程序入口
App({
  globalData: {
    cart: [],           // 购物车 [{dish, quantity}]
    orders: [],         // 订单历史
    userInfo: null      // 用户信息
  },

  onLaunch() {
    // 从本地存储恢复数据
    const cart = wx.getStorageSync('cart');
    const orders = wx.getStorageSync('orders');
    if (cart) this.globalData.cart = cart;
    if (orders) this.globalData.orders = orders;
  },

  // 添加到购物车
  addToCart(dish) {
    const cart = this.globalData.cart;
    const exist = cart.find(item => item.id === dish.id);
    if (exist) {
      exist.quantity += 1;
    } else {
      cart.push({ ...dish, quantity: 1 });
    }
    this.saveCart();
    this.showToast(`${dish.emoji} ${dish.name} 已加入`);
  },

  // 从购物车移除
  removeFromCart(dishId) {
    this.globalData.cart = this.globalData.cart.filter(item => item.id !== dishId);
    this.saveCart();
  },

  // 更新购物车数量
  updateCartQuantity(dishId, quantity) {
    const cart = this.globalData.cart;
    const item = cart.find(item => item.id === dishId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        this.removeFromCart(dishId);
      }
    }
    this.saveCart();
  },

  // 清空购物车
  clearCart() {
    this.globalData.cart = [];
    this.saveCart();
  },

  // 计算总价
  getTotalPrice() {
    return this.globalData.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  // 计算总数量
  getTotalCount() {
    return this.globalData.cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  // 提交订单
  submitOrder(remark = '') {
    const cart = [...this.globalData.cart];
    if (cart.length === 0) return null;

    const order = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      items: cart,
      total: this.getTotalPrice(),
      time: new Date().toLocaleString('zh-CN'),
      status: '已完成',
      remark
    };

    this.globalData.orders.unshift(order);
    this.clearCart();
    this.saveOrders();
    return order;
  },

  // 保存购物车到本地
  saveCart() {
    wx.setStorageSync('cart', this.globalData.cart);
  },

  // 保存订单到本地
  saveOrders() {
    wx.setStorageSync('orders', this.globalData.orders);
  },

  // Toast 提示
  showToast(title, icon = 'success') {
    wx.showToast({ title, icon, duration: 1500 });
  }
});

// 每日点菜 - 菜品数据库
const dishes = [
  { id: 1, name: '红烧肉', category: '热菜', price: 38, emoji: '🍖', desc: '精选五花肉，慢炖两小时，肥而不腻入口即化', spicy: 0, popular: true, tags: ['招牌', '下饭'] },
  { id: 2, name: '宫保鸡丁', category: '热菜', price: 32, emoji: '🍗', desc: '花生鸡丁爆炒，酸甜微辣，经典川味', spicy: 2, popular: true, tags: ['川菜', '经典'] },
  { id: 3, name: '鱼香肉丝', category: '热菜', price: 28, emoji: '🥩', desc: '木耳胡萝卜肉丝，鱼香风味浓郁', spicy: 1, popular: true, tags: ['下饭'] },
  { id: 4, name: '麻婆豆腐', category: '热菜', price: 22, emoji: '🧈', desc: '嫩豆腐配牛肉末，麻辣鲜香，地道川味', spicy: 3, popular: false, tags: ['川菜', '麻辣'] },
  { id: 5, name: '糖醋里脊', category: '热菜', price: 35, emoji: '🍖', desc: '外酥里嫩，酸甜可口，老少皆宜', spicy: 0, popular: true, tags: ['招牌', '酸甜'] },
  { id: 6, name: '回锅肉', category: '热菜', price: 30, emoji: '🥓', desc: '五花肉配蒜苗豆瓣酱，川菜之首', spicy: 2, popular: false, tags: ['川菜', '经典'] },
  { id: 7, name: '干锅花菜', category: '热菜', price: 26, emoji: '🥦', desc: '花菜干煸至焦香，配五花肉片', spicy: 2, popular: false, tags: ['素菜', '干锅'] },
  { id: 8, name: '辣子鸡丁', category: '热菜', price: 34, emoji: '🌶️', desc: '鸡肉丁与干辣椒爆炒，麻辣酥香', spicy: 3, popular: true, tags: ['川菜', '麻辣'] },
  { id: 9, name: '蒜蓉西兰花', category: '热菜', price: 20, emoji: '🥬', desc: '新鲜西兰花配蒜蓉清炒，清爽健康', spicy: 0, popular: false, tags: ['素菜', '清淡'] },
  { id: 10, name: '水煮牛肉', category: '热菜', price: 42, emoji: '🥘', desc: '嫩牛肉片在麻辣汤汁中烫煮，鲜嫩麻辣', spicy: 4, popular: false, tags: ['川菜', '麻辣'] },

  { id: 11, name: '凉拌黄瓜', category: '凉菜', price: 12, emoji: '🥒', desc: '蒜泥醋汁凉拌，爽脆开胃', spicy: 0, popular: true, tags: ['开胃'] },
  { id: 12, name: '皮蛋豆腐', category: '凉菜', price: 16, emoji: '🥚', desc: '嫩豆腐配上溏心皮蛋，淋上香油酱油', spicy: 0, popular: true, tags: ['经典'] },
  { id: 13, name: '口水鸡', category: '凉菜', price: 28, emoji: '🐔', desc: '白切鸡淋红油芝麻酱，麻辣鲜香', spicy: 3, popular: false, tags: ['川菜', '麻辣'] },
  { id: 14, name: '蒜泥白肉', category: '凉菜', price: 26, emoji: '🥩', desc: '薄切五花肉配蒜泥辣油，肥而不腻', spicy: 1, popular: false, tags: ['经典'] },
  { id: 15, name: '凉拌海带丝', category: '凉菜', price: 10, emoji: '🌿', desc: '海带丝配蒜末醋汁，爽口解腻', spicy: 0, popular: false, tags: ['开胃', '清爽'] },
  { id: 16, name: '柠檬鸡爪', category: '凉菜', price: 22, emoji: '🍋', desc: '去骨鸡爪配柠檬泡椒，酸辣Q弹', spicy: 2, popular: false, tags: ['小吃'] },

  { id: 17, name: '番茄蛋花汤', category: '汤品', price: 12, emoji: '🍅', desc: '番茄与蛋花完美融合，酸甜鲜美', spicy: 0, popular: true, tags: ['家常'] },
  { id: 18, name: '酸辣汤', category: '汤品', price: 15, emoji: '🥣', desc: '豆腐木耳蛋花酸辣汤，开胃暖身', spicy: 2, popular: false, tags: ['开胃'] },
  { id: 19, name: '玉米排骨汤', category: '汤品', price: 28, emoji: '🌽', desc: '甜玉米配小排慢炖，清甜滋补', spicy: 0, popular: true, tags: ['滋补'] },
  { id: 20, name: '紫菜蛋花汤', category: '汤品', price: 8, emoji: '🍲', desc: '经典搭配，清淡鲜美，配餐必备', spicy: 0, popular: false, tags: ['清淡'] },
  { id: 21, name: '冬瓜排骨汤', category: '汤品', price: 26, emoji: '🍈', desc: '冬瓜配排骨，清热解暑滋补养生', spicy: 0, popular: false, tags: ['滋补', '清淡'] },

  { id: 22, name: '蛋炒饭', category: '主食', price: 15, emoji: '🍚', desc: '粒粒分明的蛋炒饭，简单却不平凡', spicy: 0, popular: true, tags: ['经典'] },
  { id: 23, name: '扬州炒饭', category: '主食', price: 22, emoji: '🍛', desc: '虾仁火腿青豆蛋炒饭，料足味美', spicy: 0, popular: false, tags: ['经典'] },
  { id: 24, name: '炸酱面', category: '主食', price: 18, emoji: '🍜', desc: '老北京炸酱面，肉酱浓郁黄瓜丝清爽', spicy: 0, popular: true, tags: ['北方', '经典'] },
  { id: 25, name: '手工水饺', category: '主食', price: 24, emoji: '🥟', desc: '猪肉白菜手工水饺，皮薄馅大', spicy: 0, popular: true, tags: ['手工'] },
  { id: 26, name: '白米饭', category: '主食', price: 3, emoji: '🍚', desc: '东北五常大米，粒粒饱满香甜', spicy: 0, popular: false, tags: [] },
  { id: 27, name: '馒头', category: '主食', price: 2, emoji: '🥖', desc: '手工老面馒头，松软有嚼劲', spicy: 0, popular: false, tags: [] },

  { id: 28, name: '可口可乐', category: '饮品', price: 6, emoji: '🥤', desc: '冰镇可乐，快乐加倍', spicy: 0, popular: true, tags: ['冰镇'] },
  { id: 29, name: '雪碧', category: '饮品', price: 6, emoji: '🥤', desc: '冰爽柠檬味汽水，透心凉', spicy: 0, popular: false, tags: ['冰镇'] },
  { id: 30, name: '冰红茶', category: '饮品', price: 5, emoji: '🧋', desc: '经典柠檬冰红茶，解渴消暑', spicy: 0, popular: false, tags: ['冰镇'] },
  { id: 31, name: '酸梅汤', category: '饮品', price: 8, emoji: '🫗', desc: '老北京酸梅汤，生津止渴开胃', spicy: 0, popular: true, tags: ['传统'] },
  { id: 32, name: '椰汁', category: '饮品', price: 10, emoji: '🥥', desc: '天然椰子汁，清甜解腻', spicy: 0, popular: false, tags: ['天然'] },
  { id: 33, name: '现磨豆浆', category: '饮品', price: 8, emoji: '🫘', desc: '现磨黄豆浆，浓郁豆香', spicy: 0, popular: false, tags: ['现磨', '热饮'] },

  { id: 34, name: '红豆沙', category: '甜品', price: 10, emoji: '🫘', desc: '慢火熬制红豆沙，甜而不腻', spicy: 0, popular: false, tags: ['传统'] },
  { id: 35, name: '芒果布丁', category: '甜品', price: 12, emoji: '🍮', desc: '新鲜芒果布丁，Q弹爽滑', spicy: 0, popular: true, tags: ['水果'] },
  { id: 36, name: '银耳莲子羹', category: '甜品', price: 15, emoji: '🍨', desc: '银耳莲子红枣慢炖，美容养颜', spicy: 0, popular: false, tags: ['滋补', '养颜'] },
  { id: 37, name: '冰淇淋', category: '甜品', price: 8, emoji: '🍦', desc: '香草冰淇淋球，夏日清凉必备', spicy: 0, popular: false, tags: ['冰品'] },
  { id: 38, name: '水果拼盘', category: '甜品', price: 18, emoji: '🍉', desc: '当季新鲜水果拼盘，缤纷多彩', spicy: 0, popular: false, tags: ['新鲜', '健康'] }
];

const categories = ['热菜', '凉菜', '汤品', '主食', '饮品', '甜品'];

const categoryColors = {
  '热菜': '#FF6B6B',
  '凉菜': '#4ECDC4',
  '汤品': '#FFD93D',
  '主食': '#C8A96E',
  '饮品': '#6BCB77',
  '甜品': '#FF85A2'
};

function getDailySpecials() {
  const shuffled = [...dishes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 8);
}

function getDishesByCategory(category) {
  return dishes.filter(d => d.category === category);
}

function searchDishes(keyword) {
  if (!keyword) return dishes;
  const kw = keyword.toLowerCase();
  return dishes.filter(d =>
    d.name.toLowerCase().includes(kw) ||
    d.desc.toLowerCase().includes(kw) ||
    d.tags.some(t => t.toLowerCase().includes(kw))
  );
}

module.exports = {
  dishes,
  categories,
  categoryColors,
  getDailySpecials,
  getDishesByCategory,
  searchDishes
};

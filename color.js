var colorData = require('../../../data/wallPaperData.js');
Page({
  data: {
    colorData: [],
    ob: null, // 表示接收的对象
  },
  onLoad: function (options) {
    this.setData({
      colorData: colorData.color,
      ob: options.ob || null,
    });
  },
  // 选择颜色
  changeColor: function(e) {
    var value = e.target.dataset.value;
    if (this.data.ob && value) {
      wx.setStorageSync(this.data.ob, value);
      wx.navigateTo({
        url: '/pages/wallpaper/wallpaper',
      });
    }
  },
})
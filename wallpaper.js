var wallPaperData = require('../../data/wallPaperData.js');

Page({
  data: {
    width: 0,
    height: 0,
    bindKeyInput: '',
    ctx: null,
    bgColor: '',
    tColor: '',
    fontSizes: [],
    sizeIndex: 0,
    fontSize: 12,
    dText: '',
    userInfo: {},
    imgUrl: '',
  },
  onLoad: function (options) {
    const that = this;
    // 获取设备信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          width: (res.windowWidth * 0.6),
          height: (res.windowWidth * 0.6),
        });
      }
    });
    // 画布\颜色\字体大小\已输入的文字
    this.setData({
      ctx: wx.createCanvasContext('myCanvas'),
      bgColor: wx.getStorageSync('bgColor') || '#FFFFFF',
      tColor: wx.getStorageSync('tColor') || '#000000',
      fontSizes: wallPaperData.size || [],
      dText: wx.getStorageSync('dText') || '',
      imgUrl: wx.getStorageSync('imgUrl') || '',
    });
    // 获取用户信息
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo,
        });
      }
    });
    
  },
  onReady: function () {
    this.initDraw();
  },
  // 初始化
  initDraw: function () {
    var ctx = this.data.ctx;
    var dText = this.data.dText;
    var canvasWidth = this.data.width;
    var canvasHeight = this.data.height;
    ctx.setFillStyle(this.data.bgColor);
    ctx.fillRect(0, 0, canvasWidth, canvasHeight); // 整块布

    // 绘制
    ctx.setFillStyle(this.data.tColor);
    ctx.setFontSize(this.data.fontSize);

    // 插入图像
    if (this.data.imgUrl) {
      console.log(this.data.imgUrl);
      ctx.drawImage(this.data.imgUrl, 10, ((canvasHeight / 2) + 40), 50, 50);
    }

    // 裁减-换行(measureText)
    var lastSubStrIndex = 0;
    var dTextWidth = 0;
    var lineHeight = 20; // 行高
    var initX = 10; // 起始X坐标
    var initY = canvasHeight / 2; // 起始Y坐标
    for(var i = 0; i < dText.length; i++) {
      dTextWidth += ctx.measureText(dText[i]).width;
      if (dTextWidth > canvasWidth - initX) {
        ctx.fillText(dText.substring(lastSubStrIndex, i), initX, initY);
        initY += lineHeight;
        dTextWidth = 0;
        lastSubStrIndex = i;
      }
      if (i == dText.length-1) {
        ctx.fillText(dText.substring(lastSubStrIndex, i + 1), initX, initY);
      }
    }
    ctx.draw();
  },
  // 生成图片
  drawPicture: function(val) {
    const that = this;
    const btnName = val.currentTarget.dataset.btnName;
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        if (btnName === 'preview') {
          that.preview(res.tempFilePath);
        } else if (btnName === 'save') {
          that.save(res.tempFilePath);
        }
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  // 预览
  preview: function(val) {
    if(val) {
      wx.previewImage({
        urls: [val] // 需要预览的图片http链接列表
      })
    }
  },
  // 保存
  save: function(val) {
    if(val) {
      wx.saveImageToPhotosAlbum({
        filePath: val,
        success: function (res) {
          console.log('成功');
        },
        fail: function (err) {
          console.log('失败', err);
          if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
            wx.openSetting({
              success(settingdata) {
                console.log(settingdata)
                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                  console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                } else {
                  console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                }
              }
            })
          }
        }
      });
    }
  },
  // 输入文字
  bindReplaceInput: function(e) {
    var value = e.detail.value
    this.setData({
      dText: value,
    });
    this.initDraw();
  },
  // 清除文字
  clearText: function() {
    this.setData({
      dText: '',
      imgUrl: '',
    });
    wx.setStorageSync('dText', '');
    wx.setStorageSync('imgUrl', '');
    this.initDraw();
  },
  // 选择颜色
  choiceColor: function(e) {
    var value = e.target.dataset.value;
    if (value) {
      wx.setStorageSync('dText', this.data.dText); // 保存已经输入的文字
      wx.navigateTo({
        url: 'color/color?ob=' + value,
      });
    }
  },
  // 选择字体大小
  bindFontSizeChange: function(e) {
    var value = e.detail.value;
    if(value) {
      this.setData({
        fontSize: this.data.fontSizes[value],
      });
      this.initDraw();
    }
  },
  // 选择图片
  choiceImg() {
    const that = this;
    wx.chooseImage({
      success: function(res) {
        that.setData({
          imgUrl: res.tempFilePaths[0],
        });
        wx.setStorageSync('imgUrl', res.tempFilePaths[0]);
        that.initDraw();
      },
    });
  },
})
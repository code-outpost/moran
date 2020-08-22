const app = getApp()
const {
  allData
} = require('../data.js');
const {
  jin
} = require('../jin.js');
const jinArr = jin.split(',');
let arrays = [];
const a = require("../../utils/util.js");
const s = ['晴', '雨', '多云', '雷雨', '阵雨', '小雨', '阴'];
for (let id = 0; id < 100; id++) {
  arrays.push(id)
}

function resetArr(arr) {
  let newArr = [];
  for (var i = arr.length + 1; i > 0;) {
    i--
    var rdm = Math.floor(Math.random() * arr.length)
    if (!newArr.includes(arr[rdm])) {
      newArr.push(arr[rdm])
    } else {
      if (newArr.length == arr.length) {
        break;
      }
      i++
    }
  }
  return newArr;
}

Page({
  data: {
    value: "",
    datas: [],
    time: '',
    name: '设置昵称',
    avatar: "/img/1.jpg",
    pickValue: 0,
    imgList: [
      {
      id: "http://imgs.aixifan.com/o_1cunr9rbh77b1jed1a6uadfrml1p.gif",
      name: "做你的专属舔狗"
    },
    {
      id: "http://inews.gtimg.com/newsapp_match/0/8172994949/0",
      name: "舔ta"
    },
{
      id: "https://dingyue.ws.126.net/2DHE822Bu0bYakuDaWwpr0JCcJD1H1ETS5ooLVRTK28vB1559920264115compressflag.jpg",
      name: "我只要做你的舔狗"
    },
    {
      id: "http://img.wxcha.com/file/201901/27/0e41b4e37a.jpg",
      name: "听说你也是舔狗"
    },
    {
      id: "http://wx3.sinaimg.cn/bmiddle/ceeb653ely1g267gu8unnj20c80c40sp.jpg",
      name: "舔狗模式"
    },
    {
      id: "https://wx4.sinaimg.cn/orj360/79567021ly1fxbibfj565j20u00u0e81.jpg",
      name: "大家好"
    },
    {
      id: "http://wx4.sinaimg.cn/bmiddle/006I1bcHly1fyr2y1zh4pj30ku0kljti.jpg",
      name: "你好"
    },
    {
      id: "https://pic.qqtn.com/up/2020-3/15847100626938764.jpg",
      name: "舔狗日记"
    },
 
      {
      id: "http://5b0988e595225.cdn.sohucs.com/images/20190108/078f234168ff4412b8850cdf5951a741.jpeg",
      name: "惹不起"
    },
      {
      id: "/img/1.jpg",
      name: "卡通狗头"
    }, {
      id: "/img/2.jpg",
      name: "熊猫-男"
    }, {
      id: "/img/3.jpg",
      name: "熊猫-女"
    }],
    openWrap: false,
    openName: 'modal',
    nicheng: '',
    jinci: ''
  },

navigateToMiniProgram() {
    wx.navigateToMiniProgram({
      appId: '1110494457',
      path: 'pages/index/index?id=123',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
},
  onLoad: function () {
    const that = this;
    const name = wx.getStorageSync('name');
    const avatar = wx.getStorageSync('avatar');
    if (name && avatar) {
      this.setData({
        avatar,
        name
      });
    }
    this.randomNumber();
    this.bindRandomText();

  },
  onReady: function () {

  },
  onShow: function () {

  },
  randomDateType: function () {
    const e = new Date();
    const t = "星期" + "天一二三四五六 ".charAt(e.getDay());
    return a.formatDate2(e) + " " + t + " ";
  },
  randomNumber: function () {
    let data = resetArr(arrays);
    let value = data.shift();
    this.setData({
      datas: data,
      value: allData[value]
    });
  },
  randomText: function () {
    var e = a.randomNum(0, s.length - 1);
    return s[e];
  },
  bindRandomText: function (e) {
    this.setData({
      time: this.randomDateType()
    });
  },
  randeNext: function () {
    const {
      datas
    } = this.data;
    wx.showLoading({
      title: "正在生成中..."
    });
    let newZuan = [];
    if (datas.length) {
      newZuan = datas;
    } else {
      newZuan = resetArr(arrays);
    }
    setTimeout(() => {
      let value = newZuan.shift();
      this.setData({
        datas: newZuan,
        value: allData[value]
      }, () => wx.hideLoading());
    }, 400)
  },
  copy: function () {
    const {
      value,
      time
    } = this.data;
    wx.setClipboardData({
      data: `${time} ${value}`,
      success(res) {
        wx.showToast({
          title: "复制成功!"
        });
      }
    })
  },
  openAD: function () {
    const {
      name
    } = this.data;
    if (name === '设置昵称') {
      return wx.showToast({
        title: "请设置昵称",
        icon: "none"
      });
    }

    this.createCard();
  },
  createCard: function () {
    const {
      value,
      name,
      avatar,
      time
    } = this.data;
    var isOk = true;

    if (name === '设置昵称') {
      return wx.showToast({
        title: "请设置昵称",
        icon: "none"
      });
    }

    wx.showLoading({
      title: "内容检测中..."
    });

    for (let i = 0; i < jinArr.length; i++) {
      if (value.includes(jinArr[i])) {
        isOk = false;
        console.log(jinArr[i]);
        this.setData({
          jinci: jinArr[i]
        });
        break;
      };
    }

    if (isOk) {
      app.globalData.result = {
        value,
        name,
        avatar,
        time
      }
      wx.setStorageSync('avatar', avatar);
      this.setData({
        jinci: ''
      }, () => {
        wx.navigateTo({
          url: '/pages/result/index'
        });
      })
    } else {
      wx.showModal({
        title: "检测到有违禁词",
        content: `当前检测到违禁词 ${this.data.jinci},请更新后再提交`
      })
    }

    wx.hideLoading();
  },
  inputFn: function (e) {
    const {
      value
    } = e.detail;
    this.setData({
      value
    });
  },
  changeName: function () {
    this.setData({
      openWrap: true,
      openName: "modal open"
    });
  },
  close: function () {
    this.setData({
      openName: "modal",
      openWrap: false
    });
  },
  addfriend(e){
    qq.authorize(
    {scope: "setting.addFriend",
    success() {
          //授权成功，可以加好友了
        }})
},
  nichengInput: function (e) {
    const {
      value
    } = e.detail;
    this.setData({
      nicheng: value
    });
  },
  cName: function () {
    const {
      nicheng
    } = this.data;
    var isOk = true;

    if (!nicheng.trim()) {
      return wx.showToast({
        title: '昵称不能为空!',
        icon: "none"
      });
    }

    wx.showLoading({
      title: "昵称检测中..."
    });
    for (let i = 0; i < jinArr.length; i++) {
      if (nicheng.includes(jinArr[i])) {
        isOk = false;
        console.log(jinArr[i]);
        this.setData({
          jinci: jinArr[i]
        });
        break;
      };
    }
    if (isOk) {
      wx.showToast({
        title: "设置成功!"
      });
      this.setData({
        jinci: '',
        openName: "modal",
        openWrap: false,
        name: nicheng
      });
      wx.setStorageSync('name', nicheng);
    } else {
      wx.showModal({
        title: "检测到有违禁词",
        content: `当前检测到违禁词 ${this.data.jinci},请更新后再提交`
      })
    }
    wx.hideLoading()
  },
  bindPickerChange: function (e) {
    const {
      value
    } = e.detail;
    const {
      imgList
    } = this.data;
    this.setData({
      pickValue: value,
      avatar: imgList[value].id
    });
    wx.setStorageSync('avatar', imgList[value].id);
  },

  onShareAppMessage: function (e) {
    return {
      title: "做舔狗呢，最重要的是开心",
      path: "/pages/index/index",
      imageUrl: '/img/1.jpg'
    };
  },
})
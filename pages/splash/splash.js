var network = require("../../utils/network.js")
const app = getApp();
Page({
  data: {
    loading: true,
    photos: [
      {
        url: '../../image/welcome.png'
      }
    ],
  },

  onLoad() {
    // https://img.ivrfans.cn/thumb/m/mmimg/39/39903/39903_14.jpg
    this.setData({ loading: false });
    this.start();
  },
  start() {
    network.POST({
      url: 'api/user/wxLogin',
      data: { isWx: true },
      success: function (res) {
        if (res.statusCode === 200) {
          wx.switchTab({ url: '/pages/bill/bills/bills' });
        } else {
          //跳到登录页面
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      },
      fail: function () { },
      complete: function () { }
    })
  }
})
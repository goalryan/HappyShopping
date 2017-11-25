var network = require("../../utils/network.js")
const app = getApp();
Page({
  data: {
    loading: true,
    photos: [
      {
        url: 'https://img.ivrfans.cn/thumb/m/mmimg/39/39903/39903_14.jpg'
      }
    ],
  },

  onLoad() {
    this.setData({ loading: false })
  },
  start() {    
    network.POST({
      url: 'api/user/wxLogin',
      params: { isWx: true },
      success: function (res) {
        wx.switchTab({ url: '/pages/goods/list/list' });
      },
      fail: function () { }
    })
  }
})
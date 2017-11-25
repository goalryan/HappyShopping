var network = require("../../utils/network.js")
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    model: {
      isWx: true,
      userName: '',
      password: '',
      isBindWx: true,
    },
    focusUserName: true,
    focusPassword: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  bindUserNameInput: function (e) {
    this.setData({
      ["model.userName"]: e.detail.value
    });
  },
  bindUserNameConfirm: function (e) {
    this.setData({
      focusUserName: false,
      focusPassword: true
    });
  },
  bindPasswordInput: function (e) {
    this.setData({
      ["model.password"]: e.detail.value
    });
  },
  bindWx: function (e) {
    this.setData({
      ["model.isBindWx"]: e.detail.value
    })
  },
  /**
   * 登录
   */
  login: function () {
    var that = this;
    network.POST({
      url: 'api/user/login',
      params: that.data.model,
      header: { 'JsCode': wx.getStorageSync("jsCode") },
      success: function (res) {
        const { success, data } = res.data;
        if (success) {
          //更新token和用户信息
          wx.setStorageSync('token', data.token.token_type + ' ' + data.token.access_token);
          //转到主页
          wx.switchTab({ url: '/pages/goods/list/list' })
        }
      },
      fail: function () { }
    })
  }
})
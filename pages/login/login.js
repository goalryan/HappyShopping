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
      ["model.isBindWx"]: !this.data.model.isBindWx
    })
  },
  /**
   * 登录
   */
  login: function () {
    if (!this.checkData()) return;
    var that = this;
    wx.showLoading({
      title: '登录中..',
    })
    network.POST({
      url: 'api/user/login',
      data: that.data.model,
      header: { 'JsCode': wx.getStorageSync("jsCode") },
      success: function (res) {
        const { success, data, msg } = res.data;
        if (success) {
          //更新token和用户信息
          wx.setStorageSync('token', data.token.token_type + ' ' + data.token.access_token);
          wx.setStorageSync('enterpriseId', data.user.enterpriseId)
          wx.setStorageSync('openId', data.user.openId)
          wx.setStorageSync('userName', data.user.userName)
          //转到主页
          wx.switchTab({ url: '/pages/bill/bills/bills' })
          wx.hideLoading();
        }
      }
    })
  },
  checkData: function () {
    if (this.data.model.userName === '') {
      wx.showToast({
        title: '请输入手机号',
        image: app.toastIcon.warning,
        duration: app.toastIcon.duration
      });
      return false;
    }
    if (this.data.model.password === '') {
      wx.showToast({
        title: '请输入密码',
        image: app.toastIcon.warning,
        duration: app.toastIcon.duration
      });
      return false;
    }
    return true;
  }
})
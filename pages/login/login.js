var network = require("../../utils/network.js")
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    model: {
      userName: '',
      password: ''
    },
    jsCode: '',
    isBindWx: false,
    focusUserName: true,
    focusPassword: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      jsCode: wx.getStorageSync('jsCode')
    });
    this.login();
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
      isBindWx: e.detail.value
    })
  },
  /**
   * 登录
   */
  login: function () {
    debugger;
    var that = this;
    var params = {
      isWx: true,
      userName: '13510930357',
      password: '123456'
    }
    network.POST({
      url: 'api/user/login',
      params: params,
      header: { 'JsCode': that.data.jsCode },
      success: function (res) {
        console.log(res.data)
      },
      fail: function () { }
    })
  }
})



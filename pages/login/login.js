var network = require("./utils/network.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model: {
      userName: '',
      password: '',
      isBindWx: false
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

  },
  // bindUserNameConfirm: function (e) {

  // },
  bindPasswordInput: function (e) {

  },
  bindPasswordConfirm: function (e) {

  },
  /**
   * 登录
   */
  login: function () {
    var params = {
      isWx: true,
      userName: '13510930357',
      password: '123456'
    }
    network.POST({
      url: 'api/user/login',
      params: params,
      header: { 'JsCode': res.code },
      success: function (res) {
        console.log(res.data)
      },
      fail: function () { }
    })
  }
})



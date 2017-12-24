var network = require("../../utils/network.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userName: wx.getStorageSync('userName')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        app.globalData.userInfo = res.userInfo
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
        this.setData({ userInfo: app.globalData.userInfo });
        console.log(this.data.userInfo);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  logout: function (e) {
    wx.showActionSheet({
      itemList: ['确定退出'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex === 0) {
          //清除token和用户信息
          wx.removeStorageSync('token');
          wx.removeStorageSync('enterpriseId')
          wx.removeStorageSync('openId')
          wx.removeStorageSync('userName')
          //转到主页
          wx.redirectTo({ url: '/pages/login/login' })
        }
      }
    })
  }
})
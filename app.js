// require("../pages/components/search")
var network = require("./utils/network.js")
import Touches from './utils/Touches.js'
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        wx.setStorageSync('jsCode', res.code);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        } else {
          wx.getUserInfo({
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    wx.getSystemInfo({
      success: res => {
        this.globalData.systemInfo = res;
        var width = res.windowWidth;
        this.globalData.px2rpx = 750 / width;
        this.globalData.rpx2px = width / 750;
        console.log(this.globalData);
      }
    })
  },
  /**
   * 生成唯一ID
   */
  getGuid: function () {
    var timestamp = new Date().getTime();
    return `${timestamp}${Math.random().toString().split('.')[1].substring(0, 5)}`;
  },
  globalData: {
    userInfo: null,
    systemInfo: {},
    px2rpx: 1,
    rpx2px: 1,
    domain: 'http://happyshopping.com/',
  },
  /**
   * 提示图标
   */
  toastIcon: {
    duration: 1500,
    success: '/image/success.png',
    error: '/image/error.png',
    warning: '/image/warning.png'
  },
  Touches: new Touches()
})
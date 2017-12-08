//获取应用实例
var app = getApp()
Page({
  data: {
    customerStyle: 'iconfont icon-right'
    // customerStyle: 'iconfont opened icon-right'
  },

  tapCustomer() {
    console.log('sss');
    this.setData({
      customerStyle: 'iconfont icon-right opened'
    })
  }
})
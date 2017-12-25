// pages/share/customerBill/customerBill.js
var network = require("../../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    model: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      id: e.id
    });
    this.fetchData();
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
    const token = wx.getStorageSync('token');
    if(token===''){
      //转到登录页
      wx.redirectTo({ url: '/pages/login/login' })
    }    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取客户账单数据
   */
  fetchData: function () {
    var url = 'api/share/customerBill';
    var that = this;
    network.GET({
      url: url,
      data: { id: that.data.id },
      success: function (res) {
        const { success, data } = res.data;
        if (success) {
          that.setData({ model: data });
        }
      },
      fail: function (e) {
        var toastText = '获取数据失败' + JSON.stringify(e);
      },
      complete: function () { }
    })
  }
})
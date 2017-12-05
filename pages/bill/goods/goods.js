var network = require("../../../utils/network.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    billCustomerId: '',
    customerNickName: '',
    goodsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      billCustomerId: options.billCustomerId,
      customerNickName: options.customerNickName
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.fetchData(true);
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
   * 查询账单数据
   */
  fetchData(refresh = false) {
    const that = this;
    network.GET({
      url: 'api/billGoods/detail',
      data: { billCustomerId: that.data.billCustomerId },
      success: function (res) {
        const { success, data } = res.data;
        if (success) {
          that.setData({
            goodsList: data
          });
        }
      },
      complete: function () {
        if (refresh)
          wx.stopPullDownRefresh();
      }
    })
  }
})
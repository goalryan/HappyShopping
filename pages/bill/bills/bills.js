var network = require("../../../utils/network.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  fetchData() {
    const that = this;
    network.GET({
      url: 'api/bill',
      success: function (res) {
        const { success, data } = res.data;
        if (success) {
          that.setData({
            dataList: data
          });
        }
      },
      fail: function (e) {

      }
    })
  },
  itemTap(e) {
    wx.navigateTo({
      url: '../customers/customers?billId=' + e.currentTarget.dataset.id + '&docNo=' + e.currentTarget.dataset.docNo
    })
  },
  /**
   * 添加账单
   */
  onAddItemEvent(e){
    console.log('sss');
  }
})
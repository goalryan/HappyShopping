var network = require("../../../utils/network.js")
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    selectRow: {},
    hiddenRatemodal: true,
    focusRate: false
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
      url: 'api/bill',
      success: function (res) {
        const { success, data } = res.data;
        if (success) {
          that.setData({
            dataList: data
          });
        }
      },
      complete: function () {
        if (refresh)
          wx.stopPullDownRefresh();
      }
    })
  },
  /**
   * 点击行
   */
  itemTap(e) {
    wx.navigateTo({
      url: '../customers/customers?billId=' + e.currentTarget.dataset.id + '&docNo=' + e.currentTarget.dataset.docNo
    })
  },
  /**
   * 添加账单
   */
  onAddItemEvent(e) {
    this.setData({
      hiddenRatemodal: !this.data.hiddenRatemodal,
      focusRate: true
    })
  },
  /**
   * 取消按钮
   */
  cancel: function () {
    this.setData({
      hiddenRatemodal: true,
      focusRate: false
    });
  },
  /**
   * 确认按钮
   */
  confirm: function () {
    this.setData({
      hiddenRatemodal: true,
      focusRate: true
    })
  },

  touchS: function (e) {  // touchstart
    let startX = app.Touches.getClientX(e)
    startX && this.setData({ startX })
  },
  touchM: function (e) {  // touchmove
    let dataList = app.Touches.touchM(e, this.data.dataList, this.data.startX)
    dataList && this.setData({ dataList })
  },
  touchE: function (e) {  // touchend
    const width = 300  // 定义操作列表宽度
    let dataList = app.Touches.touchE(e, this.data.dataList, this.data.startX, width)
    dataList && this.setData({ dataList })
  },
  itemDelete: function (e) {  // itemDelete
    let dataList = app.Touches.deleteItem(e, this.data.dataList)
    dataList && this.setData({ dataList })
  }
})
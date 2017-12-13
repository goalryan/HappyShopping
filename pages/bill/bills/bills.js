var network = require("../../../utils/network.js")
var app = getApp();
// 长按行可修改汇率
// 左滑删除
Page({
  /**
   * 页面的初始数据
   */
  data: {
    model: {},
    dataList: [],
    selectRow: {},
    hiddenRatemodal: true,
    focusRate: false,
    touchStart: 0,
    touchEnd: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initModel();
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
   * 初始化账单对象
   */
  initModel: function () {
    var resetData = {
      id: '',
      docNo: '',
      memo: "",
      taxRate: ''
    }
    this.setData({
      model: resetData
    })
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
  bindTaxRateInput: function (e) {
    this.setData({
      ["model.taxRate"]: e.detail.value
    });
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
   * 重置按钮
   */
  reset: function () {
    this.setData({
      focusRate: false
    });
    this.initModel();
  },
  /**
   * 确认按钮
   */
  confirm: function () {
    //没有汇率默认给1
    if (this.data.model.taxRate === '') {
      this.setData({ ["model.taxRate"]: 1 })
    }
    var url = 'api/bill/add';
    var that = this;
    network.POST({
      url: url,
      data: that.data.model,
      success: function (res) {
        if (res.data.success) {
          that.setData({
            hiddenRatemodal: true,
          })
          that.initModel();
        }        
      },
      fail: function (e) {
        var toastText = '获取数据失败' + JSON.stringify(e);
        wx.showToast({
          title: toastText,
          icon: 'warn',
          duration: 2000
        })
      }
    })
  },
  touchS: function (e) {  // touchstart
    let startX = app.Touches.getClientX(e);
    startX && this.setData({ startX });
    this.setData({
      touchStart: e.timeStamp
    })
  },
  touchM: function (e) {  // touchmove
    let dataList = app.Touches.touchM(e, this.data.dataList, this.data.startX)
    dataList && this.setData({ dataList })
  },
  touchE: function (e) {  // touchend
    const width = 300  // 定义操作列表宽度
    let dataList = app.Touches.touchE(e, this.data.dataList, this.data.startX, width)
    dataList && this.setData({ dataList });
    this.setData({
      touchEnd: e.timeStamp
    })
  },
  itemTap: function (e) {
    let that = this;
    //触摸时间距离页面打开的毫秒数  
    var touchTime = that.data.touchEnd - that.data.touchStart;
    if (touchTime < 350) {
      wx.navigateTo({
        url: '../customers/customers?billId=' + e.currentTarget.dataset.id + '&docNo=' + e.currentTarget.dataset.docNo
      })
    }
  },
  showActionSheet: function (e) {
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  itemDelete: function (e) {  // itemDelete
    let dataList = app.Touches.deleteItem(e, this.data.dataList)
    dataList && this.setData({ dataList })
  },

})
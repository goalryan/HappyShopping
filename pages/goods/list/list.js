var app = getApp();
Page({
  data: {
    model: {},
    docNoIndex: 0,
    docNoArray: ['20171101001', '20171101002', '20171101003'],
    focusCustomer: true,
    searchPosition: { top: 92, left: 100},
    scrollHeight: app.globalData.systemInfo.windowHeight - 185,
    listLi: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
  },
  onLoad: function () {
    this.initCustomer();
    this.initDocNoList();
  },
  bindDocNoChange: function (e) {
    this.setData({
      docNoIndex: e.detail.value
    })
    wx.showToas({
      title: this.data.model.docNo,
      icon: 'success',
      duration: 2000
    })
  },
  initCustomer: function () {
    this.setData({
      model: {
        id: '',
        docNo: '',
        customerId: '',
        customerNickName: '',
        isPaid: false
      }
    })
  },
  initDocNoList: function () {

  },
  /**
   * 新客户
   */
  newCustomer: function (e) {

  },
  bindCustomerInput: function (e) {
    console.log(e);
    this.setData({
      model: {
        customerNickName: e.detail.value
      }
    })
  },
  bindCustomerConfirm: function (e) {
    this.setData({
      focusCustomer: false,
      focusGoods: true
    })
  },
  bindCustomerBlur: function (e) {

  },
  /**
   * 添加商品
   */
  addGoods: function (e) {

  }
})

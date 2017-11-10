var app = getApp();
Page({
  data: {
    model: {},
    docNoIndex: 0,
    docNoArray: ['20171101001', '20171101002', '20171101003'],
    focusCustomer: true,
    customerFocus: false,
    searchPosition: { top: 92, left: 200 * app.globalData.rpx2px },
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
  bindCustomerFocus: function (e) {
    this.setData({
      customerFocus: true
    })

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
    this.setData({
      customerFocus: false
    })
  },
  changePaid:function(e){
    this.setData({
      model: {
        isPaid: e.detail.value
      }
    })
  },
  /**
   * 添加商品
   */
  addGoods: function (e) {
    wx.navigateTo({
      url: '../add/add',
    })
  },
  /**
   * 选择客户回调事件
   */
  onConfirmItemEvent: function (e) {
    console.log(e);
    this.setData({
      model: {
        customerNickName: e.detail.value
      }
    });
  },
  /**
   * 输入客户回调事件
   */
  onFindItemEvent: function (e) {
    console.log(e);
  },
})

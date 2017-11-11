var app = getApp();
Page({
  data: {
    model: {},
    docNoIndex: 0,
    docNoArray: ['20171101001', '20171101002', '20171101003'],
    focusCustomer: true,
    searchObj: {
      url: app.globalData.domain + 'api/customer/search',
      position: { top: 92, left: 200 * app.globalData.rpx2px },
      onFocus: false
    },
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
  bindCustomerFocus: function (e) {
    var setOnFocus = "searchObj.onFocus";
    this.setData({
      [setOnFocus]: true
    });
  },
  bindCustomerInput: function (e) {
    var setCustomerNickName = "model.customerNickName";
    this.setData({
      [setCustomerNickName]: e.detail.value
    });
  },
  bindCustomerConfirm: function (e) {
    this.setData({
      focusCustomer: false,
      focusGoods: true
    });
  },
  bindCustomerBlur: function (e) {
    var setOnFocus = "searchObj.onFocus";
    this.setData({
      [setOnFocus]: false
    });
  },
  changePaid: function (e) {
    var setIsPaid = "model.isPaid";
    this.setData({
      [setIsPaid]: e.detail.value
    })
  },
  /**
   * 新客户
   */
  newCustomer: function (e) {

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
    var setCustomerNickName = "model.customerNickName";
    this.setData({
      [setCustomerNickName]: e.detail.value
    });
  },
  /**
   * 输入客户回调事件
   */
  onFindItemEvent: function (e) {
    console.log(e);
  },
})

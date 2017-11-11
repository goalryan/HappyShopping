var app = getApp();
Page({
  data: {
    billCustomerId: '',
    model: {},
    docNoIndex: 0,
    docNoArray: [],
    goodsList: [],
    isNewCustomer: true,
    focusCustomer: true,
    searchObj: {
      url: app.globalData.domain + 'api/customer/search',
      position: { top: 92, left: 200 * app.globalData.rpx2px },
      onFocus: false
    },
    scrollHeight: app.globalData.systemInfo.windowHeight - 185
  },
  onLoad: function () {
    this.initCustomer();
    this.initDocNoList();
  },
  bindDocNoChange: function (e) {
    this.setData({
      docNoIndex: e.detail.value,
      ["model.docNo"]: this.data.docNoArray[e.detail.value]
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
  /**
   * 获取打开的账单
   */
  initDocNoList: function () {
    var url = app.globalData.domain + 'api/bill/openBills';
    var that = this;
    wx.request({
      url: url,
      data: "",
      method: 'GET',
      success: function (res) {
        var responseData = [];
        if (res.data.success) {
          res.data.data.forEach(item => {
            responseData.push(item.docNo);
          });
        }
        if (responseData.length > 0) {
          that.setData({
            docNoArray: responseData,
            ["model.docNo"]: responseData[0]
          });
        } else {
          that.setData({
            docNoArray: responseData,
          });
        }
      },
      fail: function (e) {
        var toastText = '获取数据失败' + JSON.stringify(e);
      },
      complete: function () { }
    })
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
   * 保存客户
   */
  saveCustomer: function (e) {

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
      ["model.customerId"]: e.detail.id,
      ["model.customerNickName"]: e.detail.value
    });
    this.queryGoodsList();
  },
  /**
   * 输入客户回调事件
   */
  onFindItemEvent: function (e) {
    console.log(e);
    this.setData({
      ["model.customerId"]: e.detail.id
    });
    this.queryGoodsList();
  },
  /**
   * 查询商品列表
   */
  queryGoodsList: function () {
    this.setData({ goodsList: [] });
    if (this.data.model.docNo !== '' && this.data.model.customerId !== '') {
      console.log(this.data.model.docNo, this.data.model.customerId);
      var url = app.globalData.domain + 'api/billGoods/getByDocNoAndCustomerId';
      var that = this;
      wx.request({
        url: url,
        data: that.data.model,
        method: 'POST',
        success: function (res) {
          var responseData = [];
          if (res.data.success) {
            responseData = res.data.data;
          }
          that.setData({
            goodsList: responseData
          });
        },
        fail: function (e) {
          var toastText = '获取数据失败' + JSON.stringify(e);
        },
        complete: function () { }
      })
    }
  }
})

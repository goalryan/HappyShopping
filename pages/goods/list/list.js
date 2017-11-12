var app = getApp();
Page({
  data: {
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
  onShow: function () {
    this.queryGoodsList();
  },
  bindDocNoChange: function (e) {
    this.setData({
      docNoIndex: e.detail.value,
      ["model.docNo"]: this.data.docNoArray[e.detail.value]
    });
    this.queryGoodsList();
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
    this.setData({
      ["model.isPaid"]: e.detail.value
    })
    if (this.data.model.id === '') return;
    var url = app.globalData.domain + 'api/billCustomer/updateIsPaid';
    var that = this;
    wx.request({
      url: url,
      data: that.data.model,
      method: 'POST',
      success: function (res) {
        if (!res.data.success) {
          wx.showToast({
            title: '保存失败',
            icon: 'warn',
            duration: 2000
          })
          that.setData({
            ["model.isPaid"]: !that.data.model.isPaid
          })
        }
      },
      fail: function (e) {
        var toastText = '获取数据失败' + JSON.stringify(e);
        wx.showToast({
          title: toastText,
          icon: 'warn',
          duration: 2000
        })
        that.setData({
          ["model.isPaid"]: !that.data.model.isPaid
        })
      },
      complete: function () { }
    })
  },
  /**
   * 保存客户
   */
  saveCustomer: function (e) {
    if (this.data.model.docNo === '' || this.data.model.customerNickName === '') {
      wx.showToast({
        title: '账单和客户名称必填',
        icon: 'info',
        duration: 2000
      })
      return;
    }
    var url = app.globalData.domain + 'api/billCustomer/add';
    var that = this;
    wx.request({
      url: url,
      data: that.data.model,
      method: 'POST',
      success: function (res) {
        if (res.data.success) {
          that.setData({
            ["model.id"]: res.data.data
          });
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'warn',
            duration: 2000
          })
        }
      },
      fail: function (e) {
        var toastText = '获取数据失败' + JSON.stringify(e);
        wx.showToast({
          title: toastText,
          icon: 'error',
          duration: 2000
        })
      },
      complete: function () {
        console.log(that.data);
      }
    })
  },
  /**
   * 添加商品
   */
  addGoods: function (e) {
    wx.navigateTo({
      url: '../add/add?billCustomerId=' + this.data.model.id + '&docNo=' + this.data.model.docNo,
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
    this.setData({ goodsList: [], ["model.id"]: '' });
    //账单号和客户ID都存在才查询数据
    if (this.data.model.docNo !== '' && this.data.model.customerId !== '') {
      console.log(this.data.model.docNo, this.data.model.customerId);
      var url = app.globalData.domain + 'api/billCustomer/getByDocNoAndCustomerId';
      var that = this;
      wx.request({
        url: url,
        data: that.data.model,
        method: 'POST',
        success: function (res) {
          if (res.data.success) {
            that.setData({
              goodsList: res.data.data.goodsList,
              ["model.id"]: res.data.data.id,
              ["model.isPaid"]: res.data.data.isPaid
            });
          } else {
            that.queryFail();
          }
        },
        fail: function (e) {
          var toastText = '获取数据失败' + JSON.stringify(e);
          that.queryFail();
        },
        complete: function () { }
      })
    }
  },
  queryFail: function () {
    that.setData({
      goodsList: [],
      ["model.id"]: '',
      ["model.isPaid"]: false
    });
  }
})

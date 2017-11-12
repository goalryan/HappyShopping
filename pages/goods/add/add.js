var app = getApp();
Page({
  data: {
    model: {},
    focusGoods: false,
    focusQuantity: false,
    items: [
      {
        radios: [
          { name: 'USA', value: '168' },
          { name: 'CHN', value: 'beautity'}]

      },
      {
        radios: [
          { name: 'JPN', value: '海港城' },
          { name: 'TUR', value: '华润堂' }]
      },
      {
        radios: [
          { name: 'BRA', value: 'DFS' },
          { name: 'ENG', value: '万宁' }]
      }
    ],
    searchObj: {
      url: app.globalData.domain + 'api/goods/search',
      position: { top: 46, left: 200 * app.globalData.rpx2px },
      onFocus: false
    },
    scrollHeight: app.globalData.systemInfo.windowHeight - 278 + 98 * app.globalData.rpx2px,
  },

  onLoad: function (e) {
    this.initGoods();
    // this.setData({
    //   ["model.docNo"]: e.docNo,
    //   ["model.billCustomerId"]: e.billCustomerId
    // });
    //测试数据
    this.setData({
      ["model.docNo"]: "BILL20171109001",
      ["model.billCustomerId"]: "151054336458084148"
    });
    console.log(this.data.model);
  },
  initGoods: function (e) {
    this.setData(
      {
        model: {
          id: app.getGuid(),
          billCustomerId: '',
          docNo: '',
          goodsId: '',
          goodsName: '',
          quantity: 1,
          inUnitPrice: 0,
          outUnitPrice: 0,
          isRMB: false,
          positionId: ''
        }
      }
    )
  },
  bindGoodsFocus: function (e) {
    this.setData({
      ["searchObj.onFocus"]: true
    });
  },
  bindGoodsInput: function (e) {
    this.setData({
      ["model.goodsName"]: e.detail.value
    });
  },
  bindGoodsConfirm: function (e) {
    this.setData({
      focusGoods: false,
      focusQuantity: true
    })
  },
  bindGoodsBlur: function (e) {
    this.setData({
      ["searchObj.onFocus"]: false
    });
  },
  bindQuantityInput: function (e) {
    this.setData({
      ["model.quantity"]: e.detail.value
    });
  },
  bindInUnitPriceInput: function (e) {
    this.setData({
      ["model.inUnitPrice"]: e.detail.value
    });
  },
  bindOutUnitPriceInput: function (e) {
    this.setData({
      ["model.outUnitPrice"]: e.detail.value
    });
  },
  changeCurrency: function (e) {
    this.setData({
      ["model.isRMB"]: e.detail.value
    })
  },
  newCustomer: function (e) {
    wx.navigateBack({});
  },
  addGoods: function (e) {
    if (this.data.model.goodsName === '') {
      wx.showToast({
        title: '商品名称必填',
        icon: 'info',
        duration: 2000
      })
      return;
    }
    var url = app.globalData.domain + 'api/billGoods/add';
    var that = this;
    wx.request({
      url: url,
      data: that.data.model,
      method: 'POST',
      success: function (res) {
        if (res.data.success) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
          that.initGoods();
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
      complete: function () { }
    })
  },
  /**
   * 选择客户回调事件
   */
  onConfirmItemEvent: function (e) {
    console.log(e);
    this.setData({
      ["model.goodsId"]: e.detail.id,
      ["model.goodsName"]: e.detail.value
    });
  },
  /**
   * 输入客户回调事件
   */
  onFindItemEvent: function (e) {
    console.log(e);
    this.setData({
      ["model.goodsId"]: e.detail.value
    });
  },
})

var network = require("../../../utils/network.js")
var app = getApp();
Page({
  data: {
    billId: '',
    billCustomerId: '',
    model: {},
    focusGoods: false,
    focusQuantity: false,
    positionList: [],
    searchObj: {
      url: 'api/goods/search',
      position: { top: 46, left: 200 * app.globalData.rpx2px },
      onFocus: false
    },
    scrollHeight: app.globalData.systemInfo.windowHeight - 231 - 98 * app.globalData.rpx2px,
  },

  onLoad: function (e) {
    this.setData({
      billId: e.billId,
      billCustomerId: e.billCustomerId
    });
    this.initGoods();
    this.initPosition();
    console.log(this.data.model);
  },
  initGoods: function () {
    this.setData(
      {
        model: {
          id: app.getGuid(),
          billCustomerId: this.data.billCustomerId,
          billId: this.data.billId,
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
  initPosition: function () {
    var url = 'api/position';
    var that = this;
    network.GET({
      url: url,
      success: function (res) {
        if (res.data.success) {
          that.setData({
            positionList: res.data.data
          })
        }
      },
      fail: function (e) {
      },
      complete: function () { }
    })
  },
  resetPosionList: function () {
    var resetData = [];
    resetData = this.data.positionList.map(item => {
      item.checked = false;
      return item;
    })
    this.setData({
      positionList: resetData
    })
  },
  resetData: function () {
    this.initGoods();
    this.resetPosionList();
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
  radioChange: function (e) {
    this.setData({
      ["model.positionId"]: e.detail.value
    })
  },
  itemTap: function (e) {
    var tapResult = [];
    tapResult = this.data.positionList.map(item => {
      if (item.id === e.currentTarget.dataset.id) {
        item.checked = true;
        this.setData({
          ["model.positionId"]: item.id
        })
      } else {
        item.checked = false;
      }
      return item;
    })
    this.setData({
      positionList: tapResult
    })
  },
  goCustomer: function (e) {
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
    var url = 'api/billGoods/add';
    var that = this;
    network.POST({
      url: url,
      data: that.data.model,
      success: function (res) {
        if (res.data.success) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
          that.resetData();
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
  /**
   * 输入框失去焦点
   */
  onLoseFocusEvent: function () {
    this.setData({
      focusGoods: false
    });
  }
})

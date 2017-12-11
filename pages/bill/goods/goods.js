var network = require("../../../utils/network.js")
var app = getApp();
Page({
  data: {
    billId: '',
    billCustomerId: '',
    customerIndex: -1,
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
      billCustomerId: e.billCustomerId,
      customerIndex: e.customerIndex
    });
    this.initGoods();
    this.initPosition();
  },
  initGoods: function () {
    this.setData(
      {
        focusGoods: true,
        model: {
          id: app.getGuid(),
          billCustomerId: this.data.billCustomerId,
          billId: this.data.billId,
          goodsId: '',
          goodsName: '',
          quantity: null,
          inUnitPrice: null,
          outUnitPrice: null,
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
      }
    })
  },
  resetPosionList: function () {
    var resetData = [];
    resetData = this.data.positionList.map(item => {
      item.checked = false;
      return item;
    })
    this.setData({
      positionList: resetData,
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
  checkData: function () {
    var quantity = this.data.model.quantity === null ? 1 : this.data.model.quantity;
    var inUnitPrice = this.data.model.inUnitPrice === null ? 0 : this.data.model.inUnitPrice;
    var outUnitPrice = this.data.model.outUnitPrice === null ? 0 : this.data.model.outUnitPrice;
    this.setData({
      ["model.quantity"]: quantity,
      ["model.inUnitPrice"]: inUnitPrice,
      ["model.outUnitPrice"]: outUnitPrice
    })
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
    this.checkData();
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
          that.saveSuccessCallback(that);
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
  },
  /**
   * 保存成功后
   */
  saveSuccessCallback: function (that) {
    //刷新客户的商品列表
    var pages = getCurrentPages();
    var cusPages = pages[pages.length - 2];
    var addIndex = cusPages.data.customers[that.data.customerIndex].goodsList.length;
    var insertGoods = 'customers[' + that.data.customerIndex + '].goodsList[' + addIndex + ']';
    cusPages.setData({
      [insertGoods]: that.data.model
    })
    //弹出下一步操作
    wx.showActionSheet({
      itemList: ['继续添加'],
      success: function (res) {
        that.resetData();
      },
      fail: function (res) {
        wx.navigateBack({});
      }
    })
  }
})

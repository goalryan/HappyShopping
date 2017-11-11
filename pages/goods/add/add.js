var app = getApp();
Page({
  data: {
    model: {
      docNo: '',
      customerId: '',
      customerNickName: '',
      goodsId: '',
      goodsName: '',
      quantity: 1,
      inUnitPrice: 0,
      outUnitPrice: 0,
      isRMB: false,
      positionId: ''
    },
    focusGoods: false,
    focusQuantity: false,
    items: [
      {
        radios: [
          { name: 'USA', value: '168' },
          { name: 'CHN', value: 'beautity', checked: 'true' },
          { name: 'BRA', value: 'DFS' }]
      },
      {
        radios: [
          { name: 'JPN', value: '海港城' },
          { name: 'ENG', value: '万宁' },
          { name: 'TUR', value: '华润堂' }]
      }
    ],
    searchObj: {
      url: app.globalData.domain + 'api/goods/search',
      position: { top: 46, left: 200 * app.globalData.rpx2px },
      onFocus: false
    },
    scrollHeight: app.globalData.systemInfo.windowHeight - 278 + 98 * app.globalData.rpx2px,
  },
  bindGoodsFocus: function (e) {
    var setOnFocus = "searchObj.onFocus";
    this.setData({
      [setOnFocus]: true
    });
  },
  bindGoodsInput: function (e) {
    var setGoodsName = "model.goodsName";
    this.setData({
      [setGoodsName]: e.detail.value
    });
  },
  bindGoodsConfirm: function (e) {
    this.setData({
      focusGoods: false,
      focusQuantity: true
    })
  },
  bindGoodsBlur: function (e) {
    var setOnFocus = "searchObj.onFocus";
    this.setData({
      [setOnFocus]: false
    });
  },
  changeCurrency: function (e) {
    var setIsRMB = "model.isRMB";
    this.setData({
      [setIsRMB]: e.detail.value
    })
  },
  newCustomer: function (e) {
    wx.navigateBack({})
  },
  addGoods: function (e) {

  },
  /**
   * 选择客户回调事件
   */
  onConfirmItemEvent: function (e) {
    console.log(e);
    var setGoodsName = "model.goodsName";
    this.setData({
      [setGoodsName]: e.detail.value
    });
  },
  /**
   * 输入客户回调事件
   */
  onFindItemEvent: function (e) {
    console.log(e);
  },
})

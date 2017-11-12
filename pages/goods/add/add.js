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
          { name: 'CHN', value: 'beautity', checked: 'true' }]

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
    //   ["model.billCustomerId"]: e.billCustomerId
    // });
    this.setData({
      ["model.billCustomerId"]: "151053156076854563"
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
          customerId: '',
          customerNickName: '',
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

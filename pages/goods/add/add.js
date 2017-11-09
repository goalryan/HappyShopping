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
    docNoIndex: 0,
    docNoArray: ['20171101001', '20171101002', '20171101003'],
    focusCustomer: true,
    focusGoods: false,
    focusQuantity: false,
    hiddenDropdown: true,
    items: [
      {
        radios: [
          { name: 'USA', value: '168' },
          { name: 'CHN', value: 'beautity', checked: 'true' },
          { name: 'BRA', value: 'DFS' },
          { name: 'JPN', value: '海港城' }]
      },
      {
        radios: [
          { name: 'ENG', value: '万宁' },
          { name: 'TUR', value: '华润堂' }]
      }
    ],
    searchViewStyle: {
      top: 0,
      left: 0
    }
  },
  bindDocNoChange: function (e) {
    this.setData({
      docNoIndex: e.detail.value
    })
    wx.showToas({
      title: this.model.docNo,
      icon: 'success',
      duration: 2000
    })
  },
  bindCustomerInput: function (e) {
    this.setData({
      searchViewStyle: {
        top: 50,
        left: 0
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
  bindGoodsInput: function (e) {
    this.setData({
      searchViewStyle: {
        top: 50,
        left: 0
      }
    })
  },
  bindGoodsConfirm: function (e) {
    this.setData({
      focusGoods: false,
      focusQuantity: true
    })
  },
  bindGoodsBlur: function (e) {

  },
  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  },
  bindHideKeyboard: function (e) {
    if (e.detail.value === '123') {
      // 收起键盘
      wx.hideKeyboard()
    }
  }
})

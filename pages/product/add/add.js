Page({
  data: {
    focusName: true,
    focusQuantity: false,
    quantity: 1,
    inputValue: '',
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
    ]
  },
  bindNameInput: function (e) {
    this.setData({
      focusName: false,
      focusQuantity: true
    });

  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
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

var app = getApp();
Component({
  behaviors: [],
  properties: {
    isTabBar: {
      type: Boolean,
      value: false
    }
  },
  data: {
    top: (app.globalData.systemInfo.windowHeight - 126) * app.globalData.px2rpx,
    left: app.globalData.systemInfo.windowWidth * app.globalData.px2rpx - 196
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  created: function () {

  },
  methods: {
    itemTap: function (e) {
      this.triggerEvent('additemevent')
    }
  }
})
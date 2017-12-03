var app = getApp();
Component({
  behaviors: [],
  properties: {
    scrollHeight: {
      type: Number,
      value: app.globalData.systemInfo.windowHeight + 98
    },
    goodsList: {
      type: Object,
      value: [],
      observer: function (newVal, oldVal) {
        console.log(newVal);
      }
    }
  },
  data: {

  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  created: function () {

  },
})
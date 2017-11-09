var app = getApp();
Component({
  behaviors: [],
  properties: {
    position: {
      type: Object,
      value: { top: 200, left: 100 }
    },
    searchKey: {
      type: String,
      value: '',
      observer: function (newVal, oldVal) {
        if (newVal != oldVal) { this.fetchData() }
      }
    },
    url: {
      type: String,
      value: ''
    }
  },
  data: {
    list: [],
    isHidden: true,
    height: 'auto',
    width: app.globalData.systemInfo.windowWidth - 75,
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  created: function () {
  },
  ready: function () {
  },
  attached: function () {
  },

  methods: {
    fetchData: function () {
      var url = "http://happyshopping.com/api/customer/search";//查询数据的URL
      var that = this;
      wx.request({
        url: url,
        data: { nickName: this.data.searchKey },
        method: 'GET',
        success: function (res) {
          that.setData({
            list: res.data.data,
            isHidden: res.data.data.length === 0
          });
        },
        fail: function (e) {
          var toastText = '获取数据失败' + JSON.stringify(e);
          that.setData({
            isHidden: true
          });
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          })
        },
        complete: function () {
          // complete
        }
      })
    },
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    _myPrivateMethod: function () {
      // 内部方法建议以下划线开头
      this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
      this.applyDataUpdates()
    }
  }

})
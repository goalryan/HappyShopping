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
    },
    isHidden: {
      type: Boolean,
      value: true
    }
  },
  data: {
    list: [],
    height: 'auto',
    width: app.globalData.systemInfo.windowWidth - 75,
    selectItem: {},
    oldKey: ''
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
      if (this.data.searchKey === '') return;
      // if (this.data.searchKey === this.data.oldKey) return
      // if (this.data.isHidden) return;
      var url = app.globalData.domain + "api/customer/search";//查询数据的URL
      var that = this;
      wx.request({
        url: url,
        data: { nickName: this.data.searchKey },
        method: 'GET',
        success: function (res) {
          var responseData = [];
          if (res.data.success) {
            responseData = res.data.data
          }
          that.setData({
            list: responseData,
            isHidden: responseData.length === 0
          });
        },
        fail: function (e) {
          var toastText = '获取数据失败' + JSON.stringify(e);
          that.setData({
            list: [],
            isHidden: true
          });
        },
        complete: function () {
          that.autoBindItem();
        }
      })
    },
    /**
     * 选择查询项
     */
    itemTap: function (e) {
      this.setData({
        selectItem: {
          id: e.currentTarget.dataset.id,
          value: e.currentTarget.dataset.value
        },
        oldKey: e.currentTarget.dataset.value,
        isHidden: true
      })
      this.triggerEvent('confirmitemevent', this.data.selectItem)
    },
    /**
     * 自动匹配查询项
     */
    autoBindItem: function () {
      let findItem = this.data.list.find((item) => item.value === this.data.searchKey.trim().toLowerCase());
      if (findItem !== undefined) {
        this.setData({
          selectItem: {
            id: findItem.id,
            value: findItem.value
          },
        })
      } else {
        this.setData({
          selectItem: {
            id: '',
            value: ''
          }
        })
      }
      this.triggerEvent('finditemevent', this.data.selectItem)
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
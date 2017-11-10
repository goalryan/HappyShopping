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
        if (newVal != oldVal) { this.searchByKey() }
      }
    },
    onFocus: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        if (newVal != oldVal) { if (newVal) this.searchOnFocus() }
      }
    },
    url: {
      type: String,
      value: ''
    }
  },
  data: {
    list: [],
    height: 20,
    width: app.globalData.systemInfo.windowWidth - 75,
    selectItem: {},
    isHidden: true,
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
    searchByKey: function () {
      if (this.data.searchKey === '') return;
      if (this.data.searchKey === this.data.oldKey) return;
      this.fetchData();
    },
    searchOnFocus: function () {
      this.fetchData();
    },
    fetchData: function () {
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
            height: responseData.length * 35 > 250 ? 250 : responseData.length * 35,
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
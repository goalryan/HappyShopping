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
        if (newVal != oldVal) {
          if (newVal) this.searchOnFocus()
          else {
            this.setData({
              isHidden: true
            })
          }
        }
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
    initData: function () {
      this.setData({
        selectItem: {
          id: '',
          value: ''
        }
      })
    },
    searchByKey: function () {
      if (this.data.searchKey === '') {
        this.setData({
          isHidden: true
        })
        return;
      }
      if (this.data.searchKey === this.data.oldKey) return;
      this.fetchData();
    },
    searchOnFocus: function () {
      if (this.data.searchKey === '') return;
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
            height: 300,
            // height: responseData.length * 40 > 400 ? 400 : responseData.length * 40,
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
        this.initData();
      }
      this.triggerEvent('finditemevent', this.data.selectItem)
    }
  }
})
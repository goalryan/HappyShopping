var network = require("../../../utils/network.js")
var app = getApp();
Component({
  behaviors: [],
  properties: {
    isPage: {
      type: Boolean,
      value: true
    },
    isHidden: {
      type: Boolean,
      value: false
    },
    scrollHeight: {
      type: Number,
      value: app.globalData.systemInfo.windowHeight,
      observer: function (newVal, oldVal) {
        this.setScrollHeightStyle();
      }
    },
    goodsList: {
      type: Object,
      value: [],
      observer: function (newVal, oldVal) {
        if (newVal.length === 1 && newVal[0].id === '') {
          this.removeNullData();
        }
      }
    }
  },
  data: {
    scrollY: false,
    scrollHeightStyle: ''
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  created: function () {

  },
  methods: {
    setScrollHeightStyle() {
      if (this.data.isPage) {
        this.setData({
          scrollY: false,
          scrollHeightStyle: ''
        })
      } else {
        this.setData({
          scrollY: true,
          scrollHeightStyle: 'height:' + this.data.scrollHeight + "px"
        })
      }
    },
    removeNullData() {
      this.setData({
        goodsList: []
      })
    },
    touchS: function (e) {  // touchstart
      let startX = app.Touches.getClientX(e)
      startX && this.setData({ startX })
    },
    touchM: function (e) {  // touchmove
      let goodsList = app.Touches.touchM(e, this.data.goodsList, this.data.startX)
      goodsList && this.setData({ goodsList })
    },
    touchE: function (e) {  // touchend
      const width = 150  // 定义操作列表宽度
      let goodsList = app.Touches.touchE(e, this.data.goodsList, this.data.startX, width)
      goodsList && this.setData({ goodsList })
    },
    itemDelete: function (e) {  // itemDelete
      const that = this;
      network.DELETE({
        url: 'api/billGoods/' + e.currentTarget.dataset.id,
        success: function (res) {
          const { success, data } = res.data;
          if (success) {
            let goodsList = app.Touches.deleteItem(e, that.data.goodsList)
            goodsList && that.setData({ goodsList })
            //发送父级删除商品事件
            that.deleteSuccessCallback(that, e);
          }
        }
      })
    },
    /**
     * 删除成功后
    */
    deleteSuccessCallback: function (that, e) {
      //刷新客户的商品列表
      var pages = getCurrentPages();
      var pageIndex = that.data.isPage ? 1 : 2;
      var cusPages = pages[pages.length - pageIndex];
      var customerIndex = cusPages.data.customers.findIndex(customer => customer.id === e.currentTarget.dataset.billCustomerId);
      var goodsIndex = e.currentTarget.dataset.index;
      cusPages.data.customers[customerIndex].goodsList.splice(goodsIndex, 1);
      var updateCustomer = 'customers[' + customerIndex + '].goodsList';
      cusPages.setData({
        [updateCustomer]: cusPages.data.customers[customerIndex].goodsList
      });
    }
  }
})
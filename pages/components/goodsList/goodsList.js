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
      value: []
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
      const goods = this.data.goodsList[e.currentTarget.dataset.index]
      const model = {
        billId: goods.billId,
        billCustomerId: goods.billCustomerId,
        billGoodsId: goods.id
      };
      const that = this;
      network.POST({
        url: 'api/billGoods/removeAndReturnProfit',
        data: model,
        success: function (res) {
          const { success, data } = res.data;
          if (success) {
            let goodsList = app.Touches.deleteItem(e, that.data.goodsList)
            goodsList && that.setData({ goodsList })
            //发送父级删除商品事件
            that.deleteSuccessCallback(that, e, data);
          }
        }
      })
    },
    /**
     * 删除成功后
    */
    deleteSuccessCallback: function (that, e, profitModel) {
      //更新客户列表中的商品列表
      that.updateCustomerListPage(that, e, profitModel);
      that.updateBillPage(that, profitModel);
    },
    /**
   * 更新客户列表中的商品列表
   */
    updateCustomerListPage: function (that, e, profitModel) {
      var pages = getCurrentPages();
      var pageIndex = that.data.isPage ? 1 : 2;
      var cusPages = pages[pages.length - pageIndex];
      var cusIndex = cusPages.data.customers.findIndex(customer => customer.id === e.currentTarget.dataset.billCustomerId);
      var goodsIndex = e.currentTarget.dataset.index;
      cusPages.data.customers[cusIndex].goodsList.splice(goodsIndex, 1);
      var updateCustomer = 'customers[' + cusIndex + '].goodsList';
      var quantity = 'customers[' + cusIndex + '].quantity';
      var inTotalPrice = 'customers[' + cusIndex + '].inTotalPrice';
      var outTotalPrice = 'customers[' + cusIndex + '].outTotalPrice';
      var profit = 'customers[' + cusIndex + '].profit';
      cusPages.setData({
        [updateCustomer]: cusPages.data.customers[cusIndex].goodsList,
        [quantity]: profitModel.customerGoodsQuantity,
        [inTotalPrice]: profitModel.customerGoodsInTotalPrice,
        [outTotalPrice]: profitModel.customerGoodsOutTotalPrice,
        [profit]: profitModel.customerGoodsProfit
      });
    },
    /**
     * 更新账单利润
     */
    updateBillPage: function (that, profitModel) {
      var pages = getCurrentPages();
      //目标页面回退索引数
      var pageIndex = that.data.isPage ? 2 : 3;
      var billPages = pages[pages.length - pageIndex];
      var billIndex = billPages.data.dataList.findIndex(bill => bill.id === profitModel.billId);
      //客户列表加载过商品数据时才执行更新
      var quantity = 'dataList[' + billIndex + '].quantity';
      var inTotalPrice = 'dataList[' + billIndex + '].inTotalPrice';
      var outTotalPrice = 'dataList[' + billIndex + '].outTotalPrice';
      var profit = 'dataList[' + billIndex + '].profit';
      billPages.setData({
        [quantity]: profitModel.billGoodsQuantity,
        [inTotalPrice]: profitModel.billGoodsInTotalPrice,
        [outTotalPrice]: profitModel.billGoodsOutTotalPrice,
        [profit]: profitModel.billGoodsProfit
      })
    },
  }
})
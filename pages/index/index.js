//获取应用实例
var network = require("../../utils/network.js")
var app = getApp()
Page({
  data: {
    isFold: true,
    foldStyle: 'iconfont icon-right',
    unFoldStyle: 'iconfont opened icon-right',
    customerStyle: 'iconfont icon-right',
    customers: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData();
  },
  fetchData(refresh = false) {
    const that = this;
    network.GET({
      url: 'api/billCustomer/detail',
      data: { billId: '151235236018221287' },
      success: function (res) {
        const { success, data } = res.data;
        if (success) {
          that.initCustomerStyle(data);
          that.setData({
            customers: data
          });
        }
      },
      fail: function (e) { },
      complete: function () {
        if (refresh)
          wx.stopPullDownRefresh();
      }
    })
  },
  initCustomerStyle(data) {
    data.forEach(item => {
      item.isFold = true;
      item.arrowStyle = this.data.foldStyle;
      item.loadGoods = false;
      item.goodsList = [];
    });
  },
  tapCustomer(e) {
    const index = e.currentTarget.dataset.index;
    const id = e.currentTarget.dataset.id;
    var isFold = 'customers[' + index + '].isFold';
    var arrowStyle = 'customers[' + index + '].arrowStyle';
    var preFoldStatus = this.data.customers[index].isFold;
    this.setData({
      [isFold]: !preFoldStatus,
      [arrowStyle]: preFoldStatus ? this.data.unFoldStyle : this.data.foldStyle
    })
    console.log(this.data.customers[index].goodsStyle);
    this.fetchGoodsList(index, id);
  },
  fetchGoodsList(index, id) {
    const that = this;
    if (this.data.customers[index].loadGoods)
      return;
    network.GET({
      url: 'api/billGoods/detail',
      data: { billCustomerId: id },
      success: function (res) {
        const { success, data } = res.data;
        if (success) {
          var goodsList = 'customers[' + index + '].goodsList';
          var loadGoods = 'customers[' + index + '].loadGoods';
          that.setData({
            [goodsList]: data,
            [loadGoods]: true
          });
        }
      }
    })
  }
})
//获取应用实例
var network = require("../../../utils/network.js")
var app = getApp()
Page({
  data: {
    billId: '',
    docNo: '',
    customers: [],
    foldStyle: 'iconfont icon-right',
    unFoldStyle: 'iconfont opened icon-right',
    preIndex: -1,
    touchStart: 0,
    touchEnd: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      billId: options.billId,
      docNo: options.docNo
    });
    this.fetchData();
  },
  onPullDownRefresh: function () {
    this.fetchData(true);
  },
  fetchData(refresh = false) {
    const that = this;
    network.GET({
      url: 'api/billCustomer/detail',
      data: { billId: that.data.billId },
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
    let that = this;
    //触摸时间距离页面打开的毫秒数  
    var touchTime = that.data.touchEnd - that.data.touchStart;
    if (touchTime < 350) {
      that.showGoodsList(e);
    }
  },
  showActionSheet: function (e) {
    wx.showActionSheet({
      itemList: ['编辑客户', '删除客户', '发送账单明细'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  goAddGoods(e) {

  },
  showGoodsList(e) {
    const index = e.currentTarget.dataset.index;
    const id = e.currentTarget.dataset.id;
    var isFold = 'customers[' + index + '].isFold';
    var arrowStyle = 'customers[' + index + '].arrowStyle';
    var preFoldStatus = this.data.customers[index].isFold;
    if (this.data.preIndex === index || this.data.preIndex === -1) {
      this.setData({
        [isFold]: !preFoldStatus,
        [arrowStyle]: preFoldStatus ? this.data.unFoldStyle : this.data.foldStyle,
        preIndex: index
      })
    } else {
      var isFoldPre = 'customers[' + this.data.preIndex + '].isFold';
      var arrowStylePre = 'customers[' + this.data.preIndex + '].arrowStyle';
      this.setData({
        [isFold]: !preFoldStatus,
        [arrowStyle]: preFoldStatus ? this.data.unFoldStyle : this.data.foldStyle,
        [isFoldPre]: true,
        [arrowStylePre]: this.data.foldStyle,
        preIndex: index
      })
    }
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
  },
  touchS: function (e) {  // touchstart
    let startX = app.Touches.getClientX(e);
    startX && this.setData({ startX });
    this.setData({
      touchStart: e.timeStamp
    })
  },
  touchM: function (e) {  // touchmove
    let customers = app.Touches.touchM(e, this.data.customers, this.data.startX)
    customers && this.setData({ customers })
  },
  touchE: function (e) {  // touchend
    const width = 150  // 定义操作列表宽度
    let customers = app.Touches.touchE(e, this.data.customers, this.data.startX, width)
    customers && this.setData({ customers });
    this.setData({
      touchEnd: e.timeStamp
    })
  },
})
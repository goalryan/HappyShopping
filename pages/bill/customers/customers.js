//获取应用实例
var network = require("../../../utils/network.js")
var app = getApp()
Page({
  data: {
    billId: '',
    docNo: '',
    customers: [],
    foldStyle: 'iconfont icon-right',
    unFoldStyle: 'iconfont icon-right opened',
    preIndex: -1,
    touchStart: 0,
    touchEnd: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      billId: e.billId,
      docNo: e.docNo
    });
    this.fetchData();
  },
  onShow: function (e) {

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
  /**
   * 点击客户行
   */
  tapCustomer(e) {
    let that = this;
    //触摸时间距离页面打开的毫秒数  
    var touchTime = that.data.touchEnd - that.data.touchStart;
    if (touchTime < 350) {
      that.showGoodsList(e);
    }
  },
  /**
   * 删除客户
   */
  deleteCustomerEvent(e) {
    const that = this;
    wx.showActionSheet({
      itemList: ['删除客户【' + e.currentTarget.dataset.customerName + '】'],
      success: function (res) {
        network.DELETE({
          url: 'api/billCustomer/' + e.currentTarget.dataset.id,
          success: function (res) {
            const { success } = res.data;
            if (success) {
              that.data.customers.splice(e.currentTarget.dataset.index, 1);
              let customers = that.data.customers;
              that.setData({ customers })
            }
          }
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 添加客户
   */
  onAddItemEvent(e) {
    wx.navigateTo({
      url: './add/add?billId=' + this.data.billId + '&docNo=' + this.data.docNo
    })
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
  /**
   * 添加商品
   */
  goAddGoods(e) {
    wx.navigateTo({
      url: '../goods/goods?billId=' + this.data.billId + '&billCustomerId=' + e.currentTarget.dataset.id + '&customerIndex=' + e.currentTarget.dataset.index + '&quickAdd=true'
    })
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
  }
})